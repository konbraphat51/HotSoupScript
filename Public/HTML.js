//Functions for HTML control

/**
 * Erace all HTML elements made by this library.
 */
function EraceAllHTML() {
	for (let i = 0; i < __HSS_HTML_PRIVATE.elements_showing.length; i++) {
		__HSS_HTML_PRIVATE.elements_showing[i].remove()
	}

	//reset list
	__HSS_HTML_PRIVATE.elements_showing = []
}

/**
 * Erace the HTML element.
 *
 * @param {string} id id of the HTML element
 */
function EraceHTML(id) {
	document.getElementById(id).remove()

	//remove from list
	for (let i = 0; i < __HSS_HTML_PRIVATE.elements_showing.length; i++) {
		if (__HSS_HTML_PRIVATE.elements_showing[i].id == id) {
			__HSS_HTML_PRIVATE.elements_showing.splice(i, 1)
			break
		}
	}
}

/**
 * Put a Number Input Field in the HTML.
 * Could be useful to control the simulation parameters.
 *
 * @param {string} id        id of the P tag. The id of the input tag will be "{id}_input"
 * @param {string} label      label written left of the input field
 * @param {number} value inital value
 * @param {number} min   minimal value
 * @param {number} max   maximum value
 * @param {number} step  value interval
 * @param {function} onChanged functionCalled when changed. This will be multi-thread, so not recommended for beginners (Use IsHTMLUpdated() and GetNumberInputField())
 * @returns {string[]} [id of p tag, id of input tag]
 */
function PutNumberInputField(
	id,
	label,
	value,
	min = -1e18,
	max = 1e18,
	step = 1,
	onChanged = null,
) {
	const input_id = MakeInputID(id)

	//document.write("<p id=\""+ id +"\">"+label+": <input type=\"number\" id=\"" + input_id + "\" value=\"" + value + "\" min=\"" + min + "\" max=\"" + max + "\" step=\"" + step + "\" onchange=\""+ onChanged.name +"()\"></p>")
	const p = document.createElement("p")
	p.id = id
	const input = document.createElement("input")
	input.type = "number"
	input.id = input_id
	input.value = value
	input.min = min
	input.max = max
	input.step = step
	if (onChanged != null) {
		input.addEventListener("change", onChanged)
	}
	p.appendChild(document.createTextNode(label + ": "))
	p.appendChild(input)

	document.body.appendChild(p)

	__HSS_HTML_PRIVATE.RegisterElementShowing(p)

	return [id, input_id]
}

/**
 * Put a Number Input Field of E notation in the HTML.
 * Show as:
 * {label}: {input field mantissa} e {input field: exponent}
 *
 * @param {string} id    id of the P tag. The id of the input tag will be: mantissa->"{id}_input_m", exponent->"{id}_input_e"
 * @param {string} label label written left of the input field
 * @param {number} value inital value
 * @param {function} onChanged functionCalled when changed (no parameter given to this function) This will be multi-thread, so not recommended for beginners (Use IsHTMLUpdated() and GetNumberInputFieldE())
 * @returns {string[]} [id of p tag, id of input tag of mantissa, id of input tag of exponent]
 */
function PutNumberInputFieldE(id, label, value, onChanged = null) {
	const input_id_mantissa = MakeMantissaID(id)
	const input_id_exponent = MakeExponentID(id)

	//to E notation
	let exponent = Math.floor(Math.log10(value))
	let mantissa = value / 10 ** exponent

	//document.write("<p id=\"" + id + "\">" + label + ": <input type=\"number\" id=\"" + input_id_mantissa + "\" value=\"" + mantissa + "\" onchange=\"" + onChanged.name + "()\"> e <input type=\"number\" id=\"" + input_id_exponent + "\" value=\"" + exponent + "\" onchange=\"" + onChanged.name + "()\" step=\"1\"></p>")
	const p = document.createElement("p")
	p.id = id
	const input_m = document.createElement("input")
	input_m.type = "number"
	input_m.id = input_id_mantissa
	input_m.value = mantissa
	if (onChanged != null) {
		input_m.addEventListener("change", onChanged)
	}
	input_m.min = -10
	input_m.max = 10
	const input_e = document.createElement("input")
	input_e.type = "number"
	input_e.id = input_id_exponent
	input_e.value = exponent
	if (onChanged != null) {
		input_e.addEventListener("change", onChanged)
	}
	input_e.min = -18
	input_e.max = 18
	input_e.step = 1
	p.appendChild(document.createTextNode(label + ": "))
	p.appendChild(input_m)
	p.appendChild(document.createTextNode(" e "))
	p.appendChild(input_e)

	document.body.appendChild(p)

	__HSS_HTML_PRIVATE.RegisterElementShowing(p)

	return [id, input_id_mantissa, input_id_exponent]
}

/**
 * Put a checkbox in the HTML.
 * 
 * Get this value by GetCheckBoxValue().
 * 
 * @param {string} id id of the P tag. The id of the input tag will be "{id}_input"
 * @param {string} label shown left of the checkbox
 * @param {boolean} value initial value
 * @param {function} onChanged function called when changed (no parameter given to this function)
 * @returns 
 */
function PutCheckBox(id, label, value, onChanged = null) {
	let inputfieldID = MakeInputID(id)

	const p = document.createElement("p")
	p.id = id
	const input = document.createElement("input")
	input.type = "checkbox"
	input.id = inputfieldID
	input.checked = value
	if (onChanged != null) {
		input.addEventListener("change", onChanged)
	}
	p.appendChild(document.createTextNode(label + ": "))
	p.appendChild(input)

	document.body.appendChild(p)

	__HSS_HTML_PRIVATE.RegisterElementShowing(p)

	return [id, inputfieldID]
}

/**
 * Get the value of the input field. Same as the document function.
 *
 * @param {string} id id of the input tag
 * @return {string} Becareful that the return value is string. If you want number, use GetNumberInputFieldValue().
 */
function GetInputFieldValue(id) {
	return document.getElementById(id).value
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
		id = MakeInputID(id)
	}

	return GetInputFieldValue(id) - 0
}

/**
 * Get the value of the input field made by PutNumberInputFieldE().
 *
 * @param {string} id id of the p tag
 * @returns {number} value calculated from the 2 input fields
 */
function GetNumberInputFieldValueE(id) {
	const id_mantissa = MakeMantissaID(id)
	const id_exponent = MakeExponentID(id)
	return (
		GetNumberInputFieldValue(id_mantissa) *
		10 ** GetNumberInputFieldValue(id_exponent)
	)
}

/**
 * Get the value of the checkbox.
 * 
 * @param {string} id id of the checkbox input tag 
 * @param {boolean} fromPutFunc When made by PutCheckBox(), set true.
 * @returns {boolean} value of the checkbox
 */
function GetCheckBoxValue(id, fromPutFunc = false) {
	if (fromPutFunc) {
		id = MakeInputID(id)
	}

	return document.getElementById(id).checked
}

/**
 * Make ID for GetInputFieldValue().
 * This function is made for integration use.
 *
 * @param {string} id id of the p tag
 * @returns {string} id of the input tag
 */
function MakeInputID(id) {
	return id + "_input"
}

/**
 * Make ID for GetInputFieldValueE().
 * This function is made for integration use.
 *
 * @param {string} id id of the p tag
 * @returns {string} id of the input tag of mantissa
 */
function MakeMantissaID(id) {
	return id + "_input_m"
}

/**
 * Make ID for GetInputFieldValueE().
 * This function is made for integration use.
 *
 * @param {string} id id of the p tag
 * @returns {string} id of the input tag of exponent
 */
function MakeExponentID(id) {
	return id + "_input_e"
}

/**
 * Put button invoked when clicked.
 *
 * @param {string} id            ID of the HTML tag
 * @param {string} label         Label written on the button
 * @param {function} onClicked     Function called when clicked This will be multi-thread, so not recommended for beginners (Use IsHTMLUpdated() and GetHTMLButton())
 */
function PutButton(id, label, onClicked = null) {
	//document.write("<button id=\"" + id + "\" onclick=\"" + onClicked.name + "()\">" + label + "</button>")
	const button = document.createElement("button")
	button.id = id
	if (onClicked != null) {
		button.addEventListener("click", onClicked)
	}
	button.addEventListener(
		"click",
		__HSS_HTML_PRIVATE.StartListeningButton(button),
	)
	button.appendChild(document.createTextNode(label))

	document.body.appendChild(button)

	__HSS_HTML_PRIVATE.RegisterElementShowing(button)
}

/**
 * Prevent default touch events like long-touch-selecting, scroling...
 */
function StopAllTouchDefaults() {
	const canvas = document.getElementById(__CANVAS_NAME)

	canvas.addEventListener(
		"touchstart",
		function (e) {
			e.preventDefault()
		},
		{ passive: false },
	)
	canvas.addEventListener(
		"touchmove",
		function (e) {
			e.preventDefault()
		},
		{ passive: false },
	)
	canvas.addEventListener(
		"touchend",
		function (e) {
			e.preventDefault()
		},
		{ passive: false },
	)
	canvas.addEventListener(
		"touchcancel",
		function (e) {
			e.preventDefault()
		},
		{ passive: false },
	)
}

/**
 * Get IDs of updated HTML elements.
 *
 * @param {boolean} should_reset_list if true, reset the list after return.
 * @returns {string[]} IDs of updated HTML elements
 */
function GetUpdatedHTMLs(should_reset_list = true) {
	const updated = CopyArray(__HSS_HTML_PRIVATE.updated_inputs)
	if (should_reset_list) {
		__HSS_HTML_PRIVATE.updated_inputs = []
	}

	return updated
}

/**
 * Check if the given HTML element is updated by user input.
 *
 * @param {string} id id of the HTML element to check
 * @param {boolean} should_remove If true, the element will be removed from the list after this.
 * @returns {boolean} Wheather the element is updated by user input.
 */
function IsHTMLUpdated(id, should_remove = true) {
	const updated = __HSS_HTML_PRIVATE.updated_inputs.includes(id)
	if (updated && should_remove) {
		__HSS_HTML_PRIVATE.updated_inputs.splice(
			__HSS_HTML_PRIVATE.updated_inputs.indexOf(id),
			1,
		)
	}

	return updated
}

/**
 * Remove the HTML element from the list of updated HTML elements.
 *
 * @param {string} id   id of the HTML element to remove
 */
function RemoveHTMLUpdateList(id) {
	if (__HSS_HTML_PRIVATE.updated_inputs.includes(id)) {
		__HSS_HTML_PRIVATE.updated_inputs.splice(
			__HSS_HTML_PRIVATE.updated_inputs.indexOf(id),
			1,
		)
	}
}

/**
 * Start listening to the button, enables to get the status by isHTMLUpdated().
 *
 * @param {string} id   HTML id of the button
 */
function StartListenButton(id) {
	const button = document.getElementById(id)
	button.addEventListener(
		"click",
		__HSS_HTML_PRIVATE.StartListeningButton(button),
	)
}

//--------------------Not for users--------------------

/**
 * Not for using.
 */
class __HSS_HTML_Private {
	//elements showed by this library part.
	elements_showing = []

	//IDs of html tag updated by user input
	updated_inputs = []

	RegisterElementShowing(tag) {
		this.elements_showing.push(tag)
	}

	StartListeningChange() {
		//listen to input
		document.addEventListener("change", function (e) {
			__HSS_HTML_PRIVATE._OnUpdated(e.target.id)
		})
	}

	StartListeningButton(element) {
		element.addEventListener("click", function (e) {
			__HSS_HTML_PRIVATE._OnUpdated(e.target.id)
		})
	}

	_OnUpdated(id) {
		//prevent duplication
		if (__HSS_HTML_PRIVATE.updated_inputs.includes(id)) {
			return
		}

		__HSS_HTML_PRIVATE.updated_inputs.push(id)
	}
}

const __HSS_HTML_PRIVATE = new __HSS_HTML_Private()

__HSS_HTML_PRIVATE.StartListeningChange()
