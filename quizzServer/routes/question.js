// Dependencies
const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const _ = require("underscore");
const questionsRouter = require('express').Router();

// Mongoose
require('../models/question');
const Question = mongoose.model('Question');

questionsRouter.get('/categories', async function (req, res, next) {
  try {
    Question.find({'language': req.session.lang}).distinct('category', function (error, categories) {

      res.json(categories);
    });
  } catch (error) {
    next(error);
  }
});

questionsRouter.get('/category/:category', async function (req, res, next) {
  try {
    Question.find({
      'category': req.params.category,
      '_id': {$nin: (req.session.questionsHad || [])}
    }, function (err, question) {

      res.json(_.sample(question, 4));
    });
  } catch (error) {
    next(error);
  }
});

questionsRouter.get('/:id', async function (req, res, next) {
  try {
    Question.findOne({_id: ObjectID(req.params.id)}, function (err, question) {
      if (req.session.questionsHad === undefined) req.session.questionsHad = [question._id];
      else req.session.questionsHad.push(question._id);

      res.json(question);
    });
  } catch (error) {
    next(error);
  }
});

questionsRouter.get('/teamQuestion/:id', async function (req, res, next) {
  try {
    Question.findOne({_id: ObjectID(req.params.id)}, function (err, question) {
      if (req.session.questionsHad === undefined) req.session.questionsHad = [question._id];
      else req.session.questionsHad.push(question._id);

      res.json({'id': question._id, 'category': question.category, 'question': question.question});
    });
  } catch (error) {
    next(error);
  }
});

module.exports = questionsRouter;
