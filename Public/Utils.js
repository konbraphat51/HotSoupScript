// Helpful functions

/**
 * Start an async function from non async function
 *
 * @param {function} func - The async function to start
 */
function StartAsync(func) {
	new Promise(func).catch((err) => {
		console.error(err)
	})
}

/**
 * Be idle for a certain amount of time
 *
 * @param {number} ms - The amount of time to sleep in milliseconds
 */
async function Sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Import another javascript file
 *
 * @param {string} path path to your javascript file. If Src/a.js, input "/Src/a.js"
 */
function ImportScript(path) {
	//document.write("<script src=\"" + path + "\"></script>")
	const script = document.createElement("script")
	script.src = path
	document.body.appendChild(script)
}

/**
 * Make a shallow copy of an array.
 * If you don't do this, you may unexpectedly change the original array.
 *
 * @param {any[]} ar - The array to copy
 */
function CopyArray(ar) {
	return ar.slice()
}

/**
 * Print to console. Nothing happens to the screen.
 * (Same as console.log)
 *
 * @param {any} anything - The thing to print to console
 */
function Log(anything) {
	console.log(anything)
}

/**
 * Load a file from assets folder
 * 
 * @param {string[]} filenames - The name of the in the assets folder.
 * 							If the file is in Assets/a/b/c.txt, input "a/b/c.txt"
 * @returns {string} The content of the file
 */
async function LoadFiles(filenames) {
	let data = new Array(filenames.length)

	let data_loaded = new Array(filenames.length)
	data_loaded.fill(false)

	//start loading all files
	for (let cnt = 0; cnt < filenames.length; cnt++) {
		let filename = filenames[cnt]

		fetch("Assets/" + filename)
			.then(response => {
				if (!response.ok) {
					throw new Error('Failed to load file');
				}
				return response.text();
			})
			.then(_data => {
				data[cnt] = _data
				data_loaded[cnt] = true
			})
			.catch(error => {
				console.error('FileRedingError: ', error);
			})
	}

	// wait for all images to load
	for (; ;) {
		let all_loaded = true
		data_loaded.forEach((loaded) => {
			if (!loaded) {
				all_loaded = false
			}
		})

		if (all_loaded) {
			break
		}

		await Sleep(1)
	}

	return data
}
