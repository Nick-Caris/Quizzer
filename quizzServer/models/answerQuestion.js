// Dependencies
const mongoose = require('mongoose');

const answerQuestionSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  teamName: String,
  questionId: String,
  answer: String,
  right: Boolean,
});

const AnswerQuestion = mongoose.model('AnswerQuestion', answerQuestionSchema);

module.exports = answerQuestionSchema;
