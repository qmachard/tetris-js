"use strict";

class Score {
	constructor(game) {
		this.game = game;

		this.score = 0;

		this.domElement = document.getElementById('score');
		this.domElementTable = document.getElementById('tableScore');
	}

	increment(nb) {
		this.score += nb;
		this.render();
	}

	reset() {
		this.score = 0;
		this.render();
	}

	saveHighScore() {
		if(typeof(Storage) != undefined) {
			var currentHighScore = localStorage.getItem("highScore");

			if(currentHighScore == null || this.score > currentHighScore) {
				localStorage.setItem("highScore", this.score);
			}
		}
	}

	getHighScore() {
		if(typeof(Storage) != undefined) {
			var currentHighScore = localStorage.getItem("highScore");

			if(currentHighScore != null) {
				return currentHighScore;
			} else {
				return 0;
			}
		}
		return null;
	}

	render() {
		this.domElement.innerHTML = this.score;
	}

	renderTable() {
		this.domElementTable.querySelector('.txt-score').innerHTML = this.score;
		this.domElementTable.querySelector('.txt-highscore').innerHTML = this.getHighScore();
	}


}

export default Score;