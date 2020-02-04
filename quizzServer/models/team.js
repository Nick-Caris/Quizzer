// Dependencies
const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  score: Number,
  approved: Boolean,
});

const Team = mongoose.model('Team', teamSchema);

module.exports = teamSchema;
