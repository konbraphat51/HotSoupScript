//(Advanced) Helpful geometry functions
//Maybe, for beginners, you may well try coding by yourself rather than struggling to try to use these.

/**
 * Calculate distance of 2 positions.
 */
function GetDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

/*
# Vectors

This library assume vector as an array.
The lengh of the array is the dimension of the vector.
*/

/**
 * Check if 2 vectors are in the same dimension.
 * 
 * @returns Whether 2 vectors are in the same dimension.
 */
function IsVecSameDimention(vec1, vec2) {
    return vec1.length == vec2.length;
}

/**
 * Plus 2 vectors.
 * The input vectors won't be changed.
 * 
 * @return The sum vector of 2 vectors.
 */
function PlusVec(vec1, vec2) {
    const dimention = vec1.length;

    var output = Array(dimention);
    for (var i = 0; i < dimention; i++) {
        output[i] = vec1[i] + vec2[i];
    }

    return output;
}

/**
 * Minus 2 vectors. (vec1 - vec2)
 * The input vectors won't be changed.
 * 
 * @return The difference vector of 2 vectors.
 */
function MinusVec(vec1, vec2) {
    const dimention = vec1.length;

    var output = Array(dimention);
    for (var i = 0; i < dimention; i++) {
        output[i] = vec1[i] - vec2[i];
    }

    return output;
}

/**
 * Dot product of 2 vectors.
 */
function DotVec(vec1, vec2) {
    const dimention = vec1.length;

    var output = 0;
    for (var i = 0; i < dimention; i++) {
        output += vec1[i] * vec2[i];
    }

    return output;
}

/**
 * Normalize a vector.
 * 
 * @param {*} vec The original vector won't be changed.
 * @returns The normalized vector.
 */
function NormalizeVec(vec) {
    const dimention = vec.length;

    var output = CopyArray(vec);

    var length = 0;
    for (var i = 0; i < dimention; i++) {
        length += Math.pow(output[i], 2);
    }
    length = Math.sqrt(length);

    for (var i = 0; i < dimention; i++) {
        output[i] /= length;
    }

    return output;
}

/**
 * Multiply a vector by a scalar.
 * 
 * @param scalar Should be a number, not a vector.
 * @param vec The original vector won't be changed.
 * @returns The multiplied vector.
 */
function MultiplyVec(scalar, vec) {
    const dimention = vec.length;

    var output = Array(dimention);
    for (var i = 0; i < dimention; i++) {
        output[i] = vec[i] * scalar;
    }

    return output;
}

/**
 * Change the length of a vector with the same direction.
 * 
 * @param {*} vec the original vector won't be changed.
 * @param {*} length The new length you want
 * @returns The modified vector.
 */
function ChangeVecLength(vec, length) {
    return MultiplyVec(length, NormalizeVec(vec));
}