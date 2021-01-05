const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultSchema = new mongoose.Schema({
  players: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      xp: {
        type: Number,
        required: true,
      },      
    }
  ],
  game: {
    type: Schema.Types.ObjectId,    
    ref: 'games',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Result = mongoose.model('result', ResultSchema);

module.exports = Result;
