const Square = (function() {
	'use strict';

	// Pass an index to the square so that each square can be tracked
	function Square(index) {
		const self = this;

		this.index = index;
		this.isOccupied = false;

		// Create the box and add event listeners
		this.listItem = document.createElement('li');
		this.listItem.classList.add('box');

		// When a user clicks on the current square perform funnctions needed to occupy square and progress game
		this.listItem.addEventListener('click', function() {
			if(!self.isOccupied) {
				self.isOccupied = true;
				self.listItem.classList.add(game.currentPlayer.boxClass);
				self.listItem.style.cursor = 'default';

				game.currentPlayer.squaresOccupied.push(self.index);
				game.totalSquaresOccupied += 1;

				// Check if there is a winner to the game
				if(game.checkForWinner()) {
					game_ui.displayWinScreen(game.currentPlayer.winClass, game.currentPlayer.name);
				} else if(game.totalSquaresOccupied === 9) {
					game_ui.displayWinScreen('screen-win-tie', null);
				} else {
					game.toggleCurrentPlayer();
				}
				
			}
		}, false);

		// Show current players symbol when hovering over current unoccupied squares
		this.listItem.addEventListener('mouseenter', function() {
			if(!self.isOccupied) { self.listItem.style.backgroundImage = 'url(' + game.currentPlayer.svg + ')'; }
		}, false);

		// Remove current players symbol when user leaves current unoccupied square
		this.listItem.addEventListener('mouseout', function() {
			if(!self.isOccupied) { self.listItem.style.backgroundImage = ''; }
		}, false);
	};

	return Square;
}());