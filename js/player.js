const Player = (function() {
  'use strict';

  function Player(playerNumber, svg, boxClass, winClass) {
    this.boxClass = boxClass;
    this.isComputer = false;
    this.name = null;
    this.playerNumber = playerNumber;
    this.svg = svg;
    this.winClass = winClass;
  };

  return Player;
}());