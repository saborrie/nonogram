/**
 * Creates an array of block lengths from an array of true/false values representing filled/blank squares.
 * @param {[boolean]} values The list of boolean filled/blank values
 * @returns {[number]} The list of clue numbers.
 */
function createClue(values) {
  const groups = [];

  let lastSeen = false;

  for (let i = 0; i < values.length; i++) {
    if (values[i]) {
      if (lastSeen) {
        groups[groups.length - 1]++;
      } else {
        groups.push(1);
      }
    }

    lastSeen = values[i];
  }

  return groups;
}

export default createClue;
