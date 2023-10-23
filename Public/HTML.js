//Functions for HTML control

/**
 * Erace all HTML elements made by this library.
 */
function EraceAllHTML(){
    for(let i = 0; i < __HSS_HTML_PRIVATE.elements_showing.length; i++){
        __HSS_HTML_PRIVATE.elements_showing[i].remove();
    }

    //reset list
    __HSS_HTML_PRIVATE.elements_showing = [];
}

/**
 * Erace the HTML element.
 * 
 * @param {string} id id of the HTML element
 */
function EraceHTML(id) {
    document.getElementById(id).remove();

    //remove from list
    for(let i = 0; i < __HSS_HTML_PRIVATE.elements_showing.length; i++){
        if (__HSS_HTML_PRIVATE.elements_showing[i].id == id){
            __HSS_HTML_PRIVATE.elements_showing.splice(i, 1);
            break;
        }
    }
}

/**
 * Put a Number Input Field in the HTML.
 * Could be useful to control the simulation parameters.
 * 
 * @param id        id of the P tag. The id of the input tag will be "{id}_input"
 * @param label      label written left of the input field
 * @param value inital value
 * @param min   minimal value
 * @param max   maximum value
 * @param step  value interval
 * @param onChanged functionCalled when changed. This will be multi-thread, so not recommended for beginners (Use IsHTMLUpdated() and GetNumberInputField())
 * @returns [id of p tag, id of input tag]
 */
function PutNumberInputField(id, label, value, min=-1e18, max=1e18, step = 1, onChanged = null){
    const input_id = MakeInputID(id);
     
    //document.write("<p id=\""+ id +"\">"+label+": <input type=\"number\" id=\"" + input_id + "\" value=\"" + value + "\" min=\"" + min + "\" max=\"" + max + "\" step=\"" + step + "\" onchange=\""+ onChanged.name +"()\"></p>");
    const p = document.createElement("p");
    p.id = id;
    const input = document.createElement("input");
    input.type = "number";
    input.id = input_id;
    input.value = value;
    input.min = min;
    input.max = max;
    input.step = step;
    if (onchange != null) {
        input.onchange = onChanged;
    }
    p.appendChild(document.createTextNode(label + ": "));
    p.appendChild(input);

    document.body.appendChild(p);

    __HSS_HTML_PRIVATE.RegisterElementShowing(p);

    return [id, input_id];
}

/**
 * Put a Number Input Field of E notation in the HTML.
 * Show as:
 * {label}: {input field mantissa} e {input field: exponent}
 * 
 * @param id    id of the P tag. The id of the input tag will be: mantissa->"{id}_input_m", exponent->"{id}_input_e"
 * @param label label written left of the input field
 * @param value inital value
 * @param onChanged functionCalled when changed (no parameter given to this function) This will be multi-thread, so not recommended for beginners (Use IsHTMLUpdated() and GetNumberInputFieldE())
 * @returns [id of p tag, id of input tag of mantissa, id of input tag of exponent]
 */
function PutNumberInputFieldE(id, label, value, onChanged = null) {
    const input_id_mantissa = MakeMantissaID(id);
    const input_id_exponent = MakeExponentID(id);

    //to E notation
    var exponent = Math.floor(Math.log10(value));
    var mantissa = value / (10**exponent);

    //document.write("<p id=\"" + id + "\">" + label + ": <input type=\"number\" id=\"" + input_id_mantissa + "\" value=\"" + mantissa + "\" onchange=\"" + onChanged.name + "()\"> e <input type=\"number\" id=\"" + input_id_exponent + "\" value=\"" + exponent + "\" onchange=\"" + onChanged.name + "()\" step=\"1\"></p>");
    const p = document.createElement("p");
    p.id = id;
    const input_m = document.createElement("input");
    input_m.type = "number";
    input_m.id = input_id_mantissa;
    input_m.value = mantissa;
    if (onChanged != null) {
        input_m.onchange = onChanged;
    }
    input_m.min = -10;
    input_m.max = 10;
    const input_e = document.createElement("input");
    input_e.type = "number";
    input_e.id = input_id_exponent;
    input_e.value = exponent;
    input_e.onchange = onChanged;
    input_e.min = -18;
    input_e.max = 18;
    input_e.step = 1;
    p.appendChild(document.createTextNode(label + ": "));
    p.appendChild(input_m);
    p.appendChild(document.createTextNode(" e "));
    p.appendChild(input_e);

    document.body.appendChild(p);

    __HSS_HTML_PRIVATE.RegisterElementShowing(p);

    return [id, input_id_mantissa, input_id_exponent]
}

/**
 * Get the value of the input field. Same as the document function.
 * 
 * @param id id of the input tag
 * @return {string} Becareful that the return value is string. If you want number, use GetNumberInputFieldValue().
 */
function GetInputFieldValue(id) {
    return document.getElementById(id).value;
}

/**
 * Get number from the input field.
 * 
 * @param {string} id id of the input tag
 * @param {boolean} fromPutFunc When made by PutNumberInputField(), set true.
 * @returns {number} number read.
 */
function GetNumberInputFieldValue(id, fromPutFunc = false) {
    if (fromPutFunc) {
        id = MakeInputID(id);
    }

    return GetInputFieldValue(id) - 0;
}

/** 
 * Get the value of the input field made by PutNumberInputFieldE().
 *  
 * @param id id of the p tag
 * @returns value calculated from the 2 input fields
 */
function GetNumberInputFieldValueE(id) {
    const id_mantissa = MakeMantissaID(id);
    const id_exponent = MakeExponentID(id);
    return GetNumberInputFieldValue(id_mantissa) * (10 ** GetNumberInputFieldValue(id_exponent));
}

/**
 * Make ID for GetInputFieldValue().
 * This function is made for integration use.
 * 
 * @param {*} id id of the p tag
 * @returns id of the input tag
 */
function MakeInputID(id) {
    return id + "_input";
}

/**
 * Make ID for GetInputFieldValueE().
 * This function is made for integration use.
 * 
 * @param id id of the p tag
 * @returns id of the input tag of mantissa
 */
function MakeMantissaID(id) {
    return id + "_input_m";
}

/**
 * Make ID for GetInputFieldValueE().
 * This function is made for integration use.
 * 
 * @param id id of the p tag
 * @returns id of the input tag of exponent
 */
function MakeExponentID(id) {
    return id + "_input_e";
}

/**
 * Put button invoked when clicked.
 * 
 * @param {string} id            ID of the HTML tag
 * @param {string} label         Label written on the button
 * @param {string} onClicked     Function called when clicked This will be multi-thread, so not recommended for beginners (Use IsHTMLUpdated() and GetHTMLButton())
 */
function PutButton(id, label, onClicked = null){
    //document.write("<button id=\"" + id + "\" onclick=\"" + onClicked.name + "()\">" + label + "</button>");
    const button = document.createElement("button");
    button.id = id;
    if (onClicked != null) {
        button.onclick = onClicked;
    }
    button.appendChild(document.createTextNode(label));
    
    document.body.appendChild(button);

    __HSS_HTML_PRIVATE.RegisterElementShowing(button);
}

/**
 * Prevent default touch events like long-touch-selecting, scroling...
 */
function StopAllTouchDefaults() {
    const canvas = document.getElementById(__CANVAS_NAME);

    canvas.addEventListener("touchstart", function (e) {
        e.preventDefault();
    }, { passive: false });
    canvas.addEventListener("touchmove", function (e) {
        e.preventDefault();
    }, { passive: false });
    canvas.addEventListener("touchend", function (e) {
        e.preventDefault();
    }, { passive: false });
    canvas.addEventListener("touchcancel", function (e) {
        e.preventDefault();
    }, { passive: false });
}

//--------------------Not for users--------------------

/**
 * Not for using.
 */
class __HSS_HTML_Private {
    //elements showed by this library part.
    elements_showing = [];

    RegisterElementShowing(tag){
        this.elements_showing.push(tag);
    }    
}

const __HSS_HTML_PRIVATE = new __HSS_HTML_Private();