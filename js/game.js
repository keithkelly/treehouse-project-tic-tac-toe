const Game = (function() {
	'use strict';

	const winConfigurations = [
		// Horizontal configurations
		[1, 2, 3], [4, 5, 6], [7, 8, 9],
		// Vertical configurations
		[1, 4, 7], [2, 5, 8], [3, 6, 9],
		// Diagonal configurations
		[1, 5, 9], [3, 5, 7]
	];

	function Game() {
		this.player1 = new Player('img/o.svg', 'box-filled-1', 'screen-win-one');
		this.player2 = new Player('img/x.svg', 'box-filled-2', 'screen-win-two');
		this.currentPlayer = this.player1;
		this.totalSquaresOccupied = 0;
	};	

	Game.prototype.toggleCurrentPlayer = function() {
		// Toggle the current player indicators at the top of the board
		document.getElementById('player1').classList.toggle('active');
		document.getElementById('player2').classList.toggle('active');

		this.currentPlayer === this.player1 ? this.currentPlayer = this.player2 : this.currentPlayer = this.player1;
	};

	Game.prototype.checkForWinner = function() {
		const squaresOccupied = this.currentPlayer.squaresOccupied;
		
		// Loop through all of the win configurations
		for(let i = 0; i < winConfigurations.length; i++) {
			let counter = 0;

			// Loop through the current players occupied squares and see if they are included in the current win configuration
			for(let j = 0; j < squaresOccupied.length; j++) {
				if(winConfigurations[i].includes(squaresOccupied[j])) { counter++; }
			}

			// When the counter is 3 all squares in the win configuration are occupied and there is a winner
			if(counter === 3) { return true; } 
		}
	}

	return Game;
}());