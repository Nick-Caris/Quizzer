// Dependencies
const WebSocket = require('ws');
const express = require('express');
const questionsRouter = require('./routes/question');
const quizzesRouter = require('./routes/quiz');
const currentQuizRouter = require('./routes/currentQuiz');
const mongoose = require('mongoose');
const session = require('express-session');
const http = require("http");
const cors = require('cors');

const app = express();

app.use(cors({origin: true, credentials: true}));
app.options("*", cors({origin: true, credentials: true}));
mongoose.connect('mongodb://localhost/quizzer');

const sessionParser = session({
  questionsHad: [],
  lang: '',
  saveUninitialized: false,
  secret: 'sst,don\'t tell',
  resave: false
});

app.use(sessionParser);
app.use(require('body-parser').json());
app.use(function(req, res, next) {
  res.setHeader('Content-Type', 'Application/JSON');
  next();
});

app.use('/', async function (req, res, next) {
  req.websocketServer = websocketServer;
  next();
});

const httpServer = http.createServer();

const websocketServer = new WebSocket.Server({noServer: true});

httpServer.on('upgrade', (req, networkSocket, head) => {
  sessionParser(req, {}, () => {
    console.log('Session Parse');

    if (req.session.roomCode === undefined) {
      console.log("No roomCode ", req.session);
      networkSocket.destroy();
      return;
    } else if (req.session.master === undefined && req.session.team === undefined && req.session.dashboard === undefined) {
      console.log("No user " , req.session);
      networkSocket.destroy();
      return;
    }

    websocketServer.handleUpgrade(req, networkSocket, head, newWebSocket => {
      console.log("Upgrade socket");
      websocketServer.emit('connection', newWebSocket, req);
    });
  });
});

websocketServer.on('connection', (socket, req) => {
  socket.session = req.session;
});

// Routes
app.use('/questions', questionsRouter);
app.use('/quizzes', quizzesRouter);
app.use('/currentQuiz', currentQuizRouter);

httpServer.on('request', app);

httpServer.listen(3000, function () {
  console.log('server has started');
});
