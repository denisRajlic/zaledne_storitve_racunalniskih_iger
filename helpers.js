const Result = require('./models/Result');

const isInArray = (arr, id) => {
  let exists = false;
  arr.map(player => { if (player.user.toString() === id) return exists = true; });
  return exists;
};

const createResult = async (players, match, game) => {
  try {
    const result = new Result({
      players,
      match,
      game,
    });

    await result.save();

    return result;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  isInArray,
  createResult,
};
