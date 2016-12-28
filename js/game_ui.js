var GameUI = {
	displayStartUpPage: function() {
		var self = this;
		var body = document.querySelector('body');

		// Build start screen elements
		var container = document.createElement('div');
		var header = document.createElement('header');
		var title = document.createElement('h1');
		var button = 	document.createElement('a');

		// Add element attributes
		container.classList.add('screen', 'screen-start');
		title.innerText = 'Tic Tac Toe';
		button.setAttribute('href', '#');
		button.classList.add('button');
		button.innerText = 'Start game';

		// Add event listeners
		button.addEventListener('click', function() {
			self.displayNewGameBoard();
		});

		// Add start screen elements to the DOM
		header.append(title);
		header.append(button);
		container.append(header);
		body.append(container);
	},
	displayNewGameBoard: function() {
		var body = document.querySelector('body');

		// Build new board elements
		var container = document.createElement('div');
		var header = document.createElement('header');
		var title = document.createElement('h1');
		var headerList = document.createElement('ul');
		var boxesList = document.createElement('ul');
		var listItem1 = document.createElement('li');
		var listItem2 = document.createElement('li');

		// Add element attributes
		container.classList.add('board');
		container.id = 'board';
		title.innerText = 'Tic Tac Toe';
		boxesList.classList.add('boxes');
		listItem1.classList.add('players', 'active');
		listItem1.id = 'player1';
		listItem1.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg>';
		listItem2.classList.add('players');
		listItem2.id = 'player2';
		listItem2.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg>';

		// Add elements to the DOM
		headerList.append(listItem1);
		headerList.append(listItem2);
		header.append(title);
		header.append(headerList);
		container.append(header);
		container.append(boxesList);
		body.innerHTML = '';
		body.append(container);

		new Board(document.querySelector('.boxes'));

		if(game.totalSquaresOccupied > 0) { 
			game = new Game();
		}
	},
	displayWinScreen: function(winnerClass) {
		var self = this;
		var body = document.querySelector('body');

		// Build new board elements
		var container = document.createElement('div');
		var header = document.createElement('header');
		var title = document.createElement('h1');
		var paragraph = document.createElement('p');
		var button = document.createElement('a');

		// Add element attributes
		container.classList.add('screen', 'screen-win', winnerClass);
		container.id = 'finish';
		title.innerText = 'Tic Tac Toe';
		paragraph.classList.add('message');

		if(winnerClass === 'screen-win-tie') {
			paragraph.innerText = 'It\'s a Tie!';
		} else {
			paragraph.innerText = 'Winner!';
		}

		button.setAttribute('href', '#');
		button.classList.add('button');
		button.id = 'start';
		button.innerText = 'New Game';

		// Add event listeners
		button.addEventListener('click', function() {
			self.displayNewGameBoard();
		});

		header.append(title);
		header.append(paragraph);
		header.append(button);
		container.append(header);
		body.innerHTML = '';
		body.append(container);
	}
};