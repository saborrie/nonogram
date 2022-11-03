/**
 * Generates all the possible positions from this clue.
 * @param {number} dimension The length or width of this column or row.
 * @param {[number]} clue An array of numbers representing the clue items. e.g. [1, 2, 1]
 * @returns {[[number]]} An array of arrays of positions of each of the clue items.
 */
function generate(dimension, clue, debug = false) {
  const log = debug ? console.log : noop;

  log(`generating for ${dimension} with clue ${JSON.stringify(clue)}`);

  if (clue.length < 1) {
    log("there are no clues left, exit branch.");
    return [];
  }

  // start by deciding how much space must be left after the first block
  const mustLeaveSpaceAfter = clue.slice(1).length + clue.slice(1).reduce(add, 0);
  log(`mustleavespaceafter: ${mustLeaveSpaceAfter}`);

  // calculate the number of available starting positions:
  const maxStartingIndex = dimension - mustLeaveSpaceAfter - clue[0];
  log(`maxStartingIndex: ${maxStartingIndex}`);

  const combinations = [];

  for (let i = 0; i <= maxStartingIndex; i++) {
    log(`generating for i=${i} for block ${clue[0]}`);

    const laterCombinations = generate(dimension - i - clue[0] - 1, clue.slice(1));

    if (laterCombinations.length < 1) {
      log(`found end of solutions: ${i}`);
      combinations.push([i]);
    }

    for (let laterCombinationIndex = 0; laterCombinationIndex < laterCombinations.length; laterCombinationIndex++) {
      combinations.push([i].concat(laterCombinations[laterCombinationIndex].map(v => v + i + clue[0] + 1)));
    }
  }

  return combinations;
}

function add(a, b) {
  return a + b;
}

function noop() {}

/*

notes

the total space after each section is equal to the total values of later clues + (1 - number of later clues)
e.g. clues [4, 5, 1] on a row of width 15:
  the total space that must always be left by the 4 is (1 + gap + 5 + gap) = 8
  that leaves a space of 7 (i.e. 15 - 8) to place the 4 block, which means there are only so many starting places

  the number of starting positions are equal to the space allowed + 1 - size of block. i.e. 7 + 1 - 4 = 4.
*/

/// test
// console.log(generate(15, [4, 5, 2]));

// module.exports = generate;
export default generate;
