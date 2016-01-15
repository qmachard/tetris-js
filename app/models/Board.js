"use strict";

class Board {
	constructor() {
		this.domElement = document.getElementById('board');

		this.bricks = [];
	}

	addBricks(element) {
		var bricks = element.form[element.rotation];

		for(var i=0; i<bricks.length; i++) {
			var brick = {
				x: element.position.x + bricks[i].x,
				y: element.position.y + bricks[i].y,
				element: element.bricks[i]
			};
			this.bricks.push(brick);
		}
	}

	canMove(element, move) {
		for(var i=0, brick; brick=element.form[element.rotation][i]; i++) {
			var y = element.position.y + brick.y + move.y;
			var x = element.position.x + brick.x + move.x;

			// Détection du bord inférieur
			if(y > Math.floor(this.domElement.offsetHeight / 20) - 1) {
				return false;
			}

			if(x < 0) {
				return false;
			}

			if(x > Math.floor(this.domElement.offsetWidth / 20) - 1) {
				return false;
			}

			// Detection d'une autre pièce en dessous
			if(this.hasBrick(x, y)) {
				return false;
			}
		}
		return true;
	}

	canRotate(element) {
		var rotation = (element.rotation + 1) % element.form.length;

		for(var i=0, brick; brick=element.form[rotation][i]; i++) {
			var y = element.position.y + brick.y;
			var x = element.position.x + brick.x;

			// Détection du bord inférieur
			if(y > Math.floor(this.domElement.offsetHeight / 20) - 1) {
				return false;
			}

			if(x < 0) {
				return false;
			}

			if(x > Math.floor(this.domElement.offsetWidth / 20) - 1) {
				return false;
			}

			// Detection d'une autre pièce en dessous
			if(this.hasBrick(x, y)) {
				return false;
			}
		}

		return true;
	}

	hasBrick(x, y) {
		for(var i=0, brick; brick = this.bricks[i]; i++) {
			if(brick.x == x && brick.y == y) {
				return true;
			}
		}
		return false;
	}
}
export default Board;