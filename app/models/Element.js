/**
 * Created by quentinmachard on 15/01/2016.
 */
class Element {
	constructor() {
		this.bricks = [];
		this.form = null;

		this.position = {x:5, y:-1};

		this.rotation = 0;

		this.forms = [
			/*
			[ ][ ]
			[ ][ ]
			 */
			[
				[ {x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1} ]
			],

			/*
			 [ ][x][ ]
			    [ ]
			 */
			[
				[ {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2} ],
				[ {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2} ],
				[ {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 0} ],
				[ {x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}, {x: 1, y: 2} ]
			],

			/*
			 [ ][x]
			    [ ][ ]
			 */
			[
				[ {x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 2} ],
				[ {x: 2, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2} ]
			],

			/*
			    [x][ ]
			 [ ][ ]
			 */
			[
				[ {x: 1, y: 1}, {x: 2, y: 1}, {x: 0, y: 2}, {x: 1, y: 2} ],
				[ {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 2, y: 2} ]
			],

			/*
			 [ ][x][ ]
			 [ ]
			 */
			[
				[ {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 0, y: 2} ],
				[ {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 2} ],
				[ {x: 2, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}, {x: 2, y: 1} ],
				[ {x: 0, y: 0}, {x: 1, y: 1}, {x: 1, y: 0}, {x: 1, y: 2} ]
			],

			/*
			 [ ][x][ ]
			       [ ]
			 */
			[
				[ {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 2, y: 2} ],
				[ {x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 2}, {x: 1, y: 2} ],
				[ {x: 0, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}, {x: 2, y: 1} ],
				[ {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 0} ]
			],

			/*
			 [ ][x][ ][ ]
			 */
			[
				[ {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3} ],
				[ {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1} ]
			]
		];

		this.init();
	}

	init() {
		for (var i=0; i<4; i++) {
			var square = document.createElement('span');
			square.className = 'element';
			document.getElementById('elements').appendChild(square);
			this.bricks.push(square);
		}

		//this.form = this.forms[Math.floor(Math.random() * (this.forms.length))];
		this.form = this.forms[6];
	}

	rotate() {
		this.rotation = ++this.rotation % this.form.length;
	}

	moveDown() {
		this.position.y++;
	}

	moveLeft() {
		this.position.x--;
	}

	moveRight() {
		this.position.x++;
	}

	render() {
		for(var i=0; i<4; i++) {
			this.bricks[i].style.left = (this.position.x + this.form[this.rotation][i].x) * 20 + 'px';
			this.bricks[i].style.top = (this.position.y + this.form[this.rotation][i].y) * 20 + 'px';
		}
	}
}
export default Element;