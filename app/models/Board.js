"use strict";

class Board {
	constructor() {
		this.domElement = document.getElementyId('board');

		this.elements = [];
	}

	addElement(element) {
		this.elements.push(element);
	}

	isPossible(element) {
		console.log(element);
	}
}
export default Board;