// Graphics

/**
 * Set canvas size
 */
function SetCanvasSize(width, height) {
    __HSS_GRAPHICS_PRIVATE.canvas.width = width;
    __HSS_GRAPHICS_PRIVATE.canvas.height = height;

    __HSS_GRAPHICS_PRIVATE.width = width;
    __HSS_GRAPHICS_PRIVATE.height = height;
}

/**
 * Set font for next text
 */
function SetFont(text) {
    __HSS_GRAPHICS_PRIVATE.ctx.font = text;
}

/**
 * Set color for next texture
 */
function SetColor(color) {
    __HSS_GRAPHICS_PRIVATE.ctx.fillStyle = color;
}

/**
 * Get canvas size.
 * 
 * @returns [width, height]
 */
function GetCanvasSize() {
    return [__HSS_GRAPHICS_PRIVATE.width, __HSS_GRAPHICS_PRIVATE.height]
}

/**
 * Write a text
 * 
 * @param text What you want to write
 * @param x Where you want to write it: x position
 * @param y Where you want to write it: y position 
 */
function DrawText(text, x, y) {
    __HSS_GRAPHICS_PRIVATE.ctx.fillText(text, x, y);
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
    __HSS_GRAPHICS_PRIVATE.ctx.beginPath();
    __HSS_GRAPHICS_PRIVATE.ctx.moveTo(x1, y1);
    __HSS_GRAPHICS_PRIVATE.ctx.lineTo(x2,y2);
    __HSS_GRAPHICS_PRIVATE.ctx.line_width = line_width;
    __HSS_GRAPHICS_PRIVATE.ctx.stroke();
}

/**
 * Draw a rectangle
 */
function DrawRect(lefttop_x, lefttop_y, rightbottom_x, rightbottom_y) {
    __HSS_GRAPHICS_PRIVATE.ctx.fillRect(lefttop_x, lefttop_y, rightbottom_x-lefttop_x, rightbottom_y-lefttop_y);
}

/**
 * Draw a circle
 */
function DrawCircle(center_x, center_y, radius) {
    __HSS_GRAPHICS_PRIVATE.ctx.beginPath();
    __HSS_GRAPHICS_PRIVATE.ctx.arc(center_x, center_y, radius, 0, 2 * Math.PI);
    __HSS_GRAPHICS_PRIVATE.ctx.fill();
}

/**
 * Draw a picture. 
 * 
 * Should be loaded by LoadImages() in advance
 * 
 * @param picture_data  data loaded by LoadPicture()
 * @param width         width(x) of the picture drawing here. If -1, original size.
 * @param height        height(y) of the picture drawing here. If -1, original size
 */
function DrawImage(picture_data, posX, posY, width, height) {
    __HSS_GRAPHICS_PRIVATE.ctx.drawImage(picture_data, posX, posY, width, height);
}

/**
 * Load picture data. Give this data to DrawPicture().
 * This will wait until the picture is loaded. So you may load this in the first place.
 * 
 * BeCareful: if you want single picture data: (await LoadImages([path]))[0]
 *
 * @param {string[]} pathes      If you want to load "a.png" in B folder, input "/B/a.png". It should be a list
*/
async function LoadImages(pathes) {
    __HSS_GRAPHICS_PRIVATE.images_loaded = new Array(pathes.length);
    __HSS_GRAPHICS_PRIVATE.images_loaded.fill(false);

    //output
    var imgs = new Array(pathes.length);
    
    //load
    for (let i = 0; i < pathes.length; i++) {
        //start loading image
        const img = new Image();
        img.src = pathes[i];
        img.loadingNum = i;

        //report as loaded
        img.onload = function() {
            __HSS_GRAPHICS_PRIVATE.images_loaded[this.loadingNum] = true;
        }

        imgs[i] = img;
    }

    //wait for loading
    await __HSS_GRAPHICS_PRIVATE.WaitForLoaded();

    return imgs;
}

//---------------------Not for using---------------------

/**
 * Not for using
 */
class __HSS_Graphics_Private {
    height = 600;
    width = 800;

    //get canvas
    canvas = document.getElementById(__CANVAS_NAME);

    //using this canvas reference
    ctx = document.getElementById(__CANVAS_NAME).getContext("2d");

    //for waiting for loading
    lib_loaded = [];

    async WaitForLoaded() {
        //busy wait
        while (true) {
            //check if all loaded
            let loaded = true;
            for (let i = 0; i < __HSS_GRAPHICS_PRIVATE.images_loaded.length; i++) {
                if (!__HSS_GRAPHICS_PRIVATE.images_loaded[i]) {
                    loaded = false;
                    break;
                }
            }
    
            if (loaded) {
                break;
            }
    
            //wait for 1ms
            await Sleep(1);
        }
    
        return
    }
}

const __HSS_GRAPHICS_PRIVATE = new __HSS_Graphics_Private();