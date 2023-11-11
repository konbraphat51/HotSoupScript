//(Advanced) Helpful geometry functions
//Maybe, for beginners, you may well try coding by yourself rather than struggling to try to use these.

/**
 * Calculate distance of 2 positions.
 * @param {number[]} pos1 position 1 [x, y]
 * @param {number[]} pos2 position 2 [x, y]
 * @returns {number} distance of the 2 positions
 */
function GetDistance(pos1, pos2) {
    return Math.sqrt(
        Math.pow(pos2[0] - pos1[0], 2) + Math.pow(pos2[1] - pos1[1], 2)
    )
}

/**
 * Calculate 2D distance of line - point.
 *
 * @param {number[]} point          positional vector of the point
 * @param {number[]} line_start     positional vector of the start point of the line
 * @param {number[]} line_direction directional vector of the line
 * @returns {number} distance of the line - point
 */
function GetDistanceFromLine2D(point, line_start, line_direction) {
    const p2s = MinusVec(point, line_start)
    const normalVector = Rotate2DVector(line_direction, 90)
    return DotVec(p2s, normalVector) / normalVector.length
}

/*
# Vectors

This library assume vector as an array.
The lengh of the array is the dimension of the vector.

All these functions doesn't change the inputed original vector.
*/

/**
 * Check if 2 vectors are in the same dimension.
 *
 * @param {number[]} vec1
 * @param {number[]} vec2
 * @returns {boolean} Whether 2 vectors are in the same dimension.
 */
function IsVecSameDimention(vec1, vec2) {
    return vec1.length == vec2.length
}

/**
 * Plus 2 vectors.
 * The input vectors won't be changed.
 *
 * @param {number[]} vec1
 * @param {number[]} vec2
 * @return {number[]} The sum vector of 2 vectors.
 */
function PlusVec(vec1, vec2) {
    const dimention = vec1.length

    let output = Array(dimention)
    for (let i = 0; i < dimention; i++) {
        output[i] = vec1[i] + vec2[i]
    }

    return output
}

/**
 * Multiply a vector by a scalar.
 *
 * @param {number} scalar Should be a number, not a vector.
 * @param {number[]} vec The original vector won't be changed.
 * @returns {number[]} The multiplied vector.
 */
function MultiplyVec(scalar, vec) {
    const dimention = vec.length

    let output = Array(dimention)
    for (let i = 0; i < dimention; i++) {
        output[i] = vec[i] * scalar
    }

    return output
}

/**
 * Minus 2 vectors. (vec1 - vec2)
 * The input vectors won't be changed.
 *
 * @param {number[]} vec1
 * @param {number[]} vec2
 * @return {number[]} The difference vector of 2 vectors.
 */
function MinusVec(vec1, vec2) {
    return PlusVec(vec1, MultiplyVec(-1, vec2))
}

/**
 * Dot product of 2 vectors.
 * @param {number[]} vec1
 * @param {number[]} vec2
 * @returns {number} The dot product of 2 vectors.
 */
function DotVec(vec1, vec2) {
    const dimention = vec1.length

    let output = 0
    for (let i = 0; i < dimention; i++) {
        output += vec1[i] * vec2[i]
    }

    return output
}

/**
 * Normalize a vector.
 *
 * @param {number[]} vec The original vector won't be changed.
 * @returns {number[]} The normalized vector.
 */
function NormalizeVec(vec) {
    const dimention = vec.length

    if (IsApproximatelyZeroVector(vec)) {
        throw "Zero vector has no direction!"
    }

    let output = CopyArray(vec)

    const length = GetVecLength(vec)

    for (let i = 0; i < dimention; i++) {
        output[i] /= length
    }

    return output
}

/**
 * Change the length of a vector with the same direction.
 *
 * @param {number[]} vec the original vector won't be changed.
 * @param {number} length The new length you want
 * @returns {number[]} The modified vector.
 */
function ChangeVecLength(vec, length) {
    if (IsApproximatelyZeroVector(vec)) {
        throw "Zero vector has no direction!"
    }

    return MultiplyVec(length, NormalizeVec(vec))
}

/**
 * Calculate length of a vector.
 *
 * @param {number[]} vec
 * @returns {number} The length of the vector.
 */
function GetVecLength(vec) {
    return Math.sqrt(DotVec(vec, vec))
}

/**
 * Calculate projection of vec_object on vec_screen.
 * JP: 正射影ベクトル
 *
 * @param {number[]} vec_screen
 * @param {number[]} vec_object
 * @returns {number[]} The projected vector.
 */
function GetOrthographicVec(vec_screen, vec_object) {
    if (
        IsApproximatelyZeroVector(vec_screen) ||
        IsApproximatelyZeroVector(vec_object)
    ) {
        return Array(vec_screen.length).fill(0)
    } else {
        return MultiplyVec(
            DotVec(vec_screen, vec_object) / DotVec(vec_screen, vec_screen),
            vec_screen
        )
    }
}

/**
 * Check if a vector is approximately zero vector.
 * Useful because floating point numbers rarely become equals.
 *
 * @param {number[]} vec
 * @returns {boolean} whether vec ~ 0
 */
function IsApproximatelyZeroVector(vec) {
    const dimention = vec.length

    for (let cnt = 0; cnt < dimention; cnt++) {
        if (!Approximate(vec[cnt], 0)) {
            return false
        }
    }

    return true
}

/**
 * Rotate a 2D vector.
 * Using 2D rotation matrix.
 *
 * @param {number[]} vec    vector to be rotated
 * @param {number} angle_delta  angle to rotate.
 * @param {boolean} is_radian   whether angle_delta is radian or degree.
 * @returns {number[]} rotated vector
 */
function Rotate2DVector(vec, angle_delta, is_radian = false) {
    if (is_radian) {
        angle_delta = (angle_delta * 180) / Math.PI
    }

    const dimention = vec.length

    if (dimention != 2) {
        throw "Only 2D vector can be rotated!"
    }

    const x = vec[0]
    const y = vec[1]
    const c = Math.cos(angle_delta)
    const s = Math.sin(angle_delta)
    return [x * c - y * s, x * s + y * c]
}
