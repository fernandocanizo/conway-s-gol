// Creation Date: 2015.05.30
// Author: Fernando L. Canizo - http://flc.muriandre.com/

"use strict";

const CELL_SIZE = 20;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

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
		var centerX = x + CELL_SIZE / 2;
		var centerY = y + CELL_SIZE / 2;
		var radius = CELL_SIZE / 3;

		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'green';
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#000';
		ctx.stroke();
	}
}
