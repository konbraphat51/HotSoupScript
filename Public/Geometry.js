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
		Math.pow(pos2[0] - pos1[0], 2) + Math.pow(pos2[1] - pos1[1], 2),
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

/**
 * Judge if two 2D line segment are crossing.
 *
 * @param {number[]} line0_start positional vector of the start point of the line 0
 * @param {number[]} line0_end   positional vector of the end point of the line 0
 * @param {number[]} line1_start positional vector of the start point of the line 1
 * @param {number[]} line1_end   positional vector of the end point of the line 1
 * @returns {boolean} whether the two line segments are crossing
 */
function IsLineSegmentIntersecting(
	line0_start,
	line0_end,
	line1_start,
	line1_end,
) {
	// https://qiita.com/zu_rin/items/e04fdec4e3dec6072104

	let s =
		(line0_start[0] - line0_end[0]) * (line1_start[1] - line0_start[1]) -
		(line0_start[1] - line0_end[1]) * (line1_start[0] - line0_start[0])
	let t =
		(line0_start[0] - line0_end[0]) * (line1_end[1] - line0_start[1]) -
		(line0_start[1] - line0_end[1]) * (line1_end[0] - line0_start[0])

	if (Approximate(s, 0) || Approximate(t, 0)) {
		// on line
		return false
	} else if (s * t > 0) {
		// on same side
		return false
	}

	s =
		(line1_start[0] - line1_end[0]) * (line0_start[1] - line1_start[1]) -
		(line1_start[1] - line1_end[1]) * (line0_start[0] - line1_start[0])
	t =
		(line1_start[0] - line1_end[0]) * (line0_end[1] - line1_start[1]) -
		(line1_start[1] - line1_end[1]) * (line0_end[0] - line1_start[0])

	if (Approximate(s, 0) || Approximate(t, 0)) {
		// on line
		return false
	} else if (s * t > 0) {
		// on same side
		return false
	}

	return true
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
 * Cross product of 2 vectors.
 * Only defined for 2D and 3D vectors.
 *
 * @param {number[]} vec1 2D or 3D vector
 * @param {number[]} vec2 2D or 3D vector
 * @returns {number[]} The cross product of 2 vectors.
 */
function CrossVec(vec1, vec2) {
	// if 2D...
	if (vec1.length == 2) {
		return vec1[0] * vec2[1] - vec1[1] * vec2[0]
	}
	// if 3D...
	else if (vec1.length == 3) {
		return [
			vec1[1] * vec2[2] - vec1[2] * vec2[1],
			vec1[2] * vec2[0] - vec1[0] * vec2[2],
			vec1[0] * vec2[1] - vec1[1] * vec2[0],
		]
	}
	// if other dimension...
	else {
		throw "Cross product is currently only defined for 2D and 3D vectors!"
	}
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
			vec_screen,
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
 * @param {number} angle_delta  angle to rotate. clockwise,
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

class Polygon {
	/**
	 * @param {number[][]} vertices	relative (from center) positional vectors of the vertices of the polygon
	 * @param {number[]} center		positional vector of the center of the polygon
	 * @param {number} rotation		rotation of the polygon (degrees, counterclockwise)
	 * @param {number} scale		scale of the polygon
	 */
	constructor(vertices, center = [0, 0], rotation = 0, scale = 1) {
		this.vertices_unrotated = vertices
		this.center = center
		this.rotation = rotation
		this.scale = scale
	}

	/**
	 * Draw this polygon
	 */
	Draw() {
		let vertices = this.ComputeVertices()

		DrawPolygon(vertices)
	}

	/**
	 * Compute abosolute positions vertices of the polygon after rotation and moving by center.
	 *
	 * @returns {number[][]} absolute positional vectors of the vertices of the polygon
	 */
	ComputeVertices() {
		let vertices_moved = new Array(this.vertices_unrotated.length)
		let rotation = (this.rotation * Math.PI) / 180

		for (let cnt = 0; cnt < this.vertices_unrotated.length; cnt++) {
			//rotation
			let x_before = this.vertices_unrotated[cnt][0]
			let y_before = this.vertices_unrotated[cnt][1]

			let x_after =
				x_before * Math.cos(rotation) - y_before * Math.sin(rotation)
			let y_after =
				x_before * Math.sin(rotation) + y_before * Math.cos(rotation)

			vertices_moved[cnt] = [x_after, y_after]

			//scale
			vertices_moved[cnt] = MultiplyVec(this.scale, vertices_moved[cnt])

			//move by center
			vertices_moved[cnt] = PlusVec(vertices_moved[cnt], this.center)
		}

		return vertices_moved
	}

	/**
	 * Judge if a given point is inside this polygon.
	 *
	 * @param {number[]} point Abosolute positional vector of the point
	 * @returns {boolean} whether the point is inside this polygon
	 */
	IsPointInside(point, x_faraway = 1e5, y_faraway = 1e5) {
		let vertices = this.ComputeVertices()

		let intersected = 0
		for (let cnt = 0; cnt < vertices.length; cnt++) {
			let vertex_start = vertices[cnt]
			let vertex_end = vertices[(cnt + 1) % vertices.length]

			if (
				IsLineSegmentIntersecting(
					point,
					[x_faraway, y_faraway],
					vertex_start,
					vertex_end,
				)
			) {
				intersected++
			}
		}
		return intersected % 2 == 1
	}

	/**
	 * Clone this polygon
	 * @returns {Polygon} cloned polygon
	 */
	Clone() {
		return new Polygon(
			this.vertices_unrotated,
			this.center,
			this.rotation,
			this.scale,
		)
	}
}

async function LoadPolygons(filenames) {
	let data = await LoadFiles(filenames)

	let polygons = new Array(data.length)

	for (let cnt = 0; cnt < data.length; cnt++) {
		let lines = data[cnt].split("\n")

		let vertices = []

		for (let cnt2 = 0; cnt2 < lines.length; cnt2++) {
			let line = lines[cnt2]

			if (line == "") {
				continue
			}

			let numbers = line.split(",")

			vertices.push([parseFloat(numbers[0]), parseFloat(numbers[1])])
		}

		polygons[cnt] = new Polygon(vertices, [0, 0], 0)
	}

	return polygons
}
