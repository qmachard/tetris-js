"use strict";

import Element from "../models/Element.js";
import Board from "../models/Board.js";

class Game {
	constructor() {
		this.element = new Element();
		this.board = new Board();

		this.domElement = document.getElementById('game');

		this.frames = null
	}

	init() {
		this.element = new Element();
		this.

		this.element.render();

		this.startInterval();
		this.controls();
	}

	startInterval() {
		var self = this;
		this.frames = setInterval(function() { self.frame(); }, 500);
	}

	stopInterval() {
		clearInterval(this.frames);
	}

	frame() {
		this.element.moveDown();
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
						self.element.moveLeft();
						break;
					case 38: // Haut
						//self.stopInterval();
						self.element.rotate();
						//self.startInterval();
						break;
					case 39: // Droite

						self.element.moveRight();
						break;
					case 40: // Bas
						self.element.moveDown();
						break;
				}
			}
		}, false);
	}
}
export default Game;