'use strict';

function Control(props) {
  return (
    <div style={{
      border: "1px solid black",
      margin: "10px"
      }}>
      <p>Dimension {props.dimensionIndex}</p>
      <button className="moveButton" disabled={!props.moves.validUp} onClick={props.onClickUp}>
        UP
      </button>
      <table>
        <tbody>
          {[...props.areasOfDimension].reverse().map((area, index) =>
            <tr key={index}>
              <td className="openSquare" style={{
                border: "1px solid black",
                padding: "0px",
                height: "30px",
                width: "30px"
                }}>
                  {area.player ? "P" : null}
                  {area.goal ? "G" : null}
                  {area.open ? null : "----"}
                </td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="moveButton" disabled={!props.moves.validDown} onClick={props.onClickDown}>
        DOWN
      </button>
    </div>
  );
}

class MazeGameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
    this.mazeSize = [3, 3, 3, 3];
    this.maze = createPlayableMaze(this.mazeSize, 0.5, true)
    this.playerCoordinates = [0, 0, 0, 0]
  }

  handleClickUp(index) {
    var currentArea = getAreaOfCoordinates(this.maze, this.playerCoordinates);
    currentArea.player = false;
    this.playerCoordinates[index]++;
    var newArea = getAreaOfCoordinates(this.maze, this.playerCoordinates);
    newArea.player = true;
    this.forceUpdate();
  }

  handleClickDown(index) {
    var currentArea = getAreaOfCoordinates(this.maze, this.playerCoordinates);
    currentArea.player = false;
    this.playerCoordinates[index]--;
    var newArea = getAreaOfCoordinates(this.maze, this.playerCoordinates);
    newArea.player = true;
    this.forceUpdate();
  }

  render() {
    var legalMoves = getLegalMoves(this.playerCoordinates, this.maze, []);
    var movesOfDimensions = [...Array(this.mazeSize.length)].map((x, i) => {
      var legalMovesOfDimension = legalMoves.filter(legalMove => legalMove.dimension == i);
      var validUp = legalMovesOfDimension.some(legalMove => legalMove.move == "UP");
      var validDown = legalMovesOfDimension.some(legalMove => legalMove.move == "DOWN");
      return {validUp : validUp, validDown: validDown};
    });
    return (
      <div>
        <div style={{display: "flex"}}>
        {[...Array(this.mazeSize.length)].map((x, i) =>
          <div key={i}>
            <Control 
              dimensionIndex={i}
              dimensionSize={this.mazeSize[i]}
              areasOfDimension={getAreasOfDimension(this.maze, this.playerCoordinates, i)}
              moves={movesOfDimensions[i]}
              onClickUp={() => this.handleClickUp(i)}
              onClickDown={() => this.handleClickDown(i)}
            />
          </div>
        )}
        </div>
      </div>
    )
  }
}

let domContainer = document.querySelector('#mazeGameContainer');
ReactDOM.render(<MazeGameContainer />, domContainer);