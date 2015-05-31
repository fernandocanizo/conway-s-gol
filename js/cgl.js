// Creation Date: 2015.05.30
// Author: Fernando L. Canizo - http://flc.muriandre.com/

"use strict";

const CELL_SIZE = 20;

var Circle = {
	x: null,
	y: null,
	radius: null,
	color: null,
	borderColor: null,
	borderSize: null,

	draw: function (ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = this.color || "#000";
		ctx.fill();
		ctx.lineWidth = this.borderSize || 1;
		ctx.strokeStyle = this.borderColor || "#000";
		ctx.stroke();
	}
};


///////////////////////////////////////////////////////////////////////////////
// main
///////////////////////////////////////////////////////////////////////////////
var ctx = document.getElementById('canvas').getContext('2d');

ctx.canvas.width  = window.innerWidth - (window.innerWidth % CELL_SIZE);
ctx.canvas.height = window.innerHeight - (window.innerHeight % CELL_SIZE);

// background
ctx.fillStyle = "rgb(150, 150, 150)";
ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

ctx.lineWidth = 1.5;
ctx.strokeStyle = "#000";

for(var x = 0; x <= ctx.canvas.width; x += CELL_SIZE) {
	ctx.beginPath();
	ctx.moveTo(x, 0);
	ctx.lineTo(x, ctx.canvas.height);
	ctx.stroke();
	ctx.closePath();
}

for(var y = 0; y <= ctx.canvas.height; y += CELL_SIZE) {
	// Note: if we would have used a square canvas, then both set of lines could be done in one single loop
	ctx.beginPath();
	ctx.moveTo(0, y);
	ctx.lineTo(ctx.canvas.width, y);
	ctx.stroke();
	ctx.closePath();
}

for(x = 0; x <= ctx.canvas.width; x += CELL_SIZE) {
	for(y = 0; y <= ctx.canvas.height; y += CELL_SIZE) {
		var c = Object.create(Circle);
		c.x = x + CELL_SIZE / 2;
		c.y = y + CELL_SIZE / 2;
		c.radius = CELL_SIZE / 3;
		c.color = "#ff0000";
		c.draw(ctx);
	}
}
