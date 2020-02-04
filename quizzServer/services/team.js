// Mongoose
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
require('../models/team');
const Team = mongoose.model('Team');

/**
 *
 * @param name
 * @returns {MongoError|Promise}
 */
createTeam = function (name) {
  return Team.create({
    _id: new ObjectID(),
    name: name,
    score: 0,
    approved: null,
  });
};

/**
 * Get's an Team object with the id
 *
 * @param id
 * @returns {Query|void}
 */
getTeam = function (id){
  return Team.findOne({_id: ObjectID(id)});
};

module.exports = {createTeam, getTeam};
