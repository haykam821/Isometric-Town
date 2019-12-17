module.exports = {
	entry: "./index.js",
	mode: process.env.WEBPACK_MODE || "production",
	output: {
		filename: "index.js",
		path: __dirname + "/dist",
	},
};