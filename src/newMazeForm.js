'use strict';

class NewMazeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dimensionCount: 4,
			mazeSize: [3, 3, 3, 3]
		}

		this.handleDimensionCountChange = this.handleDimensionCountChange.bind(this);
		this.handleDimensionSizeChange = this.handleDimensionSizeChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.submitMazeSize(this.state.mazeSize);
	}

	handleDimensionSizeChange(event) {
		event.preventDefault();
		var dimensionName = event.target.name;
		var dimension = parseInt(dimensionName.substring(dimensionName.length - 1))
		var dimensionValue = parseInt(event.target.value);
		var mazeSize = this.state.mazeSize;
		mazeSize[dimension] = dimensionValue;
		this.setState({
			dimensionCount: this.state.dimensionCount,
			mazeSize: mazeSize
		})
	}

	handleDimensionCountChange(event) {
		event.preventDefault();
		var dimensionCount = parseInt(event.target.value);
		if (dimensionCount <= 6 && dimensionCount >= 1) {
			var mazeSize = this.state.mazeSize;
			if(mazeSize.length < dimensionCount){
				for(var i = mazeSize.length; i < dimensionCount; i++){
					mazeSize.push(3);
				}
			}
			else if(mazeSize.length > dimensionCount){
				mazeSize = mazeSize.slice(0, dimensionCount);
			}
			this.setState({
				dimensionCount: dimensionCount,
				mazeSize: mazeSize
			})
		}
	}

	render() {
		var totalAreas = 1;
		this.state.mazeSize.forEach(size => {
			totalAreas = totalAreas * size;
		})
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<p>Force back track</p>
					<input type="radio" name="forceBackTrack" value="true" />
					<input type="radio" name="forceBackTrack" value="false" />
				</div>
				<div>
					<p>Dimension count (1 - 6)</p>
					<input type="number" min="1" max="6" name="dimensionCount" value={this.state.dimensionCount} onChange={this.handleDimensionCountChange}/>
				</div>
				<div>
					<p>Size per dimension</p>
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
		)
	}
}