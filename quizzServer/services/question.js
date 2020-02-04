// Dependencies
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

// Mongoose
require('../models/question');
const Question = mongoose.model('Question');

/**
 * Get's an CurrentQuiz object with the roomCode
 *
 * @param id
 * @returns {Query|void}
 */
getQuestion = function (id) {
  return Question.findOne({_id: ObjectID(id)});
};

module.exports = {getQuestion};
