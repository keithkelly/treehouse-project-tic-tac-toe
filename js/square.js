const Square = (function() {
	'use strict';

	// Pass an index to the square so that each square can be tracked
	function Square(index) {
		const self = this;

		this.index = index;
		this.isOccupied = false;

		this.square = document.createElement('li');
		this.square.classList.add('box');

		// Occupy square and progress game
		this.square.addEventListener('click', function() {
			if(!self.isOccupied) {
				self.isOccupied = true;
				self.square.classList.add(game.currentPlayer.boxClass);
				self.square.style.cursor = 'default';

				game.currentPlayer.squaresOccupied.push(self.index);
				game.totalSquaresOccupied += 1;

				if(game.checkForWinner()) { 
					gameUI.loadWinScreen(game.currentPlayer.winClass, game.currentPlayer.name); 
				} else if(game.totalSquaresOccupied === 9) { 
					gameUI.loadWinScreen('screen-win-tie', null); 
				} else { 
					game.toggleCurrentPlayer(); 
				}
			}
		}, false);

		// Show current players symbol when hovering over current unoccupied squares
		this.square.addEventListener('mouseenter', function() {
			if(!self.isOccupied) { 
				self.square.style.backgroundImage = 'url(' + game.currentPlayer.svg + ')'; 
			}
		}, false);

		// Remove current players symbol when user leaves current unoccupied square
		this.square.addEventListener('mouseout', function() {
			if(!self.isOccupied) { self.square.style.backgroundImage = ''; }
		}, false);
	};

	return Square;
}());