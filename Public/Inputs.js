// For keyboard / mouse / touch input

/**
 * Returns if key is currently pressed or not.
 *  
 * @param {int} keyCode Get from here: https://www.toptal.com/developers/keycode
 * @returns {boolean} Whether the key is pressed.
 */
function GetKey(keyCode) {
    if (keyCode in __keys_pressed){
        __keys_pressed[keyCode];
    }else{
        //not ever pushed before
        return false;
    }
}

/**
 * Returns if mouse is currently pressed or not.
 *  
 * @returns {boolean} Whether the mouse is pressed.
 */
function GetMouse() {
    return __mouse;
}

/**
 * Returns mouse position in canvas.
 */
function GetMouseX() {
    return __mouse_x;
}

/**
 * Returns mouse position in canvas.
*/
function GetMouseY() {
    return __mouse_y;
}

//---------------------Not for using---------------------
/**
 * dictionary for judge keys pushed
 */
var __keys_pressed = {};

/**
 * if mouse/touch is currently pressed or not
 */
var __mouse = false;

/**
 * Where the mouse is in canvas
 */
var __mouse_x = 0;

/**
 * Where the mouse is in canvas
 */
var __mouse_y = 0;

function __PrepareInput() {
    const canvas = document.getElementById(__CANVAS_NAME);

    canvas.addEventListener("keydown", function (e) {
        __keys_pressed[e.key] = true;
    });
    
    canvas.addEventListener("keyup", function (e) {
        __keys_pressed[e.key] = false;
    });
    
    //for mouse
    canvas.addEventListener("mousedown", function (e) {
        __mouse = true;
        __GetMousePosition(e);
    });
    
    canvas.addEventListener("mouseup", function (e) {
        __mouse = false;
    });
    
    canvas.addEventListener("mousemove", function (e) {
        __GetMousePosition(e);
    });

    //for touch
    canvas.addEventListener("touchstart", function (e) {
        __mouse = true;
        __GetMousePosition(e.touches[0]);
    });

    canvas.addEventListener("touchend", function (e) {
        __mouse = false;
    });

    canvas.addEventListener("touchmove", function (e) {
        __GetMousePosition(e.touches[0]);
    });
}

function __GetMousePosition(e) {
    //must be in-canvas event
    __mouse_x = e.clientX;
    __mouse_y = e.clientY;
}

__PrepareInput();