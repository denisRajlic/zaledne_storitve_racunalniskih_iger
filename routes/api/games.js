const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const Game = require('../../models/Game');
const Team = require('../../models/Team');
const User = require('../../models/User');

// @route     Get api/games
// @desc      Get all games by user ID
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const games = await Game.find({ developer: req.user.id }).populate('developer', ['username'], User).populate('teams', [], Team);

    return res.json(games);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/games
// @desc      Create game
// @access    Private
router.post('/', [auth, [
  check('name', 'Name is required').not().isEmpty(),
]],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name } = req.body;

  try {
    let game = await Game.findOne({ name });

    if (game) return res.status(400).json({ errors: [{ msg: 'Game already exists' }] });

    game = new Game({
      name,
      developer: req.user.id,
    });    

    // Save the user to the DB
    await game.save();

    return res.json(game);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Game not found' }); // This runs if the ID passed in is not a valid object id
    res.status(500).send('Server error');
  }
});

module.exports = router;