// Import functions
const {messageDashboardQuestionId} = require("../services/webSocket");
const {messageDashboard} = require("../services/webSocket");
const {createBaseQuiz} = require("../services/quiz");
const {createPlayQuiz, getQuiz} = require('../services/currentQuiz');
const {createTeam, getTeam} = require('../services/team');
const {getQuestion} = require('../services/question');
const {createAnswerQuestion} = require('../services/answerQuestion');
const {messageMaster, messageTeam, messageTeams, messageTeamsQuestion} = require('../services/webSocket');

// dependencies
const currentQuizRouter = require('express').Router();

currentQuizRouter.post('/start', async function (req, res, next) {
  try {
    const quiz = await createBaseQuiz();
    req.session.roomCode = quiz.roomCode;
    req.session.master = 'Yes Daddy';
    req.session.lang = req.body.lang;
    req.session.questionsHad = [];
    const currentQuiz = await createPlayQuiz(quiz.roomCode, req.body.lang);

    await res.json({'result': 'yes', 'lang': req.session.lang, 'roomCode': currentQuiz.roomCode});
  } catch (error) {
    return next(error);
  }
});

currentQuizRouter.get('/:roomCode/', async function (req, res, next) {
  try {
    const quiz = await getQuiz(req.params.roomCode);
    req.session.dashboard = true;
    req.session.roomCode = req.params.roomCode;

    await res.json({'quiz': quiz});
  } catch (error) {
    next(error);
  }
});

currentQuizRouter.use('/:roomCode', async function (req, res, next) {
  try {
    req.quiz = await getQuiz(req.params.roomCode);

    next();
  } catch (error) {
    return next(error)
  }
});


currentQuizRouter.put('/:roomCode/team', async function (req, res, next) {
  try {
    let newTeam = false;
    const team = await createTeam(req.body.name);
    if (req.quiz.teams) {
      req.quiz.teams.forEach(function (element) {
        if (team.name === element.name) {
          res.json({'result': 'TEAM ALREADY IN'});
          newTeam = true;
        }
      });
    }
    if (newTeam) return;
    if (req.quiz.teams === undefined) req.quiz.teams = [team];
    else req.quiz.teams.push(team);
    req.session.roomCode = req.params.roomCode;
    req.session.lang = req.quiz.lang;
    req.session.team = req.body.name;
    await req.quiz.save();
    messageMaster(req, 'TEAM-JOINED');
    messageDashboard(req, 'UPDATE-DASHBOARD');

    await res.json({'result': 'yes', 'roomCode': req.quiz.roomCode, 'quiz': req.quiz, 'lang': req.quiz.lang})
  } catch (error) {
    return next(error);
  }
});

currentQuizRouter.get('/:roomCode/teams', async function (req, res, next) {
  try {
    await res.json({'teams': req.quiz.teams});
  } catch (error) {
    return next(error);
  }
});

currentQuizRouter.get('/:roomCode', async function (req, res, next) {
  try {
    req.session.lang = req.quiz.lang;
    req.session.questionsHad = req.quiz.questions.map(a => a._id);

    await res.json(req.quiz);
  } catch (error) {
    return next(error);
  }
});

currentQuizRouter.post('/:roomCode/addQuestion/:questionId', async function (req, res, next) {
  try {
    const question = await getQuestion(req.params.questionId);
    if (req.quiz.questions === undefined) req.quiz.questions = [question];
    else req.quiz.questions.push(question);
    req.quiz.save();

    await res.json(question);
  } catch (error) {
    next(error);
  }
});

// @todo: add to docs
currentQuizRouter.get('/:roomCode/AnswerQuestions', async function (req, res, next) {
  try {
    await res.json(req.quiz.answerQuestions);
  } catch (error) {
    next(error);
  }
});

// @todo: add to docs
currentQuizRouter.get('/:roomCode/AnswerQuestions/:questionId', async function (req, res, next) {
  try {
    const currentAnswerQuestions = req.quiz.answerQuestions.filter(function (question) {
      return question.questionId === req.params.questionId;
    });

    await res.json(currentAnswerQuestions);
  } catch (error) {
    next(error);
  }
});

// body needs to be {teamName, questionId, answer}
// @todo: add to docs
currentQuizRouter.post('/:roomCode/addAnswerQuestion', async function (req, res, next) {
  try {
    let alreadyAnswered = false;
    req.quiz.answerQuestions.forEach(function (question) {
      if (question.teamName === req.body.teamName && question.questionId === req.body.questionId) {
        question.answer = req.body.answer;
        alreadyAnswered = true;
      }
    });
    if (!alreadyAnswered) {
      const answerQuestion = await createAnswerQuestion(req.body);
      if (req.quiz.answerQuestions === undefined) req.quiz.answerQuestions = [answerQuestion];
      else req.quiz.answerQuestions.push(answerQuestion);
    }
    req.quiz.save();
    messageMaster(req, 'QUESTION-ANSWERED');
    messageDashboard(req, 'UPDATE-DASHBOARD');
    messageDashboardQuestionId(req, 'UPDATE-ANSWERS', req.body.questionId);

    await res.json({'question': 'answered'});
  } catch (error) {
    next(error);
  }
});

// @todo: add to docs
currentQuizRouter.put('/:roomCode/approve/question/:questionId/team/:teamName', async function (req, res, next) {
  try {
    req.quiz.answerQuestions.forEach(function (question) {
      console.log('answer: ', String(question.questionId) === String(req.params.questionId), question.questionId, req.params.questionId);
      if (String(question.questionId) === String(req.params.questionId) && question.teamName === req.params.teamName) {
        question.right = 1;
      }
    });
    req.quiz.teams.forEach(function (team) {
      if (team.name === req.params.teamName) {
        team.score++;
      }
    });
    req.quiz.save();
    messageDashboard(req, 'UPDATE-DASHBOARD');
    messageDashboardQuestionId(req, 'UPDATE-ANSWERS', req.params.questionId);
    messageTeam(req, 'ANSWER-APPROVED', req.params.teamName);


    await res.json({'message': 'Send'})
  } catch (error) {
    next(error);
  }
});

// @todo: add to docs
currentQuizRouter.put('/:roomCode/disapprove/question/:questionId/team/:teamName', async function (req, res, next) {
  try {
    req.quiz.answerQuestions.forEach(function (question) {
      console.log('answer: ', String(question.questionId) === String(req.params.questionId), question.questionId, req.params.questionId);
      if (String(question.questionId) === String(req.params.questionId) && question.teamName === req.params.teamName) {
        question.right = 0;
      }
    });
    req.quiz.teams.forEach(function (team) {
      if (team.name === req.params.teamName) {
        team.score--;
      }
    });
    req.quiz.save();
    messageDashboard(req, 'UPDATE-DASHBOARD');
    messageDashboardQuestionId(req, 'UPDATE-ANSWERS', req.params.questionId);
    messageTeam(req, 'ANSWER-REJECTED', req.params.teamName);


    await res.json({'message': 'Send'})
  } catch (error) {
    next(error);
  }
});

// @todo: add to docs
currentQuizRouter.put('/:roomCode/approve/:teamId', async function (req, res, next) {
  try {
    const team = req.quiz.teams.id(req.params.teamId);
    team.approved = 1;
    req.quiz.save();
    messageTeam(req, 'TEAM-ACCEPTED', team.name);

    await res.json({'approved:': 'OK', 'teams': req.quiz.teams});
  } catch (error) {
    next(error);
  }
});

// @todo: add to docs
currentQuizRouter.put('/:roomCode/disapprove/:teamId', async function (req, res, next) {
  try {
    const team = req.quiz.teams.id(req.params.teamId);
    team.approved = 0;
    messageTeam(req, 'TEAM-REJECTED', team.name);
    messageDashboard(req, 'UPDATE-DASHBOARD');
    const index = req.quiz.teams.findIndex(x => String(x._id) === req.params.teamId);
    let teams = req.quiz.teams;
    req.quiz.teams.set(teams.splice(index, 1));

    await req.quiz.save();

    await res.json({'approved:': 'NO', 'teams': req.teams});
  } catch (error) {
    next(error);
  }
});

currentQuizRouter.put('/:roomCode/startQuestion/:questionId', async function (req, res, next) {
  try {
    messageTeamsQuestion(req, 'START-QUESTION', req.params.questionId);
    messageDashboard(req, 'UPDATE-DASHBOARD');
    messageDashboardQuestionId(req, 'NEXT_QUESTION', req.params.questionId);
    if (req.session.questionsHad === undefined) {
      req.session.questionsHad = [req.params.questionId]
    } else {
      req.session.questionsHad.push(req.params.questionId);
    }

    await res.json({'message': 'Send'});
  } catch (error) {
    next(error);
  }
});

currentQuizRouter.put('/:roomCode/endQuestion/:questionId', async function (req, res, next) {
  try {
    messageTeamsQuestion(req, 'QUESTION-ENDED', req.params.questionId);
    messageDashboard(req, 'UPDATE-DASHBOARD');
    messageDashboard(req, 'END-QUESTION');

    await res.json({'message': 'Send'});
  } catch (error) {
    next(error);
  }
});

currentQuizRouter.put('/:roomCode/endQuiz', async function (req, res, next) {
  try {
    messageTeams(req, 'QUIZ-ENDED');
    messageDashboard(req, 'UPDATE-DASHBOARD');

    await res.json({'message': 'Send'});
  } catch (error) {
    next(error);
  }
});

currentQuizRouter.put('/:roomCode/nextRound', async function (req, res, next) {
  try {
    messageDashboard(req, 'UPDATE-DASHBOARD');
    req.quiz.round++;
    req.quiz.save();

    await res.json({'message': 'Send', 'round': req.quiz.round});
  } catch (error) {
    next(error);
  }
});

module.exports = currentQuizRouter;
