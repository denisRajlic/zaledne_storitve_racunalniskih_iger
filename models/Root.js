const mongoose = require('mongoose');

const RootSchema = new mongoose.Schema({  
  games: [
    {
      game: {
        type: Schema.Types.ObjectId,
        ref: 'games'
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Root = mongoose.model('root', RootSchema);

module.exports = Root;
