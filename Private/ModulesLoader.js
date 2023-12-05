//Automatically imports all codes of this library to the HTML

const HSSModules = [
	"Settings.js",
	"Graphics.js",
	"Utils.js",
	"Inputs.js",
	"Geometry.js",
	"Math.js",
	"HTML.js",
]
for (let i = 0; i < HSSModules.length; i++) {
	document.write("<script src=\"HotSoupScript/Public/" + HSSModules[i] + "\"></script>")
}
