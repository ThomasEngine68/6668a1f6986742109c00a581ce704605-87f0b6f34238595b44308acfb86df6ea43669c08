'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewMazeForm = function (_React$Component) {
	_inherits(NewMazeForm, _React$Component);

	function NewMazeForm(props) {
		_classCallCheck(this, NewMazeForm);

		var _this = _possibleConstructorReturn(this, (NewMazeForm.__proto__ || Object.getPrototypeOf(NewMazeForm)).call(this, props));

		_this.state = {
			dimensionCount: 4,
			mazeSize: [3, 3, 3, 3]
		};

		_this.handleDimensionCountChange = _this.handleDimensionCountChange.bind(_this);
		_this.handleDimensionSizeChange = _this.handleDimensionSizeChange.bind(_this);
		_this.handleSubmit = _this.handleSubmit.bind(_this);
		return _this;
	}

	_createClass(NewMazeForm, [{
		key: "handleSubmit",
		value: function handleSubmit(event) {
			event.preventDefault();
			this.props.submitMazeSize(this.state.mazeSize);
		}
	}, {
		key: "handleDimensionSizeChange",
		value: function handleDimensionSizeChange(event) {
			event.preventDefault();
			var dimensionName = event.target.name;
			var dimension = parseInt(dimensionName.substring(dimensionName.length - 1));
			var dimensionValue = parseInt(event.target.value);
			var mazeSize = this.state.mazeSize;
			mazeSize[dimension] = dimensionValue;
			this.setState({
				dimensionCount: this.state.dimensionCount,
				mazeSize: mazeSize
			});
		}
	}, {
		key: "handleDimensionCountChange",
		value: function handleDimensionCountChange(event) {
			event.preventDefault();
			var dimensionCount = parseInt(event.target.value);
			if (dimensionCount <= 6 && dimensionCount >= 1) {
				var mazeSize = this.state.mazeSize;
				if (mazeSize.length < dimensionCount) {
					for (var i = mazeSize.length; i < dimensionCount; i++) {
						mazeSize.push(3);
					}
				} else if (mazeSize.length > dimensionCount) {
					mazeSize = mazeSize.slice(0, dimensionCount);
				}
				this.setState({
					dimensionCount: dimensionCount,
					mazeSize: mazeSize
				});
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var totalAreas = 1;
			this.state.mazeSize.forEach(function (size) {
				totalAreas = totalAreas * size;
			});
			return React.createElement(
				"form",
				{ onSubmit: this.handleSubmit },
				React.createElement(
					"div",
					null,
					React.createElement(
						"p",
						null,
						"Force back track"
					),
					React.createElement("input", { type: "radio", name: "forceBackTrack", value: "true" }),
					React.createElement("input", { type: "radio", name: "forceBackTrack", value: "false" })
				),
				React.createElement(
					"div",
					null,
					React.createElement(
						"p",
						null,
						"Dimension count (1 - 6)"
					),
					React.createElement("input", { type: "number", min: "1", max: "6", name: "dimensionCount", value: this.state.dimensionCount, onChange: this.handleDimensionCountChange })
				),
				React.createElement(
					"div",
					null,
					React.createElement(
						"p",
						null,
						"Size per dimension"
					),
					[].concat(_toConsumableArray(Array(this.state.dimensionCount))).map(function (x, dimension) {
						return React.createElement(
							"div",
							{ key: dimension },
							React.createElement(
								"label",
								null,
								"Dimension ",
								dimension,
								React.createElement("input", { type: "number", min: "2", max: "10", value: _this2.state.mazeSize[dimension], name: "dimensionSize" + dimension, onChange: _this2.handleDimensionSizeChange })
							)
						);
					})
				),
				React.createElement(
					"p",
					null,
					"Total areas: ",
					totalAreas
				),
				React.createElement("input", { type: "submit", value: "Create new maze!" })
			);
		}
	}]);

	return NewMazeForm;
}(React.Component);