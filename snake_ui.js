(function(root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var View = SnakeGame.View = function(html) {
    this.$el = html;
		this.board = new SnakeGame.Board();
  }
	
	var constructBoard = View.prototype.constructBoard = function () {
    var ui = this;
		
		$(ui.$el).empty();
				
    this.board.grid.forEach(function(row, rowIdx) {
			
      var $newRow = $("<div></div>").addClass("row").data("row", rowIdx);
			$(ui.$el).append($newRow);
			
      row.forEach(function(el){
			  var $newDiv = $("<div></div>");
				
				if (el) {
					var newClass = ( el.val === "s" ? "snake" : "apple")
					$newDiv.addClass(newClass);
				} else {
					$newDiv.addClass("tile");
				}
				
				$('.row').last().append($newDiv); 
      })
 
   })
		
	}
	
	var handleKeyDown = View.prototype.handleKeyDown = function(event) {
		
		var dir = event.keyCode;
		
		if (dir === 37) {
			this.board.snake.turn("W");
		} else if ( dir === 39) {
			this.board.snake.turn("E");
		} else if ( dir === 38) {
			this.board.snake.turn("N");
		} else if ( dir === 40) {
			this.board.snake.turn("S");
		}
		
	}
	
	var step = View.prototype.step = function () {
		
		view = this;
		this.board.snake.move(view.board);
		this.board.updateGrid(function(){
			view.endGame();
		});
		this.constructBoard();
	
	}
	
	var endGame = View.prototype.endGame = function () {
		$('#board').fadeTo("fast", 0.5)
		clearInterval(gameStarter);
	}
	
	var intervalSet = View.prototype.intervalSet = function () {
		ui = this;
		gameStarter = setInterval(function() { ui.step() }, 200);
	}
	
	
  var start = View.prototype.start = function() {
		var ui = this;
		
		ui.intervalSet();
		
		$(document).on("keydown", function(event){
			ui.handleKeyDown(event);
		})
  }

})(this);

game = new SnakeGame.View('#board');
game.start();