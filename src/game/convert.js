/**
 * This converts the arguments of dimension, starting indices, and lengths of blocks into an array of true and false,
 * which represents filled and crossed respectively.
 * @param {number} dimension The size of the column or row.
 * @param {[number]} indices An array of starting indices of the blocks.
 * @param {[number]} lengths An array of lengths of the blocks.
 * @returns {[number]} An array of true/false of length matching dimension.
 */
function convert(dimension, indices, lengths, debug = false) {
  const log = debug ? console.log : noop;

  log(`converting for ${dimension} with indices ${JSON.stringify(indices)} and lengths ${JSON.stringify(lengths)}`);

  /** This represents which index in the indices and lengths parameters we are currently checking against. */
  let blockIndex = 0;

  /** This represents the value of the previous iteration when deciding if a value is true/filled or false/crossed */
  let lastSet = false;

  const values = Array(dimension);

  for (let i = 0; i < dimension; i++) {
    log(`looking at value in position ${i}`);

    if (blockIndex >= indices.length) {
      // if we have gone past the last block, then the rest are crossed
      log("gone past the end of last block: false");
      values[i] = false;
    } else if (i < indices[blockIndex]) {
      // if we are not yet at the next block, then it is crossed
      log("not yet at the start of next block: false");
      values[i] = false;
    } else if (i + 1 > indices[blockIndex] + lengths[blockIndex]) {
      // if we have gone past the end of a block, then it is crossed
      log("gone past the end of a block: false");
      if (lastSet) {
        // if we only just passed an end, then we need to increment the block index we are looking at
        log("incrementing the block index because we only just passed a block");
        blockIndex++;
      }
      values[i] = false;
    } else {
      // otherwise, we are in a block and it is filled.
      log("within a block: true");
      values[i] = true;
    }

    // we are marking what we just set so that the next iteration can decide whether or not to increment the block index.
    lastSet = values[i];
  }

  return values;
}

function noop() {}

// module.exports = convert;
export default convert;
