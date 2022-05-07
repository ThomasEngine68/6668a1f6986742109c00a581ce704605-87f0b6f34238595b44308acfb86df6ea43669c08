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

	function MazeGameContainer() {
		_classCallCheck(this, MazeGameContainer);

		return _possibleConstructorReturn(this, (MazeGameContainer.__proto__ || Object.getPrototypeOf(MazeGameContainer)).apply(this, arguments));
	}

	_createClass(MazeGameContainer, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					{ style: { display: "flex" } },
					[].concat(_toConsumableArray(Array(this.props.mazeSize.length))).map(function (x, dimension) {
						return React.createElement(
							"div",
							{ key: dimension },
							React.createElement(Control, {
								dimensionIndex: dimension,
								areasOfDimension: getAreasOfDimension(_this2.props.maze, _this2.props.playerCoordinates, dimension),
								moves: _this2.props.movesByDimension[dimension],
								onClickUp: function onClickUp() {
									return _this2.props.handleClickUp(dimension);
								},
								onClickDown: function onClickDown() {
									return _this2.props.handleClickDown(dimension);
								}
							})
						);
					})
				),
				React.createElement(
					"div",
					null,
					this.props.gameWon ? "YOU WON THE GAME! 🥳🎉💯🎉🥳" : null
				)
			);
		}
	}]);

	return MazeGameContainer;
}(React.Component);