const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Match = require('../../models/Match');
const Team = require('../../models/Team');
const Game = require('../../models/Game');

const isInArray = require('../../helpers').isInArray;

// @route     POST api/games
// @desc      Create a game
// @access    Private
router.post('/', [auth, [
  check('name', 'Name is required').not().isEmpty(),
]],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  
  const { name } = req.body;

  try {
    const game = new Game({
      name,
      developer: req.user.id,
    });

    await game.save();

    return res.json(game);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Player not found' });
    res.status(500).send('Server error');
  }
});

// @route     DELETE api/games/:id
// @desc      Delete a game
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const game = await Game.findOne({ _id: req.params.id });

    if (!game) return res.status(404).json({ msg: 'Game not found' });

    // Check user
    if (game.developer.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });

    // Delete all teams and matches from the game
    await Team.deleteMany({ game: req.params.id });
    await Match.deleteMany({ game: req.params.id });

    // Delete the game
    await game.remove();

    return res.json({ msg: 'Game, teams and matches removed' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Game not found' });
    res.status(500).send('Server error');
  }
});

// @route     POST api/games/:id
// @desc      Join game
// @access    Private
router.post('/:id', auth, async (req, res) => {
  try {
    // Check if game exists
    const game = await Game.findOne({ _id: req.params.id });
    if (!game) return res.status(404).json({ msg: 'Game not found' });

    // Check if user is already in the players array
    if (isInArray(game.players, req.user.id)) return res.status(400).json({ errors: [{ msg: 'User already joined' }] });

    game.players.unshift(req.user.id);
    await game.save();

    return res.json(game);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Player not found' });
    res.status(500).send('Server error');
  }
});

module.exports = router;
