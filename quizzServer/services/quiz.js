// Dependencies
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const crypto = require("crypto");

// Mongoose
require('../models/quiz');
const Quiz = mongoose.model('Quiz');

/**
 * This function recursive creates a Quiz object until a unique code is generated.
 *
 * @returns {Promise<*>}
 */
createBaseQuiz = async function generateRoomCode() {
  try {
    return await Quiz.create({
      _id: new ObjectID(),
      roomCode: crypto.randomBytes(5).toString('hex'),
      teams: [],
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      await generateRoomCode();
    } else {
      return error;
    }
  }
};

/**
 *
 * @param roomCode
 * @returns {Promise<void|Query>}
 */
getBaseQuiz = async function (roomCode) {
  return Quiz.findOne({'roomCode': roomCode});
};

module.exports = {createBaseQuiz, getBaseQuiz};
