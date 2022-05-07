'use strict';

class NewMazeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dimensionCount: 4,
			mazeSize: [3, 3, 3, 3],
			forceBackTrack: true,
			wallChance: 0.6
		}

		this.handleDimensionCountChange = this.handleDimensionCountChange.bind(this);
		this.handleDimensionSizeChange = this.handleDimensionSizeChange.bind(this);
		this.handleBackTrackChange = this.handleBackTrackChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleWallChanceChange = this.handleWallChanceChange.bind(this);
		this.generateLevel1 = this.generateLevel1.bind(this);
		this.generateLevel2 = this.generateLevel2.bind(this);
		this.generateLevel3 = this.generateLevel3.bind(this);
		this.generateLevel4 = this.generateLevel4.bind(this);
		this.generateLevel5 = this.generateLevel5.bind(this);
	}

	handleSubmit(event) {
		if(event) event.preventDefault();
		this.props.submitMazeSize(this.state.mazeSize, this.state.forceBackTrack, this.state.wallChance);
	}

	handleBackTrackChange(event){
		this.setState({
			forceBackTrack: event.target.value == "true"
		})
	}

	handleWallChanceChange(event){
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

	generateLevel1(){
		this.setState({
			dimensionCount: 1,
			mazeSize: [5],
			forceBackTrack: false,
			wallChance: 0.0
		},() => {
			this.handleSubmit()
		});
	}
	generateLevel2(){
		this.setState({
			dimensionCount: 2,
			mazeSize: [6, 6],
			forceBackTrack: true,
			wallChance: 0.5
		},() => {
			this.handleSubmit()
		});
	}
	generateLevel3(){
		this.setState({
			dimensionCount: 3,
			mazeSize: [5, 5, 5],
			forceBackTrack: true,
			wallChance: 0.6
		},() => {
			this.handleSubmit()
		});
	}
	generateLevel4(){
		this.setState({
			dimensionCount: 4,
			mazeSize: [4, 4, 4, 4],
			forceBackTrack: true,
			wallChance: 0.6
		},() => {
			this.handleSubmit()
		});
	}
	generateLevel5(){
		this.setState({
			dimensionCount: 5,
			mazeSize: [4, 4, 4, 4, 4],
			forceBackTrack: true,
			wallChance: 0.7
		},() => {
			this.handleSubmit()
		});
	}

	render() {
		var totalAreas = 1;
		this.state.mazeSize.forEach(size => {
			totalAreas = totalAreas * size;
		})
		return (
			<div style={{border: "solid black 1px"}}>
				<div style={{display: "flex"}}>
					<button onClick={this.generateLevel1}>Level 1</button>
					<button onClick={this.generateLevel2}>Level 2</button>
					<button onClick={this.generateLevel3}>Level 3</button>
					<button onClick={this.generateLevel4}>Level 4</button>
					<button onClick={this.generateLevel5}>Level 5</button>
				</div>
				<form onSubmit={this.handleSubmit}>
					<h3>Custom maze</h3>
					<div>
						<div>Force back track</div>
						<label>
							On
							<input type="radio" name="forceBackTrack" value="true" checked={this.state.forceBackTrack} onChange={this.handleBackTrackChange}/>
						</label>
						<label>
							Off
							<input type="radio" name="forceBackTrack" value="false" checked={!this.state.forceBackTrack} onChange={this.handleBackTrackChange}/>
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
					<input type="submit" value="Create new maze!" />
				</form>
			</div>
		)
	}
}