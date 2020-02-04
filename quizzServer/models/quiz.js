// Dependencies
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Mongoose
const teamSchema = require('./team');

const quizSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  roomCode: {type: String, required: true, unique: true},
  date: {type: Date, default: Date.now},
  teams: [teamSchema],
});

quizSchema.plugin(uniqueValidator);

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = quizSchema;
