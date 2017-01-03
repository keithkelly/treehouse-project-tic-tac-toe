!function() {
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

  function Game() {
    this.player1 = new Player(1, 'img/o.svg', 'box-filled-1', 'screen-win-one');
    this.player2 = new Player(2, 'img/x.svg', 'box-filled-2', 'screen-win-two');
    this.currentPlayer = this.player1;
  };

  function GameUI() {
    this.body = document.querySelector('body');
    this.playerOneName = null;
    this.playerTwoName = null;
    this.computerPlayer = false;
  }

  function Player(playerNumber, svg, boxClass, winClass) {
    this.boxClass = boxClass;
    this.isComputer = false;
    this.name = null;
    this.playerNumber = playerNumber;
    this.svg = svg;
    this.winClass = winClass;
  };

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

  GameUI.prototype.loadStartPage = function() {
    const self = this;

    // Build HTML
    let html = '';
    html += '<div class="screen screen-start">';
    html += '<header>';
    html += '<h1>Tic Tac Toe</h1>';
    html += '<a href="#" class="button" id="one-player">One Player Game</a>';
    html += '<a href="#" class="button" id="two-players">Two Player Game</a>';
    html += '<div id="name-inputs"></div>';
    html += '</header>';
    html += '</div>';
    this.body.innerHTML = html;

    // Set up player names when the single player or two player buttons are pressed
    document.getElementById('one-player').addEventListener('click', function() { self.playerNameSetup(1); }, false);
    document.getElementById('two-players').addEventListener('click', function() { self.playerNameSetup(2); }, false);
  };

  GameUI.prototype.loadNewGameBoard = function() {
    // If there was a previous game, reset the game
    if(board.openSquaresCount < 9) { 
      game = new Game();
      board = new Board();
      game.player1.name = this.playerOneName;
      game.player2.name = this.playerTwoName;
      game.player2.isComputer = this.computerPlayer;
    }
    
    // Build HTML
    let html = '';
    html += '<div class="board" id="board">';
    html += '<header>';
    html += '<h1>Tic Tac Toe</h1>';
    html += '<ul>';
    html += '<li class="players active" id="player1">' + game.player1.name + '</li>';
    html += '<li class="players" id="player2">' + game.player2.name + '</li>';
    html += '</ul>';
    html += '</header>';
    html += '<ul class="boxes"></ul>';
    html += '</div>';
    this.body.innerHTML = html;

    board.loadNewBoard();
  };

  GameUI.prototype.loadWinScreen = function(winnerClass, winnerName) {
    const self = this;
    
    // Build HTML
    let html = '';
    html += '<div class="screen screen-win ' + winnerClass + '" id="finish">';
    html += '<header>';
    html += '<h1>Tic Tac Toe</h1>';
    html += '<p class="message">';

    // Show the proper message depending on the outcome
    if(winnerClass === 'screen-win-tie') {
      html += 'It\'s a Tie!';
    } else {
      html += winnerName + ' is the Winner!';
    }

    html += '</p>';
    html += '<a href="#" class="button" id="start">New Game</a>';
    html += '</header>';
    html += '</div>';
    this.body.innerHTML = html;

    // Load new game board when the new game button is clicked
    document.getElementById('start').addEventListener('click', function() {
      self.loadNewGameBoard();
    });
  },

  // Get and set player names from the start page
  GameUI.prototype.playerNameSetup = function(playerCount) {
    const self = this;
    const nameInputs = document.getElementById('name-inputs');

    // Build HTML
    let html = '';
    html += '<label for="player1">Player 1 Name</label>';
    html += '<input type="text" id="player1">';
    if(playerCount === 2) {
      html += '<label for="player2">Player 2 Name</label>';
      html += '<input type="text" id="player2">';
    }
    html += '<button class="button" id="start-game" disabled>Start Game</button>'
    nameInputs.innerHTML = html;

    const button = document.getElementById('start-game');
    const input1 = document.getElementById('player1');
    const input2 = document.getElementById('player2');

    // Set the names and load a new board when clicked
    button.addEventListener('click', function() {
      // Set player names on this object and on the game
      // The name is set on this object so when the game is reset they are still accessible
      self.playerOneName = game.player1.name = document.getElementById('player1').value;
      if(document.getElementById('player2')) {
        self.playerTwoName = game.player2.name = document.getElementById('player2').value;
      } else {
        self.playerTwoName = game.player2.name = 'Computer';
        self.computerPlayer = game.player2.isComputer = true;
      }
      self.loadNewGameBoard();
    }, false);

    // If there all inputs have values, enable the new game button
    input1.addEventListener('keyup',function() {
      if(playerCount === 2) {
        input1.value.length > 0 && input2.value.length > 0 ? button.removeAttribute('disabled') : button.setAttribute('disabled', 'disabled');
      } else {
        input1.value.length > 0 ? button.removeAttribute('disabled') : button.setAttribute('disabled', 'disabled');
      }
    }, false);

    if(playerCount === 2) {
      input2.addEventListener('keyup',function() {
        input1.value.length > 0 && input2.value.length > 0 ? button.removeAttribute('disabled') : button.setAttribute('disabled', 'disabled');
      }, false);
    }
  },

  Square.prototype.occupySquare = function() {
    this.isOccupied = true;
    this.occupyingPlayer = game.currentPlayer.playerNumber;
    this.square.classList.add(game.currentPlayer.boxClass);
    this.square.style.backgroundImage = '';
    this.square.style.cursor = 'default';
    board.openSquaresCount--;
  }

  // Initiate app
  let game = new Game();
  let board = new Board();
  let gameUI = new GameUI();
  gameUI.loadStartPage();
}();