// PLAYER CREATION
class Player {
  constructor() {
    this.pieces = { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false };
  }

  makeMove(location) {
    this.pieces[location] = true;
  }

  checkWin() {
    // TODO: check if player has any winning positions
  }
}

var PlayerX = new Player;
var PlayerY = new Player;

