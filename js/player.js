const Player = (function() {
	'use strict';

	function Player(svgPath, boxClass, winClass) {
		this.boxClass = boxClass;
    this.name = null;
		this.svg = svgPath;
		this.squaresOccupied = [];
		this.winClass = winClass;
	};

	return Player;
}());