// For keyboard / mouse / touch input

/**
 * Returns if key is currently pressed or not.
 *  
 * @param {int} keyCode Get from here: https://www.toptal.com/developers/keycode
 * @returns {boolean} Whether the key is pressed.
 */
function GetKey(keyCode) {
    if (keyCode in __HSS_Input_PRIVATE.keys_pressed){
        __HSS_Input_PRIVATE.keys_pressed[keyCode];
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
    return __HSS_Input_PRIVATE.mouse;
}

/**
 * Returns mouse position in canvas.
 */
function GetMouseX() {
    return __HSS_Input_PRIVATE.mouse_x;
}

/**
 * Returns mouse position in canvas.
*/
function GetMouseY() {
    return __HSS_Input_PRIVATE.mouse_y;
}

//---------------------Not for using---------------------

/**
 * Not for use
 */
class __HSS_Input_Private {
    /**
     * dictionary for judge keys pushed
     */
    keys_pressed = {};

    /**
     * if mouse/touch is currently pressed or not
     */
    mouse = false;

    /**
     * Where the mouse is in canvas
     */
    mouse_x = 0;

    /**
     * Where the mouse is in canvas
     */
    mouse_y = 0;

    PrepareInput() {
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

    GetMousePosition(e) {
        //must be in-canvas event
        __mouse_x = e.clientX;
        __mouse_y = e.clientY;
    }
}

const __HSS_Input_PRIVATE = new __HSS_Input_Private();

__HSS_Input_PRIVATE.PrepareInput();