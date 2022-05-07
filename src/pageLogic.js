'use strict';

class PageContainer extends React.Component {
	constructor(props) {
		super(props);
		var mazeSize = [3, 3, 3, 3];
		var maze = createPlayableMaze(mazeSize, 0.5, true);
		var playerCoordinates = [0, 0, 0, 0]
		var movesByDimension = getLegalMovesByDimension(playerCoordinates, maze);
		this.state = {
			mazeSize: mazeSize,
			maze: maze,
			playerCoordinates: playerCoordinates,
			movesByDimension: movesByDimension,
			playableMaze: true,
			gameWon: false
		};
		this.createNewMaze = this.createNewMaze.bind(this);
		this.handleMove = this.handleMove.bind(this);
		this.handleClickUp = this.handleClickUp.bind(this);
		this.handleClickDown = this.handleClickDown.bind(this);
	}

	createNewMaze(mazeSize) {
		var playerCoordinates = [];
		mazeSize.forEach(size => {
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
				playableMaze: true,
				gameWon: false
			});
		} else {
			this.setState({
				playableMaze: false,
				gameWon: false
			})
		}
	}

	handleMove(dimension, up) {
		var mazeSize = this.state.mazeSize.slice();
		var maze = this.state.maze.slice();
		var playerCoordinates = this.state.playerCoordinates.slice();
		var currentArea = getAreaOfCoordinates(maze, playerCoordinates);
		currentArea.player = false;
		if (up) playerCoordinates[dimension]++;
		else playerCoordinates[dimension]--;
		var newArea = getAreaOfCoordinates(maze, playerCoordinates);
		newArea.player = true;
		var gameWon = newArea.goal;

		var movesByDimension = getLegalMovesByDimension(playerCoordinates, maze)
		this.setState({
			mazeSize: mazeSize,
			maze: maze,
			playerCoordinates: playerCoordinates,
			movesByDimension: movesByDimension,
			gameWon: gameWon
		});
	}

	handleClickUp(dimension) {
		this.handleMove(dimension, true)
	}

	handleClickDown(dimension) {
		this.handleMove(dimension, false)
	}

	render() {
		return (
			<div>
				<MazeGameContainer
					handleClickUp={this.handleClickUp}
					handleClickDown={this.handleClickDown}
					mazeSize={this.state.mazeSize}
					maze={this.state.maze}
					playerCoordinates={this.state.playerCoordinates}
					movesByDimension={this.state.movesByDimension}
					gameWon={this.state.gameWon}
				/>
				<NewMazeForm
					submitMazeSize={this.createNewMaze}
				/>
				{this.state.playableMaze ? null : "COULDNT GENERATE PLAYABLE MAP"}
			</div>
		)
	}
}

let domContainer = document.querySelector('#pageContainer');
ReactDOM.render(<PageContainer />, domContainer);