const Board = (function() {
  'use strict';

  const winConfigs = [
    // Horizontal configurations
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    // Vertical configurations
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    // Diagonal configurations
    [0, 4, 8], [2, 4, 6]
  ];

  function Board() {
    this.openSquaresCount = 9;
    this.squares = [];
  };

  Board.prototype.loadNewBoard = function() {
    // Generate a new set of squares
    for(let i = 0; i < 9; i++) {
      const square = new Square(i);
      this.squares.push(square);
      document.querySelector('.boxes').append(square.square);
    }
  };

  Board.prototype.calculateComputerPlayerMove = function() {
    let chosenSquare;
    let immediateAction = false;
    let numbersCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let maxNumber = numbersCount[0];
    let maxNumberIndex = 0;
    let attackerWinConfigs = [];

    // Loop through win configurations
    for(let i = 0; i < winConfigs.length; i++) {
      const currentConfig = winConfigs[i];
      let attackerSquares = [];
      let oppositionSquares = [];
      let emptySquares = [];

      for(let j = 0; j < currentConfig.length; j++) {
        const squareIndex = currentConfig[j];
        if(this.squares[squareIndex].occupyingPlayer === 1) { oppositionSquares.push(squareIndex); }
        if(this.squares[squareIndex].occupyingPlayer === 2) { attackerSquares.push(squareIndex); }
        if(!this.squares[squareIndex].isOccupied) { emptySquares.push(squareIndex); }
      }

      // Calculate if a path needs blocked
      if(oppositionSquares.length === 2 && attackerSquares.length === 0) {
        immediateAction = true;
        chosenSquare = emptySquares[0];
        break;

      // Calculate if there is immediate chance to win
      } else if (attackerSquares.length === 2 && oppositionSquares.length === 0) {
        immediateAction = true;
        chosenSquare = emptySquares[0];
        break;

      // If no immediate action gather potential winning configurations
      } else if(attackerSquares.length >= 0 && oppositionSquares.length < 2) {
        for(let m = 0; m < currentConfig.length; m++) {
          attackerWinConfigs.push(currentConfig[m]);
        }
      }
    }

    // Calculate the number of times a square is represented in potential win configurations
    for(let n = 0; n < attackerWinConfigs.length; n++) {
      const currentNumber = attackerWinConfigs[n];
      let currentNumberCount = numbersCount[currentNumber];
      currentNumberCount++;
      numbersCount[currentNumber] = currentNumberCount;
    }

    // Determine which square occurs most often and choose it
    // If there are multiple of the same value then the first will be chosen
    for(let p = 0; p < numbersCount.length; p++) {
      if(numbersCount[p] > maxNumber) {
        if(!this.squares[p].isOccupied && immediateAction === false) {
          chosenSquare = p;
          maxNumber = numbersCount[p];
        }
      }
    }

    this.computerOccupySquare(this.squares[chosenSquare]);
    this.progressGame();
  };

  Board.prototype.computerOccupySquare = function(square) {
    const squareUI = document.getElementById('box' + square.index);
    square.isOccupied = true;
    square.occupyingPlayer = game.currentPlayer.playerNumber;
    squareUI.classList.add(game.currentPlayer.boxClass);
    squareUI.style.cursor = 'default';
    board.openSquaresCount--;
  };

  // Checks if the current users occupied squares match any of the win configurations
  Board.prototype.checkForWinner = function() {
    for(let i = 0; i < winConfigs.length; i++) {
      let counter = 0;
      
      for(let j = 0; j < this.squares.length; j++) {
        const currentSquare = this.squares[j];
        if(currentSquare.occupyingPlayer === game.currentPlayer.playerNumber && winConfigs[i].includes(currentSquare.index)) { counter++; }
        if(counter === winConfigs[i].length) { return true; }
      } 
    }
  };

  Board.prototype.progressGame = function() {
    if(this.checkForWinner()) { 
      gameUI.loadWinScreen(game.currentPlayer.winClass, game.currentPlayer.name); 
    } else if(this.openSquaresCount === 0) { 
      gameUI.loadWinScreen('screen-win-tie', null); 
    } else { 
      game.toggleCurrentPlayer(); 
    }
  };

  return Board;
}());