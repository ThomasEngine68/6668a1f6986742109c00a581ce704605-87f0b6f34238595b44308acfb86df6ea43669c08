'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageContainer = function (_React$Component) {
	_inherits(PageContainer, _React$Component);

	function PageContainer(props) {
		_classCallCheck(this, PageContainer);

		var _this = _possibleConstructorReturn(this, (PageContainer.__proto__ || Object.getPrototypeOf(PageContainer)).call(this, props));

		var mazeSize = [3, 3, 3, 3];
		var maze = createPlayableMaze(mazeSize, 0.5, true);
		var playerCoordinates = [0, 0, 0, 0];
		var movesByDimension = getLegalMovesByDimension(playerCoordinates, maze);
		_this.state = {
			mazeSize: mazeSize,
			maze: maze,
			playerCoordinates: playerCoordinates,
			movesByDimension: movesByDimension,
			playableMaze: true,
			gameWon: false
		};
		_this.createNewMaze = _this.createNewMaze.bind(_this);
		_this.handleMove = _this.handleMove.bind(_this);
		_this.handleClickUp = _this.handleClickUp.bind(_this);
		_this.handleClickDown = _this.handleClickDown.bind(_this);
		return _this;
	}

	_createClass(PageContainer, [{
		key: 'createNewMaze',
		value: function createNewMaze(mazeSize) {
			var playerCoordinates = [];
			mazeSize.forEach(function (size) {
				playerCoordinates.push(0);
			});
			var maze = createPlayableMaze(mazeSize, 0.5, false);
			if (maze != null) {
				var movesByDimension = getLegalMovesByDimension(playerCoordinates, maze);
				this.setState({
					mazeSize: mazeSize,
					maze: maze,
					playerCoordinates: playerCoordinates,
					movesByDimension: movesByDimension,
					playableMaze: true
				});
				this.forceUpdate();
			} else {
				this.setState({
					playableMaze: false
				});
			}
			this.forceUpdate();
		}
	}, {
		key: 'handleMove',
		value: function handleMove(dimension, up) {
			var mazeSize = this.state.mazeSize.slice();
			var maze = this.state.maze.slice();
			var playerCoordinates = this.state.playerCoordinates.slice();
			var currentArea = getAreaOfCoordinates(maze, playerCoordinates);
			currentArea.player = false;
			if (up) playerCoordinates[dimension]++;else playerCoordinates[dimension]--;
			var newArea = getAreaOfCoordinates(maze, playerCoordinates);
			newArea.player = true;
			var gameWon = newArea.goal;

			var movesByDimension = getLegalMovesByDimension(playerCoordinates, maze);
			this.setState({
				mazeSize: mazeSize,
				maze: maze,
				playerCoordinates: playerCoordinates,
				movesByDimension: movesByDimension,
				gameWon: gameWon
			});
		}
	}, {
		key: 'handleClickUp',
		value: function handleClickUp(dimension) {
			this.handleMove(dimension, true);
		}
	}, {
		key: 'handleClickDown',
		value: function handleClickDown(dimension) {
			this.handleMove(dimension, false);
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'p',
					null,
					this.state.mazeSize
				),
				React.createElement(MazeGameContainer, {
					handleClickUp: this.handleClickUp,
					handleClickDown: this.handleClickDown,
					mazeSize: this.state.mazeSize,
					maze: this.state.maze,
					playerCoordinates: this.state.playerCoordinates,
					movesByDimension: this.state.movesByDimension,
					gameWon: this.state.gameWon
				}),
				React.createElement(NewMazeForm, {
					submitMazeSize: this.createNewMaze
				}),
				this.state.playableMaze ? null : "COULDNT GENERATE PLAYABLE MAP"
			);
		}
	}]);

	return PageContainer;
}(React.Component);

var domContainer = document.querySelector('#pageContainer');
ReactDOM.render(React.createElement(PageContainer, null), domContainer);