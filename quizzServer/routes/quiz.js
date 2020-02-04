// Dependencies
const quizzesRouter = require('express').Router();

// Functions
const {createBaseQuiz, getBaseQuiz} = require('../services/quiz');


quizzesRouter.get(':roomCode', async function (req,res,next) {
  try {
    const quiz = await getBaseQuiz(req.params.roomCode);

    await res.json(quiz);
  }catch (error) {
    return next(error);
  }
});

module.exports = quizzesRouter;
