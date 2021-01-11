const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const io = require('../../server');

const User = require('../../models/User');
const Result = require('../../models/Result');
const Game = require('../../models/Game');

function updateScore() {
  const results = User.find().sort({ xp: -1 });
  console.log(results);
}

// @route     POST api/results
// @desc      Create a result
// @access    Private
router.post('/', [auth, [
  check('players', 'Players are required').not().isEmpty(),
  check('game', 'Game is required').not().isEmpty(),  
]],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  
  const { players, game } = req.body;

  try {
    
    // Check if player ID's are valid

    let playerId;

    for (let i = 0; i < players.length; i++) {
      playerId = await Game.findOne({ players: { _id: players[i].user }});
      if (!playerId) return res.status(404).json({ msg: 'User is not a player of the game'});
    }

    // Check if game ID is valid
    const gameId = await Game.findOne({ _id: game });

    if (!gameId) return res.status(404).json({ msg: 'Game not valid' });

    const result = new Result({
      players,
      game,
    });

    await result.save();

    // Update player results
    for (let i = 0; i < players.length; i++) {
      playerId = await User.findOne({ _id: players[i].user });
      playerId.xp += parseInt(players[i].xp);
      await playerId.save();
    }    

    return res.json(result);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Player not found' });
    res.status(500).send('Server error');
  }
});

module.exports = router;
