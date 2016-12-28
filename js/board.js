var Board = (function() {
	'use strict';

	// Board constructor
	// Pass in the element where the board squares are appended
	function Board(list) {
		for(var i = 1; i < 10; i++) {
			var square = new Square(i);
			list.append(square.listItem);
		}
	};

	return Board;
}());