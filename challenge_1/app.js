// PLAYER CREATION
class Player {
  constructor(symbol) {
    this.symbol = symbol;
  }
}

var PlayerX = new Player('X');
var PlayerO = new Player('O');

// BOARD INITIALIZATION
class Board {
  constructor() {
    this.currentPlayer = PlayerX;

    this.pieces = [['0', '1', '2'],['3', '4', '5'],['6', '7', '8']];
    this.gameRunning = true;
    this.piecesPlaced = 0;
  }

  makeMove(location, symbol) {
    let row = Math.floor(location / 3);
    let col = location % 3;

    this.pieces[row][col] = symbol;
    this.piecesPlaced++;

    if (this.checkWin(symbol)) {
      this.gameRunning = false;
      this.piecesPlaced = 0;
      document.getElementById("winner").innerHTML = "Game Won!! Congrats Player" + this.currentPlayer.symbol;
    }
    else {
      if (this.piecesPlaced === 9) {
        this.gameRunning = false;
        this.piecesPlaced = 0;
        document.getElementById("winner").innerHTML = 'Draw';
      }
      else {
        this.swapPlayers();
      }
    }
  }

  swapPlayers() {
    if (this.currentPlayer.symbol === 'X') {
      this.currentPlayer = PlayerO;
      document.getElementById("turn").innerHTML = this.currentPlayer.symbol;
    }
    else {
      this.currentPlayer = PlayerX;
      document.getElementById("turn").innerHTML = this.currentPlayer.symbol;
    }
  }

  checkWin(symbol) {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (this.pieces[i][0] === symbol && this.pieces[i][1] === symbol && this.pieces[i][2] === symbol) {
        return true;
      }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (this.pieces[0][i] === symbol && this.pieces[1][i] === symbol && this.pieces[2][i] === symbol) {
        return true;
      }
    }
    // Check major diagonal
    if (this.pieces[0][0] === symbol && this.pieces[1][1] === symbol && this.pieces[2][2] === symbol) {
      return true;
    }
    // Check minor diagonal
    if (this.pieces[0][2] === symbol && this.pieces[1][1] === symbol && this.pieces[2][0] === symbol) {
      return true;
    }
    return false;
  }

  resetGame() {
    this.pieces = [['1', '2', '3'],['4', '5', '6'],['7', '8', '9']];
    this.currentPlayer = PlayerX;
    this.gameRunning = true;
    var locations = document.getElementsByClassName("location");
    for (let i = 0; i < locations.length; i++) {
      locations[i].innerHTML = '';
    }

    document.getElementById("winner").innerHTML = 'Game still running';
  }
}

var board = new Board();

var makeMove = function (event) {
  if (board.gameRunning) {
    event.innerHTML = board.currentPlayer.symbol;
    board.makeMove(event.id, board.currentPlayer.symbol);
  }
  else {
    // alert("Please reset game to try again.");
  }
}

var resetGame = function () {
  board.resetGame();
}

// document.getElementByClass("location").onclick = function() {myFunction()};