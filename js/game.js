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
		const playerIndicator1 = document.getElementById('player1');
		const playerIndicator2 = document.getElementById('player2');
		playerIndicator1.classList.toggle('active');
		playerIndicator2.classList.toggle('active');
		this.currentPlayer === this.player1 ? this.currentPlayer = this.player2 : this.currentPlayer = this.player1;
	};

	// Checks if the current users occupied squares match any of the win configurations
	Game.prototype.checkForWinner = function() {
		const currentPlayerSquaresOccupied = this.currentPlayer.squaresOccupied;
		// Loop through win configurations
		for(let i = 0; i < winConfigurations.length; i++) {
			let counter = 0;
			// Loop through the current player's occupied squares
			for(let j = 0; j < currentPlayerSquaresOccupied.length; j++) {
				if(winConfigurations[i].includes(currentPlayerSquaresOccupied[j])) { counter++; }
				if(counter === winConfigurations[i].length) { return true; }
			} 
		}
	}
	return Game;
}());