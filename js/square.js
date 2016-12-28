var Square = (function() {
	'use strict';

	// Square constructor
	function Square(index) {
		var self = this;

		this.index = index;
		this.isOccupied = false;

		// Create the box and add event listeners
		this.listItem = document.createElement('li');
		this.listItem.classList.add('box');

		// When a user clicks on the current square perform funnctions needed to occupy square and progress game
		this.listItem.addEventListener('click', function() {
			if(!self.isOccupied) {
				self.isOccupied = true;

				// Change the class of the box to add the appropriate symbol
				self.listItem.classList.add(game.currentPlayer.boxClass);

				// Set the cursor to default to indicate the box cannot be selected again
				self.listItem.style.cursor = 'default';

				// Add square index to the current players occupied squares array
				game.currentPlayer.squaresOccupied.push(self.index);

				game.totalSquaresOccupied += 1;

				if(game.checkForWinner()) {
					GameUI.displayWinScreen(game.currentPlayer.winClass);
				} else if(game.totalSquaresOccupied === 9) {
					GameUI.displayWinScreen('screen-win-tie');
				} else {
					game.toggleCurrentPlayer();
				}
				
			}
		}, false);

		// Show current players symbol when hovering over current unoccupied squares
		this.listItem.addEventListener('mouseenter', function() {
			if(!self.isOccupied) {
				self.listItem.style.backgroundImage = 'url(' + game.currentPlayer.svg + ')';
			}
		}, false);

		// Remove current players symbol when user leaves current unoccupied square
		this.listItem.addEventListener('mouseout', function() {
			if(!self.isOccupied) {
				self.listItem.style.backgroundImage = '';
			}
		}, false);
	};

	return Square;
}());