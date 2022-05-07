function createNDimArray(dimensions, chance) {
	if (dimensions.length > 0) {
		var dim = dimensions[0];
		var rest = dimensions.slice(1);
		var newArray = new Array();
		for (var i = 0; i < dim; i++) {
			newArray[i] = createNDimArray(rest, chance);
		}
		return newArray;
	} else {
		var area = {
			player: false,
			goal: false,
			visited: false
		};
		area.open = Math.random() > chance;
		return area;
	}
}

function getZeroArea(maze) {
	var zero = maze;
	while (Array.isArray(zero)) {
		zero = zero[0];
	}
	return zero;
}

function getMaxArea(maze) {
	var max = maze;
	while (Array.isArray(max)) {
		max = max[max.length - 1];
	}
	return max;
}

function addStartEnd(maze) {
	var zero = getZeroArea(maze);
	var max = getMaxArea(maze);
	zero.player = true;
	zero.open = true;
	max.goal = true;
	max.open = true;
}

function createPlayableMaze(dimensions, chance, requiereBackTrack) {
	var maze;
	var tries = 0;
	var areasTested = 0;
	var maxAreasTested = 100000;
	var maxTries = 5000;
	var minDistance = 0
	if (requiereBackTrack) minDistance = calculateMinDistance(dimensions);
	var passed = false;
	while (!passed) {
		maze = null;
		tries++;
		if (tries > maxTries) break;
		if (areasTested > maxAreasTested) break;
		maze = createNDimArray(dimensions, chance);
		addStartEnd(maze);
		var stats = isPassable(dimensions, maze);
		passed = stats.passed && stats.chain.length > minDistance;
		areasTested += stats.areasTested;
	}
	console.log("areasTested " + areasTested);
	console.log("tries " + tries);
	return maze;
}

function calculateMinDistance(dimension) {
	var minDistance = dimension.map(dimension => dimension - 1)
		.reduce((partialSum, a) => partialSum + a, 0);
	return minDistance;
}

function isPassable(dimensions, maze) {
	var stats = {
		chain: chain,
		distance: 0,
		passed: false,
		areasTested: 0
	};
	var triedCoordinates = [];
	var firstCoordinates = [];
	dimensions.forEach(element => {
		firstCoordinates.push(0);
	});
	var newCoordinateArray = [];
	var maxAreasTested = 10000;
	newCoordinateArray.push({
		chain: [],
		coordinates: firstCoordinates
	});
	while (newCoordinateArray.length) {
		stats.distance++
		var newNewCoordinateArray = [];
		for (newCoordinates of newCoordinateArray) {
			coordinates = newCoordinates.coordinates;
			var legalMoves = getLegalMoves(coordinates, maze, triedCoordinates);
			stats.areasTested = triedCoordinates.length;
			for (legalMove of legalMoves) {
				var chain = [...newCoordinates.chain];
				chain.push(legalMove);
				if (legalMove.area.goal) {
					stats.chain = chain;
					stats.passed = true;
					return stats;
				}
				newNewCoordinateArray.push({
					chain: chain,
					coordinates: legalMove.coordinates
				});
			}
			if (stats.areasTested > maxAreasTested) {
				console.log("Max tried areas passed");
				return stats;
			}
		}
		newCoordinateArray = newNewCoordinateArray;
	}
	return stats;
}

function getAreaWithCoordinates(coordinates, maze) {
	var area = maze;
	for (coordinate of coordinates) {
		if (coordinate < 0 || coordinate >= area.length) return null;
		area = area[coordinate];
	}
	return area;
}

function getLegalMoves(coordinates, maze, triedCoordinates) {
	var leagalMoves = [];
	coordinates.forEach((coordinate, dimension) => {
		var alternateCoordinateDown = [...coordinates];
		alternateCoordinateDown[dimension]--;
		if (isNewCoordinates(triedCoordinates, alternateCoordinateDown)) {
			var areaDown = getAreaWithCoordinates(alternateCoordinateDown, maze);
			if (areaDown && areaDown.open) {
				var move = {
					move: "DOWN",
					dimension: dimension,
					coordinates: alternateCoordinateDown,
					area: areaDown
				};
				leagalMoves.push(move);
			}
		}
		var alternateCoordinateUp = [...coordinates];
		alternateCoordinateUp[dimension]++;
		if (isNewCoordinates(triedCoordinates, alternateCoordinateUp)) {
			var areaUp = getAreaWithCoordinates(alternateCoordinateUp, maze);
			if (areaUp && areaUp.open) {
				var move = {
					move: "UP",
					dimension: dimension,
					coordinates: alternateCoordinateUp,
					area: areaUp
				};
				leagalMoves.push(move);
			}
		}
	});
	return leagalMoves;
}

function isNewCoordinates(triedCoordinates, coordinates) {
	var json = JSON.stringify(coordinates);
	if (triedCoordinates.includes(json)) {
		return false;
	} else {
		triedCoordinates.push(json);
		return true;
	}
}

function getAreasOfDimension(maze, coordinates, dimension) {
	var arrayInUse = maze;
	coordinates.forEach((coordinate, index) => {
		if (index == dimension) {
			arrayInUse = arrayInUse;
		} else if (index < dimension) {
			arrayInUse = arrayInUse[coordinate];
		} else {
			arrayInUse = arrayInUse.map(innerArray => innerArray[coordinate]);
		}
	});
	return arrayInUse;
}

function getAreaOfCoordinates(maze, coordinates) {
	var area = maze;
	for (coordinate of coordinates) {
		area = area[coordinate];
	}
	return area;
}

function getLegalMovesByDimension(playerCoordinates, maze) {
	var legalMoves = getLegalMoves(playerCoordinates, maze, []);
	var movesByDimension = [...Array(playerCoordinates.length)].map((x, i) => {
		var legalMovesOfDimension = legalMoves.filter(legalMove => legalMove.dimension == i);
		var validUp = legalMovesOfDimension.some(legalMove => legalMove.move == "UP");
		var validDown = legalMovesOfDimension.some(legalMove => legalMove.move == "DOWN");
		return {
			validUp: validUp,
			validDown: validDown
		};
	});
	return movesByDimension;
}