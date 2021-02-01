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
  matches: {
    type: Schema.Types.ObjectId,
    ref: 'matches',
  },
  players: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      xp: {
        type: Number,
        default: 0,
      },
    }
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Game = mongoose.model('game', GameSchema);

module.exports = Game;
