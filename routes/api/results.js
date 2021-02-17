const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Match = require('../../models/Match');

const createResult = require('../../helpers').createResult;

// @route     POST api/results
// @desc      Create a result
// @access    Public
router.post('/', [
  check('players', 'Players are required').not().isEmpty(),
  check('match', 'Match is required').not().isEmpty(),
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    const { players, match } = req.body;

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

      return res.json(result);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Player not found' });
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
