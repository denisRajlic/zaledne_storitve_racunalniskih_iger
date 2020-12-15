const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const Game = require('../../models/Game');
const Team = require('../../models/Team');
const User = require('../../models/User');


// @route     Get api/teams
// @desc      Get all teams by user ID
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const teams = await Team.find({ owner: req.user.id }).sort({ date: -1 }).populate('owner', ['username', 'email'], User);
    return res.json(teams);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/teams
// @desc      Create a team
// @access    Private
router.post('/', [auth, [
  check('name', 'Name is required').not().isEmpty(),
  check('gameId', 'Game ID is required').not().isEmpty(),
  check('secret', 'Secret is required').not().isEmpty(),
]],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, gameId, secret } = req.body;

  try {
    const game = await Game.findOne({ _id: gameId });
    if (!game) return res.status(400).json({ errors: [{ msg: 'Game not found' }] });

    const team = new Team({
      name,
      game: gameId,
      owner: req.user.id,
      secret,
    });

    team.players.unshift(req.user.id);
    
    await team.save();

    const exists = await Game.findOne({ players: { _id: req.user.id } });
    if (!exists) game.players.unshift(req.user.id);

    game.teams.unshift(team);

    await game.save();

    return res.json(team);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Game not found' }); // This runs if the ID passed in is not a valid object id
    res.status(500).send('Server error');
  }
});

module.exports = router;