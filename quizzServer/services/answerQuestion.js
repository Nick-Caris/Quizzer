// Dependencies
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

// Mongoose
require('../models/answerQuestion');
const AnswerQuestion = mongoose.model('AnswerQuestion');

/**
 * Creates a answerQuestion
 *
 * @returns {MongoError|Promise}
 */
createAnswerQuestion = function (data) {
  return AnswerQuestion.create({
    _id: new ObjectID(),
    teamName: data.teamName,
    questionId: data.questionId,
    answer: data.answer,
    right: null,
  });
};

module.exports = {createAnswerQuestion};
