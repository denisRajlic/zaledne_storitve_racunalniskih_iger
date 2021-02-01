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
  match: {
    type: Schema.Types.ObjectId,    
    ref: 'match',
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
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
