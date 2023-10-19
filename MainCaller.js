//run async main()

if (typeof(main) === "function") {
    new Promise(main).catch((err) => {
        console.error(err);
    });
}