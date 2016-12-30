const Square = (function() {
  'use strict';

  // Pass an index to the square so that each square can be tracked
  function Square(index) {
    const self = this;

    this.index = index;
    this.isOccupied = false;
    this.occupyingPlayer = null;

    this.square = document.createElement('li');
    this.square.classList.add('box');
    this.square.id = 'box' + index;

    // Occupy square and progress game
    this.square.addEventListener('click', function() {
      if(!self.isOccupied) {
        self.occupySquare();
        board.progressGame();
      }
    }, false);

    // Show current players symbol when hovering over current unoccupied squares
    this.square.addEventListener('mouseenter', function() {
      if(!self.isOccupied && !game.currentPlayer.isComputer) { 
        self.square.style.backgroundImage = 'url(' + game.currentPlayer.svg + ')'; 
      }
    }, false);

    // Remove current players symbol when user leaves current unoccupied square
    this.square.addEventListener('mouseout', function() {
      if(!self.isOccupied) { self.square.style.backgroundImage = ''; }
    }, false);
  };

  Square.prototype.occupySquare = function() {
    this.isOccupied = true;
    this.occupyingPlayer = game.currentPlayer.playerNumber;
    this.square.classList.add(game.currentPlayer.boxClass);
    this.square.style.cursor = 'default';
    board.openSquaresCount--;
  }

  return Square;
}());