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
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Import another javascript file
 * 
 * @param {string} path path to your javascript file. If Src/a.js, input "/Src/a.js"
 */
function ImportScript(path) {
    //document.write("<script src=\"" + path + "\"></script>")
    const script = document.createElement('script')
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