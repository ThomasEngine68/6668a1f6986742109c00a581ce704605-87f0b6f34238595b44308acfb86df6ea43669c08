'use strict';

class NewMazeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dimensionCount: 1,
			mazeSize: [5],
			forceBackTrack: false,
			wallChance: 0.0,
			created: true,
		}

		this.handleDimensionCountChange = this.handleDimensionCountChange.bind(this);
		this.handleDimensionSizeChange = this.handleDimensionSizeChange.bind(this);
		this.handleBackTrackChange = this.handleBackTrackChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleWallChanceChange = this.handleWallChanceChange.bind(this);
		this.generateLevel = this.generateLevel.bind(this);
		this.generateLevel1 = this.generateLevel1.bind(this);
		this.generateLevel2 = this.generateLevel2.bind(this);
		this.generateLevel3 = this.generateLevel3.bind(this);
		this.generateLevel4 = this.generateLevel4.bind(this);
		this.generateLevel5 = this.generateLevel5.bind(this);
		this.generateLevel6 = this.generateLevel6.bind(this);
		this.generateLevel7 = this.generateLevel7.bind(this);

		console.log(this.state.created)
	}

	handleSubmit(event) {
		if (event) event.preventDefault();
		this.props.submitMazeSize(this.state.mazeSize, this.state.forceBackTrack, this.state.wallChance);
	}

	handleBackTrackChange(event) {
		this.setState({
			forceBackTrack: event.target.value == "true"
		})
	}

	handleWallChanceChange(event) {
		var wallChance = parseFloat(event.target.value);
		this.setState({
			wallChance: wallChance
		})
	}

	handleDimensionSizeChange(event) {
		event.preventDefault();
		var dimensionName = event.target.name;
		var dimension = parseInt(dimensionName.substring(dimensionName.length - 1))
		var dimensionValue = parseInt(event.target.value);
		var mazeSize = this.state.mazeSize;
		mazeSize[dimension] = dimensionValue;
		this.setState({
			mazeSize: mazeSize
		})
	}

	handleDimensionCountChange(event) {
		event.preventDefault();
		var dimensionCount = parseInt(event.target.value);
		if (dimensionCount <= 6 && dimensionCount >= 1) {
			var mazeSize = this.state.mazeSize;
			if (mazeSize.length < dimensionCount) {
				for (var i = mazeSize.length; i < dimensionCount; i++) {
					mazeSize.push(3);
				}
			}
			else if (mazeSize.length > dimensionCount) {
				mazeSize = mazeSize.slice(0, dimensionCount);
			}
			this.setState({
				dimensionCount: dimensionCount,
				mazeSize: mazeSize
			})
		}
	}

	generateLevel1() {
		this.generateLevel(
			1,
			[5],
			false,
			0.0
		);
	}
	generateLevel2() {
		this.generateLevel(
			2,
			[6, 6],
			true,
			0.55
		);
	}
	generateLevel3() {
		this.generateLevel(
			3,
			[5, 5, 5],
			true,
			0.6
		);
	}
	generateLevel4() {
		this.generateLevel(
			4,
			[4, 4, 4, 4],
			true,
			0.6
		);
	}
	generateLevel5() {
		this.generateLevel(
			5,
			[4, 4, 4, 4, 4],
			true,
			0.7
		);
	}
	generateLevel6() {
		this.generateLevel(
			6,
			[4, 4, 4, 4, 3, 3],
			true,
			0.75
		);
	}
	generateLevel7() {
		this.generateLevel(
			6,
			[5, 5, 4, 4, 4, 4],
			true,
			0.77
		);
	}

	generateLevel(dimensionCount, mazeSize, forceBackTrack, wallChance) {
		this.setState({
			dimensionCount: dimensionCount,
			mazeSize: mazeSize,
			forceBackTrack: forceBackTrack,
			wallChance: wallChance,
			created: false,
		}, () => {
			setTimeout(() => {
				this.handleSubmit()
				this.setState({created: true})
			}, 100)
		});
	}

	render() {
		var totalAreas = 1;
		this.state.mazeSize.forEach(size => {
			totalAreas = totalAreas * size;
		})
		return (
			<div className="whitePanel">
				<div style={{display: "flex", flexWrap: "wrap"}}>
					<button className="button" onClick={this.generateLevel1}>Level 1</button>
					<button className="button" onClick={this.generateLevel2}>Level 2</button>
					<button className="button" onClick={this.generateLevel3}>Level 3</button>
					<button className="button" onClick={this.generateLevel4}>Level 4</button>
					<button className="button" onClick={this.generateLevel5}>Level 5</button>
					<button className="button" onClick={this.generateLevel6}>Level 6</button>
					<button className="button" onClick={this.generateLevel7}>Level 7</button>
				</div>
				<form onSubmit={this.handleSubmit}>
					<div style={{display: "flex"}}>
						<h3>Custom maze</h3>
						<h3 style={{
							visibility: this.state.created ? 'hidden' : 'initial',
							marginLeft: "10px"
							}}>
							Loading...
							</h3>
					</div>
					<div>
						<div>Force back track</div>
						<label>
							On
							<input type="radio" name="forceBackTrack" value="true" checked={this.state.forceBackTrack} onChange={this.handleBackTrackChange} />
						</label>
						<label>
							Off
							<input type="radio" name="forceBackTrack" value="false" checked={!this.state.forceBackTrack} onChange={this.handleBackTrackChange} />
						</label>
					</div>
					<div>
						<label>
							Wall chance
							<input type="number" step="0.01" min="0.00" max="0.80" name="wallChance" value={this.state.wallChance} onChange={this.handleWallChanceChange} />
						</label>
					</div>
					<div>
						<div>Dimension count (1 - 6)</div>
						<input type="number" min="1" max="6" name="dimensionCount" value={this.state.dimensionCount} onChange={this.handleDimensionCountChange} />
					</div>
					<div>
						<div>Size per dimension</div>
						{[...Array(this.state.dimensionCount)].map((x, dimension) =>
							<div key={dimension}>
								<label>
									Dimension {dimension}
									<input type="number" min="2" max="10" value={this.state.mazeSize[dimension]} name={"dimensionSize" + dimension} onChange={this.handleDimensionSizeChange} />
								</label>
							</div>
						)}
					</div>
					<p>Total areas: {totalAreas}</p>
					<button className="button" type="submit">Create a new maze!</button>
				</form>
			</div>
		)
	}
}