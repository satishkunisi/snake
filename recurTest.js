DIMENSIONS = [20, 50];



function seedApples(numApples) {
	
	if (numApples === 0) {
		return [];
	}
	
	var randomRow = Math.floor(Math.random() * DIMENSIONS[0]);
	var randomCol = Math.floor(Math.random() * DIMENSIONS[1]);
	
	
	return [[randomRow, randomCol]].concat(seedApples(numApples - 1));
	
}


var arr = seedApples(10);

function seedApplesExcl(numApples) {
	
	if (numApples === 0) {
		return [];
	}
	
	var randomRow = Math.floor(Math.random() * DIMENSIONS[0]);
	var randomCol = Math.floor(Math.random() * DIMENSIONS[1]);
	
	return [[randomRow, randomCol]].concat(seedApplesExcl(numApples - 1));
	
}





console.log(seedApples(5));