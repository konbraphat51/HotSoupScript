// Helpful functions

/**
 * Start an async function from non async function
 */
function StartAsync(func) {
    new Promise(func).catch((err) => {
        console.error(err);
    });
}

/**
 * Be idle for a certain amount of time
 * @param {number} ms - The amount of time to sleep in milliseconds
 */
async function Sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}