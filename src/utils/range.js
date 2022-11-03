/**
 * Produces an array of integers ranging from 0 to the number provided.
 * @param {number} count The number to go up to (in length) e.g. 5 => [0, 1, 2, 3, 4].
 * @returns {[number]} The array of integers.
 */
function range(count) {
  return Array.from(Array(count).keys());
}

export default range;
