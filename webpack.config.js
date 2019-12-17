const { resolve } = require("path");

module.exports = {
	entry: "./src/index.js",
	mode: process.env.WEBPACK_MODE || "production",
	output: {
		filename: "index.js",
		path: resolve(__dirname, "./dist"),
	},
};