const Result = require('./models/Result');

const isInArray = (arr, id) => {
  let exists = false;
  arr.map(player => { if (player.id.toString() === id) return exists = true; });
  return exists;
};

const createResult = async (players, match) => {
  try {    
    const result = new Result({
      players,
      match,
    });

    await result.save();

    return result;
  } catch (err) {
    console.error(err);
  }
};

const earnXpPoints = players => {
  const randomIndex = Math.floor(Math.random() * players.length);
  players[randomIndex].xp += Math.floor(Math.random() * 100);
};

module.exports = {
  isInArray,
  createResult,
  earnXpPoints,
};
