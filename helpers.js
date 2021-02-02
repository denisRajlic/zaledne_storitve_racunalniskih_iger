const isInArray = (arr, id) => {
  let exists = false;
  arr.map(player => { if (player.id.toString() === id) return exists = true; });
  return exists;
};

module.exports = isInArray;
