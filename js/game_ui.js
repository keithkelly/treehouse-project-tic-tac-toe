const GameUI = (function() {
  'use strict';

  function GameUI() {
  	this.body = document.querySelector('body');
    this.player1Name = null;
    this.player1Name = null;
  };

  GameUI.prototype.displayNewGameBoard = function() {
    // If player clicks new game button reset the game and player names
    if(game.totalSquaresOccupied > 0) { 
      game = new Game();
      game.player1.name = this.player1Name;
      game.player2.name = this.player2Name;
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
      document.querySelector('.boxes').append(square.listItem);
    }
  };

  GameUI.prototype.displayStartUpPage = function() {
    const self = this;
    let html = '';
    html += '<div class="screen screen-start">';
    html += '<header>';
    html += '<h1>Tic Tac Toe</h1>';
    html += '<a href="#" class="button" id="one-player">One Player Game</a>';
    html += '<a href="#" class="button" id="two-players">Two Player Game</a>';
    html += '</header>';
    html += '</div>';

    this.body.innerHTML = html;

    document.getElementById('one-player').addEventListener('click', function() {
      self.nameInput(1);
      self.startGameButton();

      const input = document.getElementById('player1');
      const button = document.getElementById('start-game');

      input.addEventListener('keyup',function() {
        input.value.length > 0 ? button.removeAttribute('disabled') : button.setAttribute('disabled', 'disabled');
      }, false);
    }, false);

    document.getElementById('two-players').addEventListener('click', function() {
      self.nameInput(1);
      self.nameInput(2);
      self.startGameButton();

      const input1 = document.getElementById('player1');
      const input2 = document.getElementById('player2');
      const button = document.getElementById('start-game');

      input1.addEventListener('keyup',function() {
        input1.value.length > 0 && input2.value.length > 0 ? button.removeAttribute('disabled') : button.setAttribute('disabled', 'disabled');
      }, false);

      input2.addEventListener('keyup',function() {
        input1.value.length > 0 && input2.value.length > 0 ? button.removeAttribute('disabled') : button.setAttribute('disabled', 'disabled');
      }, false);
    }, false);
  };

  GameUI.prototype.displayWinScreen = function(winnerClass, winnerName) {
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
      self.displayNewGameBoard();
    });
  }

  GameUI.prototype.nameInput = function(index) {
    const header = document.querySelector('header');
    const div = document.createElement('div');
    let html = '';

    html += '<label for="player' + index + '">Player ' + index + ' Name</label>';
    html += '<input type="text" id="player' + index + '">';

    div.innerHTML = html;
    div.classList.add('name-input');

    header.append(div);
  };

  GameUI.prototype.startGameButton = function() {
    const self = this;
    const header = document.querySelector('header');
    const button = document.createElement('button');

    button.setAttribute('disabled', 'disabled');
    button.id = 'start-game';
    button.classList.add('button');
    button.innerText = 'Start Game';

    button.addEventListener('click', function() {
      self.player1Name = game.player1.name = document.getElementById('player1').value;
      if(document.getElementById('player2')) {
        self.player2Name = game.player2.name = document.getElementById('player2').value;
      } else {
        self.player2Name = game.player2.name = 'Computer';
      }

      self.displayNewGameBoard();
    }, false);

    header.append(button);
  };

  return GameUI;
}());