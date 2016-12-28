var Game = (function() {
	'use strict';

	// Game constructor
	function Game() {
		this.player1 = new Player('img/o.svg', 'box-filled-1', 'screen-win-one');
		this.player2 = new Player('img/x.svg', 'box-filled-2', 'screen-win-two');

		this.currentPlayer = this.player1;
		this.totalSquaresOccupied = 0;
		this.winConfigurations = [
			// Horizontal configurations
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],

			// Vertical configurations
			[1, 4, 7],
			[2, 5, 8],
			[3, 6, 9],

			// Diagonal configurations
			[1, 5, 9],
			[3, 5, 7]
		]
	};	

	Game.prototype.toggleCurrentPlayer = function() {
		document.getElementById('player1').classList.toggle('active');
		document.getElementById('player2').classList.toggle('active');

		if(this.currentPlayer === this.player1) {
			this.currentPlayer = this.player2;
		} else {
			this.currentPlayer = this.player1;
		}
	};

	Game.prototype.checkForWinner = function() {
		var squaresOccupied = this.currentPlayer.squaresOccupied;
		
		for(var i = 0; i < this.winConfigurations.length; i++) {
			var counter = 0;
			for(var j = 0; j < squaresOccupied.length; j++) {
				if(this.winConfigurations[i].includes(squaresOccupied[j])) { counter++; }
			}
			if(counter === 3) { return true; } 
		}
	}

	return Game;
}());