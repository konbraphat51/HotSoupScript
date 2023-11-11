//Helpful math functions
//Maybe, for beginners, you may well try coding by yourself rather than struggling to try to use these.

/**
 * Check if a ~ b.
 * This is useful when using floating point number. (float numbers rarely become equals)
 *
 * @param {number} a
 * @param {number} b
 * @param {number} error How much error is allowed.
 * @returns {boolean} Wheather a ~ b.
 */
function Approximate(a, b, error = 1e-5) {
	return Math.abs(a - b) < error
}
