const gameUI = {
  body: document.querySelector('body'),
  playerOneName: null,
  playerTwoName: null,
  computerPlayer: false,

  loadStartPage: function() {
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
  },

  loadNewGameBoard: function() {
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
  },

  loadWinScreen: function(winnerClass, winnerName) {
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
  playerNameSetup: function(playerCount) {
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
};