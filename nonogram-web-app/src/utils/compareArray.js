/**
 * Compare 2 Arrays.
 * @param {[any]} a1
 * @param {[any]} a2
 * @returns {boolean} True if identical, false if not.
 */
function compareArray(a1, a2) {
  if (a1.length !== a2.length) return false;
  let i = a1.length;
  while (i--) {
    if (a1[i] !== a2[i]) return false;
  }
  return true;
}

export default compareArray;
