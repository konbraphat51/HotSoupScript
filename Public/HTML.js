//Functions for HTML control

/**
 * Put a Number Input Field in the HTML.
 * Could be useful to control the simulation parameters.
 * 
 * @param id        id of the P tag. The id of the input tag will be "{id}_input"
 * @param label      label written left of the input field
 * @param onChanged functionCalled when changed (no parameter given to this function)
 * @param value inital value
 * @param min   minimal value
 * @param max   maximum value
 * @param step  value interval
 * @returns [id of p tag, id of input tag]
 */
function PutNumberInputField(id, label, onChanged, value, min=-1e18, max=1e18, step = 1){
    const input_id = MakeInputID(id);
    document.write("<p id=\""+ id +"\">"+label+": <input type=\"number\" id=\"" + input_id + "\" value=\"" + value + "\" min=\"" + min + "\" max=\"" + max + "\" step=\"" + step + "\" onchange=\""+ onChanged.name +"()\"></p>");

    return [id, input_id]
}

/**
 * Put a Number Input Field of E notation in the HTML.
 * Show as:
 * {label}: {input field mantissa} e {input field: exponent}
 * 
 * @param id    id of the P tag. The id of the input tag will be: mantissa->"{id}_input_m", exponent->"{id}_input_e"
 * @param label label written left of the input field
 * @param onChanged functionCalled when changed (no parameter given to this function)
 * @param value inital value
 * @returns [id of p tag, id of input tag of mantissa, id of input tag of exponent]
 */
function PutNumberInputFieldE(id, label, onChanged, value) {
    const input_id_mantissa = MakeMantissaID(id);
    const input_id_exponent = MakeExponentID(id);

    //to E notation
    var exponent = Math.floor(Math.log10(value));
    var mantissa = value / (10**exponent);

    document.write("<p id=\"" + id + "\">" + label + ": <input type=\"number\" id=\"" + input_id_mantissa + "\" value=\"" + mantissa + "\" onchange=\"" + onChanged.name + "()\"> e <input type=\"number\" id=\"" + input_id_exponent + "\" value=\"" + exponent + "\" onchange=\"" + onChanged.name + "()\" step=\"1\"></p>");

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