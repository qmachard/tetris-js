"use strict";

class Game {
	constructor() {
		this.board = new Board(20, this);
		this.snake = new Snake(this);
		this.food = new Food(this);
		this.score = new Score(this);
		this.frames = null;

		this.speed = 70;
	}

	init() {
		this.controls();

		var self = this;
		document.getElementById('btnStart').addEventListener('click', function() { self.start(); }, false);

		this.food.changePosition();
		this.food.view.render();
	}

	frame() {
		this.snake.move();
		this.snake.view.render();

		// Détecter les bords du jeu
		if(this.snake.position.x < 0 || this.snake.position.x > this.board.width / this.board.sizeCase - 1 || this.snake.position.y < 0 || this.snake.position.y > this.board.height / this.board.sizeCase - 1) {
			this.gameOver();
		}

		// Manger l'aliment
		if(this.snake.position.x == this.food.position.x && this.snake.position.y == this.food.position.y) {
			this.snake.addElement();

			this.food.changePosition();
			this.food.view.render();

			this.score.increment();
			this.score.view.render();
		}

		// Collisions
		for(var i=1, element; element = this.snake.elements[i]; i++) {
			if (this.snake.position.x == element.position.x && this.snake.position.y == element.position.y) {
				this.gameOver();
			}
		}
	}

	start() {
		this.snake.reset();

		this.food.changePosition();
		this.food.view.render();

		this.score.reset();
		this.score.view.render();

		document.getElementById('splash').style.display = 'none';

		var self = this;
		if(this.frames == null) {
			this.frames = setInterval(function() { self.frame() }, this.speed);
		}
	}

	gameOver() {
		clearInterval(this.frames);
		this.frames = null;

		this.score.saveHighScore();
		this.score.view.renderTable();

		document.getElementById('splash').style.display = 'table';
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
						self.snake.moveLeft();
						break;
					case 38: // Haut
						self.snake.moveUp();
						break;
					case 39: // Droite
						self.snake.moveRight();
						break;
					case 40: // Bas
						self.snake.moveDown();
						break;
				}
			}
		}, false);
	}
}
export default Game;