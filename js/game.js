const Game = (function() {
  'use strict';

  function Game() {
    this.player1 = new Player(1, 'img/o.svg', 'box-filled-1', 'screen-win-one');
    this.player2 = new Player(2, 'img/x.svg', 'box-filled-2', 'screen-win-two');
    this.currentPlayer = this.player1;
  };

  Game.prototype.toggleCurrentPlayer = function() {
    document.getElementById('player1').classList.toggle('active');
    document.getElementById('player2').classList.toggle('active');
    if(this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
      if(this.currentPlayer.isComputer) {
        // Set a timeout so that player indicator classes will toggle properly since they have a css transition property
        window.setTimeout(function() {
          board.calculateComputerPlayerMove();
        }, 750);
      }
    } else {
      this.currentPlayer = this.player1;
    }
  };

  return Game;
}());