const gameUI = {
  // Set properties
  body: document.querySelector('body'),
  playerOneName: null,
  playerTwoName: null,

  loadStartPage: function() {
    const self = this;
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
    document.getElementById('one-player').addEventListener('click', function() { self.playerNameSetup(1); }, false);
    document.getElementById('two-players').addEventListener('click', function() { self.playerNameSetup(2); }, false);
  },

  setPlayerNames: function() {
    this.playerOneName = game.player1.name = document.getElementById('player1').value;
    if(document.getElementById('player2')) {
      this.playerTwoName = game.player2.name = document.getElementById('player2').value;
    } else {
      this.playerTwoName = game.player2.name = 'Computer';
    }
  },

  playerNameSetup: function(playerCount) {
    const self = this;
    const nameInputs = document.getElementById('name-inputs');
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

    button.addEventListener('click', function() {
      self.setPlayerNames();
      self.loadNewGameBoard();
    }, false);

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

  loadNewGameBoard: function() {
    if(game.totalSquaresOccupied > 0) { 
      game = new Game();
      game.player1.name = this.playerOneName;
      game.player2.name = this.playerTwoName;
    }
    
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

    // Generate a new set of squares
    for(var i = 1; i <= 9; i++) {
      var square = new Square(i);
      document.querySelector('.boxes').append(square.square);
    }
  },

  loadWinScreen: function(winnerClass, winnerName) {
    const self = this;
    
    let html = '';
    html += '<div class="screen screen-win ' + winnerClass + '" id="finish">';
    html += '<header>';
    html += '<h1>Tic Tac Toe</h1>';
    html += '<p class="message">';

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

    document.getElementById('start').addEventListener('click', function() {
      self.loadNewGameBoard();
    });
  }
};