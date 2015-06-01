// Creation Date: 2015.05.30
// Author: Fernando L. Canizo - http://flc.muriandre.com/

"use strict";

const CELL_SIZE = 50;

// don't need to draw points on this app, so let's do a pure hash
var Point = Object.create(null, {
	x: { writable: true, value: null },
	y: { writable: true, value: null }
});


var Circle = {
	center: Object.create(Point),
	radius: null,
	color: null,
	borderColor: null,
	borderSize: null,

	draw: function (ctx) {
		ctx.beginPath();
		ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = this.color || "#000";
		ctx.fill();
		ctx.lineWidth = this.borderSize || 1;
		ctx.strokeStyle = this.borderColor || "#000";
		ctx.stroke();
	}
};


var Grid = {
	backgroundColor: null,
	lineWidth: null,
	lineColor: null,
	cells: null,

	drawBackground: function (ctx) {
		ctx.fillStyle = this.backgroundColor || "#ccc";
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	},

	drawGrid: function (ctx) {
		ctx.lineWidth = this.lineWidth || 0.5;
		ctx.strokeStyle = this.lineColor || "#000";

		for(var x = 0; x <= ctx.canvas.width; x += CELL_SIZE) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, ctx.canvas.height);
			ctx.stroke();
			ctx.closePath();

			// by doing the loops this way I can collect centers to fill the cell property
			// init cells if empty
			if(null === this.cells) {
				this.cells = [[]];
			} else {
				// add a new empty row
				this.cells.push([]);
			}

			if(0 === this.cells.length) {
				// add the first row
				this.cells.push([]);
			}

			for(var y = 0; y <= ctx.canvas.height; y += CELL_SIZE) {
				// Note: if we would have used a square canvas, then both set of lines could be done in one single loop
				ctx.beginPath();
				ctx.moveTo(0, y);
				ctx.lineTo(ctx.canvas.width, y);
				ctx.stroke();
				ctx.closePath();

				// collect cells centers
				// x and y are related to the canvas here
				// then divide by CELL_SIZE to make it a consecutive array index
				var xArrayIndex = x / CELL_SIZE;
				var yArrayIndex = y / CELL_SIZE;
				this.cells[xArrayIndex].push(Object.create(Point));
				this.cells[xArrayIndex][yArrayIndex].x = x + CELL_SIZE / 2;
				this.cells[xArrayIndex][yArrayIndex].y = y + CELL_SIZE / 2;

				// alse set their alive status
				if(Math.random() > 0.5) {
					this.cells[xArrayIndex][yArrayIndex].isAlive = true;
				} else {
					this.cells[xArrayIndex][yArrayIndex].isAlive = false;
				}
			}
		}
	},

	drawCells: function (ctx) {
		this.cells.forEach(function (x) {
			x.forEach(function (y) {
				if(y.isAlive) {
					y.cell = Object.create(Circle);
					y.cell.center.x = y.x;
					y.cell.center.y = y.y;
					y.cell.radius = CELL_SIZE / 3;
					y.cell.color = "#ff0000";
					y.cell.draw(ctx);
				}
			});
		});
	},

	draw: function (ctx) {
		this.drawBackground(ctx);
		this.drawGrid(ctx);
		this.drawCells(ctx);
	},

	resetCells: function () {
		// re-initializes board. It needs to be already drawn
		if(null === this.cells) {
			throw Error("Cannot initialize cells if the grid hasn't been drawn.");
		}

		this.cells.forEach(function (x) {
			x.forEach(function (y) {
				if(Math.random() > 0.5) {
					y.isAlive = true;
				} else {
					y.isAlive = false;
				}
			});
		});
	},

	getNeighbors: function (xInArray, yInArray, xArrayLength, yArrayLength) {
		var neighbors = [];
		var xMinusOne = xInArray - 1;
		var yMinusOne = yInArray - 1;
		var xPlusOne = xInArray + 1;
		var yPlusOne = yInArray + 1;
		var lastX = xArrayLength - 1;
		var lastY = yArrayLength - 1;
		var aux;

		// NW
		aux = Object.create(Point);
		aux.x = (-1 === (xMinusOne))? lastX : xMinusOne;
		aux.y = (-1 === (yMinusOne))? lastY : yMinusOne;
		neighbors.push(aux);

		// N
		aux = Object.create(Point);
		aux.x = xInArray;
		aux.y = (-1 === (yMinusOne))? lastY : yMinusOne;
		neighbors.push(aux);

		// NE
		aux = Object.create(Point);
		aux.x = ((xPlusOne) > (lastX))? 0 : xPlusOne;
		aux.y = (-1 === (yMinusOne))? lastY : yMinusOne;
		neighbors.push(aux);

		// W
		aux = Object.create(Point);
		aux.x = (-1 === (xMinusOne))? lastX : xMinusOne;
		aux.y = yInArray;
		neighbors.push(aux);

		// E
		aux = Object.create(Point);
		aux.x = ((xPlusOne) > (lastX))? 0 : xPlusOne;
		aux.y = yInArray;
		neighbors.push(aux);

		// SW
		aux = Object.create(Point);
		aux.x = (-1 === (xMinusOne))? lastX : xMinusOne;
		aux.y = ((yPlusOne) > (lastY))? 0 : yPlusOne;
		neighbors.push(aux);

		// S
		aux = Object.create(Point);
		aux.x = xInArray;
		aux.y = ((yPlusOne) > (lastY))? 0 : yPlusOne;
		neighbors.push(aux);

		// SE
		aux = Object.create(Point);
		aux.x = ((xPlusOne) > (lastX))? 0 : xPlusOne;
		aux.y = ((yPlusOne) > (lastY))? 0 : yPlusOne;
		neighbors.push(aux);

		return neighbors;
	}
};


////////////////////////////////////////////////////////////////////////////////////////////////////
// main
////////////////////////////////////////////////////////////////////////////////////////////////////
var ctx = document.getElementById('canvas').getContext('2d');

ctx.canvas.width  = window.innerWidth - (window.innerWidth % CELL_SIZE);
ctx.canvas.height = window.innerHeight - (window.innerHeight % CELL_SIZE);

var grid = Object.create(Grid);
grid.draw(ctx);
