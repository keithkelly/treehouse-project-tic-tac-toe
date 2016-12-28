const Player = (function() {
	'use strict';

	function Player(svgPath, boxClass, winClass) {
		this.boxClass = boxClass;
		this.svg = svgPath;
		this.squaresOccupied = [];
		this.winClass = winClass;
	};

	return Player;
}());