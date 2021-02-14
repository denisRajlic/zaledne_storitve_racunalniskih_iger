const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  game: {
    type: Schema.Types.ObjectId,
    ref: 'games',
  },
  match: {
    type: Schema.Types.ObjectId,    
    ref: 'match',
  },
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  secret: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Team = mongoose.model('team', TeamSchema);

module.exports = Team;
