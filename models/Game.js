const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  developer: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  teams: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'teams'
      }
    }
  ],
  players: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Game = mongoose.model('game', GameSchema);

module.exports = Game;
