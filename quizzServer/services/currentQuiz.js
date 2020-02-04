// Dependencies
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

// Mongoose
require('../models/currentQuiz');
const CurrentQuiz = mongoose.model('CurrentQuiz');

/**
 * Creates a CurrentQuiz with an roomCode
 *
 * @returns {MongoError|Promise}
 */
createPlayQuiz = function (roomCode, lang) {
  return CurrentQuiz.create({
    _id: new ObjectID(),
    roomCode: roomCode,
    round: 0,
    lang: lang,
    teams: [],
    questions: [],
    answerQuestion: [],
  });
};

/**
 * Get's an CurrentQuiz object with the roomCode
 *
 * @param roomCode
 * @returns {Query|void}
 */
getQuiz = function (roomCode) {
  return CurrentQuiz.findOne({'roomCode': roomCode});
};

module.exports = {createPlayQuiz, getQuiz};
