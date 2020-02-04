// Dependencies
const mongoose = require('mongoose');

// Mongoose
const teamSchema = require('./team');
const questionSchema = require('./question');
const answerQuestionSchema = require('./answerQuestion');

const currentQuizSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  roomCode: {type: String, required: true, unique: true},
  round: Number,
  lang: String,
  teams: [teamSchema],
  questions: [questionSchema],
  answerQuestions: [answerQuestionSchema],
});

const CurrentQuiz = mongoose.model('CurrentQuiz', currentQuizSchema);

module.exports = currentQuizSchema;
