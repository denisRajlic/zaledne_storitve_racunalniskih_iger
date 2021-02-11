const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Result = require('../../models/Result');
const Match = require('../../models/Match');
const Game = require('../../models/Game');

const createResult = require('../../helpers').createResult;

// @route     POST api/results
// @desc      Create a result
// @access    Public
router.post('/', [
  check('players', 'Players are required').not().isEmpty(),
  check('match', 'Match is required').not().isEmpty(),
  check('gameId', 'Game ID is required').not().isEmpty(),
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    const { players, match, gameId } = req.body;

    try {
      // Check if player ID's are valid
      let playerId;

      for (let i = 0; i < players.length; i++) {
        playerId = await Match.findOne({ players: { _id: players[i].user }});
        if (!playerId) return res.status(404).json({ msg: 'User is not a player of the match'});
      }

      // Check if match ID is valid
      const matchId = await Match.findOne({ _id: match });

      if (!matchId) return res.status(404).json({ msg: 'Match not valid' });

      const result = await createResult(players, match);

      // // Update player results
      // const game = await Game.findOne({ _id: gameId });
      // let user;

      // for (let i = 0; i < players.length; i++) {
      //   game.players.find(player => player._id.toString() === players[i].user.toString()).xp += parseInt(players[i].xp);
      //   await game.save();
      // }

      return res.json(result);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Player not found' });
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
