'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function Control(props) {
	return React.createElement(
		"div",
		{ style: {
				border: "1px solid black",
				margin: "10px"
			} },
		React.createElement(
			"p",
			null,
			"Dimension ",
			props.dimensionIndex
		),
		React.createElement(
			"button",
			{ className: "moveButton", disabled: !props.moves.validUp, onClick: props.onClickUp },
			"UP"
		),
		React.createElement(
			"table",
			null,
			React.createElement(
				"tbody",
				null,
				[].concat(_toConsumableArray(props.areasOfDimension)).reverse().map(function (area, index) {
					return React.createElement(
						"tr",
						{ key: index },
						React.createElement(
							"td",
							{ className: "openSquare", style: {
									border: "1px solid black",
									padding: "0px",
									height: "30px",
									width: "30px"
								} },
							area.player ? "P" : null,
							area.goal ? "G" : null,
							area.open ? null : "----"
						)
					);
				})
			)
		),
		React.createElement(
			"button",
			{ className: "moveButton", disabled: !props.moves.validDown, onClick: props.onClickDown },
			"DOWN"
		)
	);
}

var MazeGameContainer = function (_React$Component) {
	_inherits(MazeGameContainer, _React$Component);

	function MazeGameContainer(props) {
		_classCallCheck(this, MazeGameContainer);

		var _this = _possibleConstructorReturn(this, (MazeGameContainer.__proto__ || Object.getPrototypeOf(MazeGameContainer)).call(this, props));

		var mazeSize = [3, 3, 3, 3];
		var maze = createPlayableMaze(mazeSize, 0.5, true);
		var playerCoordinates = [0, 0, 0, 0];
		var movesByDimension = getLegalMovesByDimension(playerCoordinates, maze);
		_this.state = {
			mazeSize: mazeSize,
			maze: maze,
			playerCoordinates: playerCoordinates,
			movesByDimension: movesByDimension
		};
		return _this;
	}

	_createClass(MazeGameContainer, [{
		key: "handleMove",
		value: function handleMove(dimension, up) {
			var mazeSize = this.state.mazeSize.slice();
			var maze = this.state.maze.slice();
			var playerCoordinates = this.state.playerCoordinates.slice();
			var currentArea = getAreaOfCoordinates(maze, playerCoordinates);
			currentArea.player = false;
			if (up) playerCoordinates[dimension]++;else playerCoordinates[dimension]--;
			var newArea = getAreaOfCoordinates(maze, playerCoordinates);
			newArea.player = true;

			var movesByDimension = getLegalMovesByDimension(playerCoordinates, maze);
			this.setState({
				mazeSize: mazeSize,
				maze: maze,
				playerCoordinates: playerCoordinates,
				movesByDimension: movesByDimension
			});
		}
	}, {
		key: "handleClickUp",
		value: function handleClickUp(dimension) {
			this.handleMove(dimension, true);
		}
	}, {
		key: "handleClickDown",
		value: function handleClickDown(dimension) {
			this.handleMove(dimension, false);
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					{ style: { display: "flex" } },
					[].concat(_toConsumableArray(Array(this.state.mazeSize.length))).map(function (x, dimension) {
						return React.createElement(
							"div",
							{ key: dimension },
							React.createElement(Control, {
								dimensionIndex: dimension,
								areasOfDimension: getAreasOfDimension(_this2.state.maze, _this2.state.playerCoordinates, dimension),
								moves: _this2.state.movesByDimension[dimension],
								onClickUp: function onClickUp() {
									return _this2.handleClickUp(dimension);
								},
								onClickDown: function onClickDown() {
									return _this2.handleClickDown(dimension);
								}
							})
						);
					})
				)
			);
		}
	}]);

	return MazeGameContainer;
}(React.Component);

var domContainer = document.querySelector('#mazeGameContainer');
ReactDOM.render(React.createElement(MazeGameContainer, null), domContainer);