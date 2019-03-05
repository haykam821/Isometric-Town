const can = document.getElementById("can");
const ctx = can.getContext("2d");

can.width = window.innerWidth;
can.height = window.innerHeight;

const map = [
	[0, 0, 0, 0],
	[0, 1, 1, 1],
	[0, 0, 2, 0],
	[0, 0, 2, 0],
	[0, 0, 2, 0],
	[0, 0, 2, 0],
].map(row => row.reverse());

const colorMap = [
	"green",
	"lightgray",
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
	ctx.strokeStyle = color;
	ctx.stroke();
	ctx.restore();
}

const height = 20;
const width = height * 2;

let dragX = 0;
let dragY = 0;

window.addEventListener("mousemove", event => {
	if (event.buttons === 1) {
  	dragX -= event.movementX;
  	dragY -= event.movementY;
  }
})

function render() {
	ctx.clearRect(0, 0, can.width, can.height);

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
