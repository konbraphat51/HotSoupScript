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
//dictionary for judge keys pushed
var __keys_pressed = {};

document.addEventListener("keydown", function (e) {
    __keys_pressed[e.key] = true;
});

document.addEventListener("keyup", function (e) {
    __keys_pressed[e.key] = false;
});

var __mouse = false;
document.addEventListener("mousedown", function (e) {
    __mouse = true;
});

document.addEventListener("mouseup", function (e) {
    __mouse = false;
});

var __mouse_x = 0;
var __mouse_y = 0;

document.addEventListener("mousemove", function (e) {
    const canvas = document.getElementById(__CANVAS_NAME);
    const rect = canvas.getBoundingClientRect();

    __mouse_x = e.clientX - rect.left;
    __mouse_y = e.clientY - rect.top;
});