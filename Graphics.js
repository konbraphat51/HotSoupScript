//canvas size
const CANVAS_X = 800;
const CANVAS_Y = 600;

//set canvas size
const canvas = document.getElementById("canvas");
canvas.width = CANVAS_X;
canvas.height = CANVAS_Y;

//using this canvas reference
const ctx = document.getElementById("canvas").getContext("2d");
ctx.font = "30px Arial";

/**
 * Write a text
 * 
 * @param text What you want to write
 * @param x Where you want to write it: x position
 * @param y Where you want to write it: y position 
 */
function DrawText(text, x, y) {
    ctx.fillText(text, x, y);
}

/**
 * Draw a line
 * 
 * @param x1 Start point: x position
 * @param y1 Start point: y position
 * @param x2 End point: x position
 * @param y2 End point: y position
 * @param line_width Width of line
 */
function DrawLine(x1, y1, x2, y2, line_width) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2,y2);
    ctx.line_width = line_width;
    ctx.stroke();
}

/**
 * Draw a rectangle
 */
function DrawRect(lefttop_x, lefttop_y, rightbottom_x, rightbottom_y) {
    ctx.fillRect(lefttop_x, lefttop_y, rightbottom_x-lefttop_x, rightbottom_y-lefttop_y);
}

/**
 * Draw a circle
 */
function DrawCircle(center_x, center_y, radius) {
    ctx.beginPath();
    ctx.arc(center_x, center_y, radius, 0, 2 * Math.PI);
    ctx.fill();
}

/**
 * Draw a picture. 
 * 
 * Should be loaded by LoadPicture() in advance
 * 
 * @param picture_data  data loaded by LoadPicture()
 * @param width         width(x) of the picture drawing here. If -1, original size.
 * @param height        height(y) of the picture drawing here. If -1, original size
 */
function DrawPicture(picture_data, posX, posY, width, height) {
    ctx.drawImage(img, posX, posY, width, height);
}

//for waiting for loading
var __lib___loaded = [];

/**
 * Load picture data. Give this data to DrawPicture()
 *
 * @param {string[]} pathes      If you want to load "a.png" in B folder, input "/B/a.png". It should be a list
*/
function LoadPictures(pathes) {
    __lib___loaded = new Array(pathes.length);
    __lib___loaded.fill(false);

    for (let i = 0; i < pathes.length; i++) {
        const img = new Image();
        img.src = pathes[i];
        img.loadingNum = i;

        img.onload = function() {
            __lib___loaded[this.loadingNum] = true;
        }
    }

    //wait for loading
    __WaitForLoaded();

    return img;
}

function __WaitForLoaded() {
    //busy wait
    while (true) {
        //check if all loaded
        let loaded = true;
        for (let i = 0; i < __lib___loaded.length; i++) {
            if (!__lib___loaded[i]) {
                loaded = false;
                break;
            }
        }

        if (loaded) {
            break;
        }
    }

    return
}

/**
 * Set font for next text
 */
function SetFont(text) {
    ctx.font = text;
}

/**
 * Set color for next texture
 */
function SetColor(color) {
    ctx.fillStyle = color;
}