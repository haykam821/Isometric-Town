const can = document.getElementById("can");
const ctx = can.getContext("2d");

const map = [
	[0, 0, 0, 0],
	[0, 1, 1, 1],
	[0, 0, 2, 0],
	[0, 0, 2, 0],
	[0, 0, 2, 0],
	[0, 0, 2, 0],
];

const colorMap = [
	"green",
	"white",
	"brown",
];

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
	ctx.restore();
}

const width = 52;
const height = 25;

map.forEach((row, y) => {
	row.forEach((tile, x) => {
		drawIsoTile((y - x) * height, (y + x) * width / 2, width, height, colorMap[tile]);
	});
});
