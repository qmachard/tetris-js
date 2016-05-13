/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Volumes/Donnees/Projets/Experiments/Tetris/public";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Game = __webpack_require__(1);
	
	var _Game2 = _interopRequireDefault(_Game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var game = new _Game2.default(); /**
	                                  * Created by quentinmachard on 14/01/2016.
	                                  */
	
	game.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _Element = __webpack_require__(2);
	
	var _Element2 = _interopRequireDefault(_Element);
	
	var _Board = __webpack_require__(3);
	
	var _Board2 = _interopRequireDefault(_Board);
	
	var _Score = __webpack_require__(4);
	
	var _Score2 = _interopRequireDefault(_Score);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
		function Game() {
			_classCallCheck(this, Game);
	
			this.element = new _Element2.default();
			this.board = new _Board2.default();
			this.score = new _Score2.default();
	
			this.domElement = document.getElementById('game');
	
			this.frames = null;
		}
	
		_createClass(Game, [{
			key: "init",
			value: function init() {
				this.element = new _Element2.default();
	
				var self = this;
				this.frames = setInterval(function () {
					self.frame();
				}, 1000);
	
				this.controls();
			}
		}, {
			key: "frame",
			value: function frame() {
				if (this.board.canMove(this.element, { x: 0, y: 1 })) {
					this.element.moveDown();
				} else {
					this.element.render();
					this.board.addBricks(this.element);
	
					var lines = this.board.removeLines();
					if (lines > 0) {
						this.score.increment(lines);
					}
	
					this.element = new _Element2.default();
				}
	
				this.element.render();
			}
		}, {
			key: "controls",
			value: function controls() {
				var self = this;
				document.addEventListener('keydown', function (e) {
					if (e.keyCode >= 32 && e.keyCode <= 40) {
						e.preventDefault();
	
						switch (e.keyCode) {
							case 32:
								self.start();
								break;
							case 37:
								// Gauche
								if (self.board.canMove(self.element, { x: -1, y: 0 })) {
									self.element.moveLeft();
									self.element.render();
								}
								break;
							case 38:
								// Haut
								if (self.board.canRotate(self.element)) {
									self.element.rotate();
									self.element.render();
								}
	
								break;
							case 39:
								// Droite
								if (self.board.canMove(self.element, { x: 1, y: 0 })) {
									self.element.moveRight();
									self.element.render();
								}
								break;
							case 40:
								// Bas
								if (self.board.canMove(self.element, { x: 0, y: 1 })) {
									self.element.moveDown();
									self.element.render();
								}
								break;
						}
					}
				}, false);
			}
		}]);
	
		return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Created by quentinmachard on 15/01/2016.
	 */
	
	var Element = function () {
		function Element() {
			_classCallCheck(this, Element);
	
			this.bricks = [];
			this.form = null;
	
			this.position = { x: 5, y: -1 };
	
			this.rotation = 0;
	
			this.forms = [
			/*
	  [ ][ ]
	  [ ][ ]
	   */
			[[{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }]],
	
			/*
	   [ ][x][ ]
	      [ ]
	   */
			[[{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }], [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }], [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 0 }], [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 2 }]],
	
			/*
	   [ ][x]
	      [ ][ ]
	   */
			[[{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }], [{ x: 2, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }]],
	
			/*
	      [x][ ]
	   [ ][ ]
	   */
			[[{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }], [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }]],
	
			/*
	   [ ][x][ ]
	   [ ]
	   */
			[[{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 0, y: 2 }], [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }], [{ x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 2, y: 1 }], [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }]],
	
			/*
	   [ ][x][ ]
	         [ ]
	   */
			[[{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }], [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }], [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 2, y: 1 }], [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 0 }]],
	
			/*
	   [ ][x][ ][ ]
	   */
			[[{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }], [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }]]];
	
			this.init();
		}
	
		_createClass(Element, [{
			key: 'init',
			value: function init() {
				for (var i = 0; i < 4; i++) {
					var square = document.createElement('span');
					square.className = 'element';
					document.getElementById('elements').appendChild(square);
					this.bricks.push(square);
				}
	
				this.form = this.forms[Math.floor(Math.random() * this.forms.length)];
				//this.form = this.forms[6];
			}
		}, {
			key: 'rotate',
			value: function rotate() {
				this.rotation = ++this.rotation % this.form.length;
			}
		}, {
			key: 'moveDown',
			value: function moveDown() {
				this.position.y++;
			}
		}, {
			key: 'moveLeft',
			value: function moveLeft() {
				this.position.x--;
			}
		}, {
			key: 'moveRight',
			value: function moveRight() {
				this.position.x++;
			}
		}, {
			key: 'render',
			value: function render() {
				for (var i = 0; i < 4; i++) {
					this.bricks[i].style.left = (this.position.x + this.form[this.rotation][i].x) * 20 + 'px';
					this.bricks[i].style.top = (this.position.y + this.form[this.rotation][i].y) * 20 + 'px';
				}
			}
		}]);
	
		return Element;
	}();
	
	exports.default = Element;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Board = function () {
		function Board() {
			_classCallCheck(this, Board);
	
			this.domElement = document.getElementById('board');
	
			this.bricks = [];
		}
	
		_createClass(Board, [{
			key: 'addBricks',
			value: function addBricks(element) {
				var bricks = element.form[element.rotation];
	
				for (var i = 0; i < bricks.length; i++) {
					var brick = {
						x: element.position.x + bricks[i].x,
						y: element.position.y + bricks[i].y,
						element: element.bricks[i]
					};
					this.bricks.push(brick);
				}
			}
		}, {
			key: 'canMove',
			value: function canMove(element, move) {
				for (var i = 0, brick; brick = element.form[element.rotation][i]; i++) {
					var y = element.position.y + brick.y + move.y;
					var x = element.position.x + brick.x + move.x;
	
					// Détection du bord inférieur
					if (y > Math.floor(this.domElement.offsetHeight / 20) - 1) {
						return false;
					}
	
					if (x < 0) {
						return false;
					}
	
					if (x > Math.floor(this.domElement.offsetWidth / 20) - 1) {
						return false;
					}
	
					// Detection d'une autre pièce en dessous
					if (this.hasBrick(x, y)) {
						return false;
					}
				}
				return true;
			}
		}, {
			key: 'canRotate',
			value: function canRotate(element) {
				var rotation = (element.rotation + 1) % element.form.length;
	
				for (var i = 0, brick; brick = element.form[rotation][i]; i++) {
					var y = element.position.y + brick.y;
					var x = element.position.x + brick.x;
	
					// Détection du bord inférieur
					if (y > Math.floor(this.domElement.offsetHeight / 20) - 1) {
						return false;
					}
	
					if (x < 0) {
						return false;
					}
	
					if (x > Math.floor(this.domElement.offsetWidth / 20) - 1) {
						return false;
					}
	
					// Detection d'une autre pièce en dessous
					if (this.hasBrick(x, y)) {
						return false;
					}
				}
	
				return true;
			}
		}, {
			key: 'removeLines',
			value: function removeLines() {
				var nbLines = Math.floor(this.domElement.offsetHeight / 20);
				var nbCols = Math.floor(this.domElement.offsetWidth / 20);
				var result = 0;
	
				for (var line = 0; line < nbLines; line++) {
					for (var column = 0; column < nbCols; column++) {
						if (!this.hasBrick(column, line)) break;
	
						if (column == nbCols - 1) {
							result++;
							this.removeLine(line);
						}
					}
				}
	
				return result;
			}
		}, {
			key: 'removeLine',
			value: function removeLine(line) {
				var bricks = [];
				for (var i = 0, brick; brick = this.bricks[i]; i++) {
					if (brick.y != line) {
						if (brick.y < line) {
							brick.y++;
						}
						bricks.push(brick);
					} else {
						brick.element.remove();
					}
				}
				this.bricks = bricks;
				this.render();
			}
		}, {
			key: 'render',
			value: function render() {
				for (var i = 0, brick; brick = this.bricks[i]; i++) {
					brick.element.style.left = brick.x * 20 + 'px';
					brick.element.style.top = brick.y * 20 + 'px';
				}
				return false;
			}
		}, {
			key: 'hasBrick',
			value: function hasBrick(x, y) {
				for (var i = 0, brick; brick = this.bricks[i]; i++) {
					if (brick.x == x && brick.y == y) {
						return true;
					}
				}
				return false;
			}
		}]);
	
		return Board;
	}();
	
	exports.default = Board;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Score = function () {
		function Score(game) {
			_classCallCheck(this, Score);
	
			this.game = game;
	
			this.score = 0;
	
			this.domElement = document.getElementById('score');
			this.domElementTable = document.getElementById('tableScore');
		}
	
		_createClass(Score, [{
			key: 'increment',
			value: function increment(nb) {
				this.score += nb;
				this.render();
			}
		}, {
			key: 'reset',
			value: function reset() {
				this.score = 0;
				this.render();
			}
		}, {
			key: 'saveHighScore',
			value: function saveHighScore() {
				if ((typeof Storage === 'undefined' ? 'undefined' : _typeof(Storage)) != undefined) {
					var currentHighScore = localStorage.getItem("highScore");
	
					if (currentHighScore == null || this.score > currentHighScore) {
						localStorage.setItem("highScore", this.score);
					}
				}
			}
		}, {
			key: 'getHighScore',
			value: function getHighScore() {
				if ((typeof Storage === 'undefined' ? 'undefined' : _typeof(Storage)) != undefined) {
					var currentHighScore = localStorage.getItem("highScore");
	
					if (currentHighScore != null) {
						return currentHighScore;
					} else {
						return 0;
					}
				}
				return null;
			}
		}, {
			key: 'render',
			value: function render() {
				this.domElement.innerHTML = this.score;
			}
		}, {
			key: 'renderTable',
			value: function renderTable() {
				this.domElementTable.querySelector('.txt-score').innerHTML = this.score;
				this.domElementTable.querySelector('.txt-highscore').innerHTML = this.getHighScore();
			}
		}]);
	
		return Score;
	}();
	
	exports.default = Score;

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map