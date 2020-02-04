// Dependencies
const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  question: String,
  answer: String,
  category: String,
  language: String,
});

const Question = mongoose.model('Question', questionSchema);

module.exports = questionSchema;
