const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  games: [
    {
      game: {
        type: Schema.Types.ObjectId,
        ref: 'games',
      }
    }
  ],
  teams: [
    {
      team: {
        type: Schema.Types.ObjectID,
        ref: 'teams',
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
