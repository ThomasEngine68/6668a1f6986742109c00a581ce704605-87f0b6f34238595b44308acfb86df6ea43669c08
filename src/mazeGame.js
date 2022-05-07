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
							<td className={`
								${area.open ? "openMazeTile" : "walledMazeTile"}
								${area.player ? "hasPlayer" : ""}
								${area.goal ? "hasGoal" : ""}
								`} style={{
								border: "1px solid black",
								padding: "0px",
								height: "30px",
								width: "30px"
							}}>
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
	render() {
		return (
			<div>
				<div style={{display: "flex"}}>
					{[...Array(this.props.mazeSize.length)].map((x, dimension) =>
						<div key={dimension}>
							<Control
								dimensionIndex={dimension}
								areasOfDimension={getAreasOfDimension(this.props.maze, this.props.playerCoordinates, dimension)}
								moves={this.props.movesByDimension[dimension]}
								onClickUp={() => this.props.handleClickUp(dimension)}
								onClickDown={() => this.props.handleClickDown(dimension)}
							/>
						</div>
					)}
				</div>
				<div>
					{this.props.gameWon ? "YOU WON THE GAME! 🥳🎉💯🎉🥳🥕🥕🥕" : null}
				</div>
			</div>
		)
	}
}