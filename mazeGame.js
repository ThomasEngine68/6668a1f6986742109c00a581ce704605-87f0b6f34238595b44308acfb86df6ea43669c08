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

    _this.state = { liked: false };
    _this.mazeSize = [3, 3, 3, 3];
    _this.maze = createPlayableMaze(_this.mazeSize, 0.5, true);
    _this.playerCoordinates = [0, 0, 0, 0];
    return _this;
  }

  _createClass(MazeGameContainer, [{
    key: "handleClickUp",
    value: function handleClickUp(index) {
      var currentArea = getAreaOfCoordinates(this.maze, this.playerCoordinates);
      currentArea.player = false;
      this.playerCoordinates[index]++;
      var newArea = getAreaOfCoordinates(this.maze, this.playerCoordinates);
      newArea.player = true;
      this.forceUpdate();
    }
  }, {
    key: "handleClickDown",
    value: function handleClickDown(index) {
      var currentArea = getAreaOfCoordinates(this.maze, this.playerCoordinates);
      currentArea.player = false;
      this.playerCoordinates[index]--;
      var newArea = getAreaOfCoordinates(this.maze, this.playerCoordinates);
      newArea.player = true;
      this.forceUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var legalMoves = getLegalMoves(this.playerCoordinates, this.maze, []);
      var movesOfDimensions = [].concat(_toConsumableArray(Array(this.mazeSize.length))).map(function (x, i) {
        var legalMovesOfDimension = legalMoves.filter(function (legalMove) {
          return legalMove.dimension == i;
        });
        var validUp = legalMovesOfDimension.some(function (legalMove) {
          return legalMove.move == "UP";
        });
        var validDown = legalMovesOfDimension.some(function (legalMove) {
          return legalMove.move == "DOWN";
        });
        return { validUp: validUp, validDown: validDown };
      });
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { style: { display: "flex" } },
          [].concat(_toConsumableArray(Array(this.mazeSize.length))).map(function (x, i) {
            return React.createElement(
              "div",
              { key: i },
              React.createElement(Control, {
                dimensionIndex: i,
                dimensionSize: _this2.mazeSize[i],
                areasOfDimension: getAreasOfDimension(_this2.maze, _this2.playerCoordinates, i),
                moves: movesOfDimensions[i],
                onClickUp: function onClickUp() {
                  return _this2.handleClickUp(i);
                },
                onClickDown: function onClickDown() {
                  return _this2.handleClickDown(i);
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