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
  match: {
    type: Schema.Types.ObjectId,    
    ref: 'match',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Result = mongoose.model('result', ResultSchema);

module.exports = Result;
