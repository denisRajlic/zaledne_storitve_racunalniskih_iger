const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const Game = require('../../models/Game');
const Team = require('../../models/Team');
const User = require('../../models/User');

// @route     Get api/games
// @desc      Get all games developed by user
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

// @route     GET api/games/user
// @desc      Get games user is a part of
// @access    Private
router.get('/user', auth, async (req, res) => {
  try {
    const games = await Game.find({$or: [
      { players: { _id: req.user.id } },
      { developer: { _id: req.user.id } },
    ]});
    return res.json(games);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route     DELETE api/games/:id
// @desc      Delete game
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const game = await Game.findOne({ _id: req.params.id });
    if (!game) return res.status(404).json({ msg: 'Game not found' });

    // Check user
    if (game.developer.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });

    await game.remove();

    // Delete all teams from the game
    await Team.deleteMany({ game: req.params.id });

    return res.json({ msg: 'Game removed' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Post not found' }); // This runs if the ID passed in is not a valid object id
    res.status(500).send('Server error');
  }
});

module.exports = router;