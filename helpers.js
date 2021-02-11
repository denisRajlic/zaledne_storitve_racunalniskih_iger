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

module.exports = {
  isInArray,
  createResult,
};
