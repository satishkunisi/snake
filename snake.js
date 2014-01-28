(function(root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var Snake = SnakeGame.Snake = function() {
    this.dir = "N";
    this.segments = [];
    this.segments.push(new Coord([5,5]));
    this.offsets = {
			//coords are in the form of row, col
        "N": [-1, 0],
        "S": [1, 0],
        "W": [0, -1],
        "E": [0, 1]
    }
  }


  var Coord = SnakeGame.Coord = function(pos, val) {
		this.val = val
    this.pos = pos;
  }

  var plus = Coord.prototype.plus = function (deltas) {
    return [this.pos[0] + deltas[0], this.pos[1] + deltas[1]]
  }

  var move = Snake.prototype.move = function (board) {
    var offset = this.offsets[this.dir];
		var newSeg = new Coord(this.segments[0].plus(offset), "s");
    this.segments.unshift(newSeg);
    		
		if (board.posHasApple(newSeg.pos)) {
			board.seedApples(1);
			return;
		}
		
		this.segments.pop();
  }

	var segmentCoords = Snake.prototype.segmentCoords = function () {
		var segCoords = [];
		
		this.segments.forEach(function(coord){
			segCoords.push(coord.pos);
		})
	
		return segCoords; 
	}
	
  var turn = Snake.prototype.turn = function (newDir) {
		var OPPOSITES = {
			"N": "S",
			"S": "N",
			"W": "E",
			"E": "W"
		}
		
		if (newDir !== OPPOSITES[this.dir] ) {
			this.dir = newDir;
		}
  }


  var Board = SnakeGame.Board = function () {
    this.snake = new SnakeGame.Snake();
    this.grid = this.createGrid();
		this.seedApples(3);
  }
	
	Board.DIMENSIONS = [20, 40];
	

	var seedApples = Board.prototype.seedApples = function (numApples) {
		
		if (numApples === 0) {
			return;
		}
		
		var randomRow = Math.floor(Math.random() * Board.DIMENSIONS[0]);
		var randomCol = Math.floor(Math.random() * Board.DIMENSIONS[1]);
		
		var randCoords = [randomRow, randomCol];
		
		if (this.getPos(randCoords)) {
			this.seedApples(numApples)
		} else {
			this.setPos(randCoords, new Coord(randCoords, "a"));
			this.seedApples(numApples - 1); 
		}
	}

  

  var createGrid = Board.prototype.createGrid = function () {

    var grid = [];

    for (var i = 0; i < Board.DIMENSIONS[0]; i++) {
      grid.push([]);
      for (var j = 0; j < Board.DIMENSIONS[1]; j++) {
				var el;
        grid[i].push(el);
      }
    }

    return grid;
  }
	
	var objsInGrid = Board.prototype.objsInGrid = function () {
		
		var objs = [];
		
		this.grid.forEach(function(row, rowIdx){
			row.forEach(function(el, colIdx){
				if (el) { objs.push(el); }
			})
		})
		
		return objs; 
	}
	
	var posHasApple = Board.prototype.posHasApple = function (coord) {
		
		var gridEl = this.grid[coord[0]][coord[1]]; 
		
		if (gridEl && gridEl.val === "a") {
			return true;
		}
	}
	
	var updateGrid = Board.prototype.updateGrid = function (endGame) {
		var board = this;
		
		var gridObjs = this.objsInGrid();
		var snakeSegs = this.snake.segments;
		
		if (board.illegalMove(snakeSegs[0].pos)) {
			endGame(); 
		}
		
		snakeSegs.forEach(function(segment){
			var row = segment.pos[0];
			var col = segment.pos[1];
			board.setPos([row, col], segment);
		})
		
		gridObjs.forEach(function(obj){
			if ($.inArray(obj, snakeSegs) === -1 ) {
				if (obj.val === "s") {
					board.setPos([obj.pos[0], obj.pos[1]], null); 
				}
			}
		})
		
	}
	
	var illegalMove = Board.prototype.illegalMove = function (coord) {
		if (this.snakeInCoord(coord) || this.outOfBounds(coord)) {
			return true;
		}
	}
	
	var snakeInCoord = Board.prototype.snakeInCoord = function (coord) {
		var inPos = this.grid[coord[0]][coord[1]];
		
		if (inPos && inPos.val === "s") {
			return true;
		}
	}
	
	var outOfBounds = Board.prototype.outOfBounds = function (coord) {
		var rowMax = Board.DIMENSIONS[0];
		var colMax = Board.DIMENSIONS[1];
		
		var coordOutOfBounds = coord[0] <= 0 || 
	                         coord[1] <= 0 || 
													 coord[0] >= rowMax || 
													 coord[1] >= colMax; 
		
		
		if (coordOutOfBounds) {
			return true; 
		}
			
	 return false; 
	}
	
	var getPos = Board.prototype.getPos = function (coords) {
		this.grid[coords[0]][coords[1]];
	}
	
	var setPos = Board.prototype.setPos = function (coords, value) {
		this.grid[coords[0]][coords[1]] = value;
	}

})(this);