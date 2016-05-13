"use strict";

import Element from "../models/Element.js";
import Board from "../models/Board.js";
import Score from "../models/Score.js";

class Game {
	constructor() {
		this.element = new Element();
		this.board = new Board();
		this.score = new Score();

		this.domElement = document.getElementById('game');

		this.frames = null
	}

	init() {
		this.element = new Element();

		var self = this;
		this.frames = setInterval(function() { self.frame(); }, 1000);

		this.controls();
	}

	frame() {
		if(this.board.canMove(this.element, { x: 0, y: 1 })) {
			this.element.moveDown()
		} else {
			this.element.render();
			this.board.addBricks(this.element);

			var lines = this.board.removeLines();
			if(lines > 0) {
				this.score.increment(lines);
			}

			this.element = new Element();
		}


		this.element.render();
	}

	controls() {
		var self = this;
		document.addEventListener('keydown', function(e) {
			if(e.keyCode >= 32 && e.keyCode <= 40) {
				e.preventDefault();

				switch(e.keyCode) {
					case 32:
						self.start();
						break;
					case 37: // Gauche
						if(self.board.canMove(self.element, { x: -1, y: 0 })) {
							self.element.moveLeft();
							self.element.render();
						}
						break;
					case 38: // Haut
						if(self.board.canRotate(self.element)) {
							self.element.rotate();
							self.element.render();
						}

						break;
					case 39: // Droite
						if(self.board.canMove(self.element, { x: 1, y: 0 })) {
							self.element.moveRight();
							self.element.render();
						}
						break;
					case 40: // Bas
						if(self.board.canMove(self.element, { x: 0, y: 1 })) {
							self.element.moveDown();
							self.element.render();
						}
						break;
				}
			}
		}, false);
	}
}
export default Game;