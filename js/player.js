const Player = (function() {
  'use strict';

  function Player(svg, boxClass, winClass) {
    this.boxClass = boxClass;
    this.name = null;
    this.squaresOccupied = [];
    this.svg = svg;
    this.winClass = winClass;
  };

  return Player;
}());