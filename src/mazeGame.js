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
		this.state = {
			mazeSize: [3, 3, 3, 3],
			maze: createPlayableMaze(this.mazeSize, 0.5, true),
			playerCoordinates: [0, 0, 0, 0],
			movesByDimension: getLegalMovesByDimension(this.state.playerCoordinates, this.state.maze)
		};
	}

	handleMove(dimension, up) {
		var mazeSize = this.state.mazeSize.slice();
		var maze = this.state.maze.slice();
		var playerCoordinates = this.playerCoordinates.slice();
		var currentArea = getAreaOfCoordinates(maze, playerCoordinates);
		currentArea.player = false;
		if (up) playerCoordinates[dimension]++;
		else playerCoordinates[dimension]--;
		var newArea = getAreaOfCoordinates(maze, playerCoordinates);
		newArea.player = true;

		var movesByDimension = getLegalMovesByDimension(playerCoordinates, maze)
		this.setState({
			mazeSize: mazeSize,
			maze: maze,
			playerCoordinates: playerCoordinates,
			movesByDimension: movesByDimension
		});
	}

	handleClickUp(dimension) {
		handleMove(dimension, true)
	}

	handleClickDown(dimension) {
		handleMove(dimension, false)
	}

	render() {
		return (
			<div>
				<div style={{display: "flex"}}>
					{[...Array(this.mazeSize.length)].map((x, dimension) =>
						<div key={dimension}>
							<Control
								dimensionIndex={dimension}
								areasOfDimension={getAreasOfDimension(this.maze, this.playerCoordinates, dimension)}
								moves={this.state.movesByDimension[dimension]}
								onClickUp={() => this.handleClickUp(dimension)}
								onClickDown={() => this.handleClickDown(dimension)}
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