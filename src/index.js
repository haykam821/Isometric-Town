require("file-loader?name=[name].[ext]!html-minify-loader!./index.html");
require("file-loader?name=[name].[ext]!./index.css");

const can = document.getElementById("can");
const ctx = can.getContext("2d");

can.width = window.innerWidth;
can.height = window.innerHeight;

const map = `
0000000000000
0111111100050
0134343105000
0134343100050
0111111105000
0000000000050
0000000005000
0000000000050
0000000000000
`.trim().split("\n").map(row => row.split("").reverse());

const colorMap = [
	"green",
	"#654321",
	"lightgray",
	"goldenrod",
	"darkgoldenrod",
	"darkgreen",
];

/**
 * Renders an individual isometric tile.
 * @param {number} x The X position of the isometric tile.
 * @param {number} y The Y position of the isometric tile.
 * @param {number} width The width of the isometric tile.
 * @param {number} height The height of the isometric tile.
 * @param {string} color The color of the isometric tile.
 */
function drawIsoTile(x, y, width, height, color = "black") {
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(x, y);

	ctx.lineTo(x - width / 2, y + height / 2);
	ctx.lineTo(x, y + height);
	ctx.lineTo(x + width / 2, y + height / 2);
	ctx.closePath();

	ctx.fillStyle = color;
	ctx.fill();
	ctx.strokeStyle = color;
	ctx.stroke();
	ctx.restore();
}

const height = 20;
const width = height * 2;

let dragX = can.width / -2;
let dragY = can.height / -2;

window.addEventListener("mousemove", event => {
	if (event.buttons === 1) {
		dragX -= event.movementX;
		dragY -= event.movementY;
	}
});

/**
 * Renders the isometric map.
 */
function render() {
	ctx.fillStyle = "forestgreen";
	ctx.fillRect(0, 0, can.width, can.height);

	ctx.save();
	ctx.translate(-dragX, -dragY);
	map.forEach((row, y) => {
		row.forEach((tile, x) => {
			drawIsoTile((y - x) * height, (y + x) * width / 4, width, height, colorMap[tile]);
		});
	});
	ctx.restore();

	requestAnimationFrame(render);
}
render();
