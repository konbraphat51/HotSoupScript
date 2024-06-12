// Graphics

/**
 * Set canvas size
 *
 * @param {number | number[]} width Width of canvas. If array, [width, height]
 * @param {?number} height Height of canvas. If width is array, this is ignored.
 */
function SetCanvasSize(width, height = null) {
	if (Array.isArray(width)) {
		height = width[1]
		width = width[0]
	}

	__HSS_GRAPHICS_PRIVATE.canvas.width = width
	__HSS_GRAPHICS_PRIVATE.canvas.height = height

	__HSS_GRAPHICS_PRIVATE.width = width
	__HSS_GRAPHICS_PRIVATE.height = height
}

/**
 * Set font for next text
 *
 * @param {string} text Font text
 */
function SetFont(text) {
	__HSS_GRAPHICS_PRIVATE.ctx.font = text
}

/**
 * Set color for next texture
 *
 * @param {string} color Color text
 */
function SetColor(color) {
	__HSS_GRAPHICS_PRIVATE.ctx.fillStyle = color
	__HSS_GRAPHICS_PRIVATE.ctx.strokeStyle = color
}

/**
 * Get canvas size.
 *
 * @returns {number[]} [width, height]
 */
function GetCanvasSize() {
	return [__HSS_GRAPHICS_PRIVATE.width, __HSS_GRAPHICS_PRIVATE.height]
}

/**
 * Write a text
 *
 * @param {*} text What you want to write
 * @param {number | number[]} x Where you want to write it: x position. If array, [x, y]
 * @param {?number} y Where you want to write it: y position. If x is array, this is ignored.
 */
function DrawText(text, x, y = null) {
	if (Array.isArray(x)) {
		y = x[1]
		x = x[0]
	}

	__HSS_GRAPHICS_PRIVATE.ctx.fillText(text, x, y)
}

/**
 * Draw a line
 *
 * @param {number} x1 Start point: x position
 * @param {number} y1 Start point: y position
 * @param {number} x2 End point: x position
 * @param {number} y2 End point: y position
 * @param {number} line_width Width of line
 */
function DrawLine(x1, y1, x2, y2, line_width) {
	__HSS_GRAPHICS_PRIVATE.ctx.beginPath()
	__HSS_GRAPHICS_PRIVATE.ctx.moveTo(x1, y1)
	__HSS_GRAPHICS_PRIVATE.ctx.lineTo(x2, y2)
	__HSS_GRAPHICS_PRIVATE.ctx.line_width = line_width
	__HSS_GRAPHICS_PRIVATE.ctx.stroke()
}

/**
 * Draw a line by using 2 vectors. Same as DrawLine()
 *
 * @param {number[]} vec1 position 1 [x, y]
 * @param {number[]} vec2 position 2 [x, y]
 * @param {number} line_width width of line
 */
function DrawLineByVec(vec1, vec2, line_width) {
	DrawLine(vec1[0], vec1[1], vec2[0], vec2[1], line_width)
}

/**
 * Draw a rectangle
 *
 * @param {number} lefttop_x left top point: x position
 * @param {number} lefttop_y left top point: y position
 * @param {number} rightbottom_x right bottom point: x position
 * @param {number} rightbottom_y right bottom point: y position
 */
function DrawRect(lefttop_x, lefttop_y, rightbottom_x, rightbottom_y) {
	__HSS_GRAPHICS_PRIVATE.ctx.fillRect(
		lefttop_x,
		lefttop_y,
		rightbottom_x - lefttop_x,
		rightbottom_y - lefttop_y,
	)
}

/**
 * Draw a rectangle by using 2 vectors. Same as DrawRect()
 *
 * @param {number[]} lefttop        positional vector of left top point
 * @param {number[]} rightbottom    positional vector of right bottom point
 */
function DrawRectByVec(lefttop, rightbottom) {
	DrawRect(lefttop[0], lefttop[1], rightbottom[0], rightbottom[1])
}

/**
 * Draw a circle
 *
 * @param {number} center_x x position of center
 * @param {number} center_y y position of center
 * @param {number} radius radius of circle
 */
function DrawCircle(center_x, center_y, radius) {
	__HSS_GRAPHICS_PRIVATE.ctx.beginPath()
	__HSS_GRAPHICS_PRIVATE.ctx.arc(center_x, center_y, radius, 0, 2 * Math.PI)
	__HSS_GRAPHICS_PRIVATE.ctx.fill()
}

/**
 * Draw a circle by using vector. Same as DrawCircle()
 *
 * @param {number[]} center     positional vector of center
 * @param {number} radius       radius of circle
 */
function DrawCircleByVec(center, radius) {
	DrawCircle(center[0], center[1], radius)
}

/**
 * Draw a picture.
 *
 * Should be loaded by LoadImages() in advance
 *
 * @param {Img} picture_data  data loaded by LoadPicture()
 * @param {number} posX          x position of the picture drawing here
 * @param {number} posY          y position of the picture drawing here
 * @param {number} width         width(x) of the picture drawing here. If -1, original size.
 * @param {number} height        height(y) of the picture drawing here. If -1, original size
 */
function DrawImage(picture_data, posX, posY, width, height) {
	__HSS_GRAPHICS_PRIVATE.ctx.drawImage(picture_data, posX, posY, width, height)
}

/**
 * Draw a picture by using vector. Same as DrawImage()
 *
 * @param {Img} picture_data    data loaded by LoadPicture()
 * @param {number[]} pos    positional vector of the picture drawing here
 * @param {number} width    width(x) of the picture drawing here. If -1, original size.
 * @param {number} height   height(y) of the picture drawing here. If -1, original size
 */
function DrawImageByVec(picture_data, pos, width, height) {
	DrawImage(picture_data, pos[0], pos[1], width, height)
}

/**
 * Draw a polygon
 *
 * @param {number[][]} vertices	Position vectors of vertices of polygon
 */
function DrawPolygon(vertices) {
	if (vertices.length < 3) {
		return
	}

	__HSS_GRAPHICS_PRIVATE.ctx.beginPath()
	__HSS_GRAPHICS_PRIVATE.ctx.moveTo(vertices[0][0], vertices[0][1])
	for (let i = 1; i < vertices.length; i++) {
		__HSS_GRAPHICS_PRIVATE.ctx.lineTo(vertices[i][0], vertices[i][1])
	}
	__HSS_GRAPHICS_PRIVATE.ctx.closePath()
	__HSS_GRAPHICS_PRIVATE.ctx.fill()
}

/**
 * Load picture data. Give this data to DrawPicture().
 * This will wait until the picture is loaded. So you may load this in the first place.
 *
 * BeCareful: if you want single picture data: (await LoadImages([path]))[0]
 *
 * @param {string[]} pathes      If you want to load "a.png" in B folder, input "/B/a.png". It should be a list
 * @returns {Img[]} picture data. Give this data to DrawPicture().
 */
async function LoadImages(pathes) {
	__HSS_GRAPHICS_PRIVATE.images_loaded = new Array(pathes.length)
	__HSS_GRAPHICS_PRIVATE.images_loaded.fill(false)

	//output
	let imgs = new Array(pathes.length)

	//load
	for (let i = 0; i < pathes.length; i++) {
		//start loading image
		const img = new Image()
		img.src = pathes[i]
		img.loadingNum = i

		//report as loaded
		img.onload = function () {
			__HSS_GRAPHICS_PRIVATE.images_loaded[this.loadingNum] = true
		}

		imgs[i] = img
	}

	//wait for loading
	await __HSS_GRAPHICS_PRIVATE.WaitForLoaded()

	return imgs
}

/**
 * Get a color of a pixel
 *
 * @param {number} x position X
 * @param {number} y position Y
 * @returns {number[]} [R, G, B, A]
 */
function PickColor(x, y) {
	const data = __HSS_GRAPHICS_PRIVATE.ctx.getImageData(x, y, 1, 1).data
	return [data[0], data[1], data[2], data[3]]
}

/**
 * Get array of color data of all pixel
 *
 * @returns {number[][]} [[R, G, B, A], ...]
 */
function PickAllColor() {
	const data = __HSS_GRAPHICS_PRIVATE.ctx.getImageData(
		0,
		0,
		__HSS_GRAPHICS_PRIVATE.width,
		__HSS_GRAPHICS_PRIVATE.height,
	).data
	const colors = []
	for (let i = 0; i < data.length; i += 4) {
		colors.push([data[i], data[i + 1], data[i + 2], data[i + 3]])
	}
	return colors
}

/**
 * Set color of a pixel
 *
 * @param {number} x position X
 * @param {number} y position Y
 * @param {number[]} color [R, G, B, A]
 */
function SetPixelColor(x, y, color) {
	const data = __HSS_GRAPHICS_PRIVATE.ctx.createImageData(1, 1)
	data.data[0] = color[0]
	data.data[1] = color[1]
	data.data[2] = color[2]
	data.data[3] = color[3]
	__HSS_GRAPHICS_PRIVATE.ctx.putImageData(data, x, y)
}

/**
 * Set all pixed from color array from PickAllColor()
 *
 * @param {number[][]} colors [[R, G, B, A], ...]
 */
function SetAllPixelColor(colors) {
	const data = __HSS_GRAPHICS_PRIVATE.ctx.createImageData(
		__HSS_GRAPHICS_PRIVATE.width,
		__HSS_GRAPHICS_PRIVATE.height,
	)
	for (let i = 0; i < colors.length; i++) {
		data.data[i * 4] = colors[i][0]
		data.data[i * 4 + 1] = colors[i][1]
		data.data[i * 4 + 2] = colors[i][2]
		data.data[i * 4 + 3] = colors[i][3]
	}
	__HSS_GRAPHICS_PRIVATE.ctx.putImageData(data, 0, 0)
}

//---------------------Not for using---------------------

/**
 * Not for using
 */
class __HSS_Graphics_Private {
	height = 600
	width = 800

	//get canvas
	canvas = document.getElementById(__CANVAS_NAME)

	//using this canvas reference
	ctx = document.getElementById(__CANVAS_NAME).getContext("2d")

	//for waiting for loading
	lib_loaded = []

	async WaitForLoaded() {
		//busy wait
		for (;;) {
			//check if all loaded
			let loaded = true
			for (let i = 0; i < __HSS_GRAPHICS_PRIVATE.images_loaded.length; i++) {
				if (!__HSS_GRAPHICS_PRIVATE.images_loaded[i]) {
					loaded = false
					break
				}
			}

			if (loaded) {
				break
			}

			//wait for 1ms
			// loaded event will come in this sleep
			await Sleep(1)
		}

		return
	}
}

const __HSS_GRAPHICS_PRIVATE = new __HSS_Graphics_Private()
