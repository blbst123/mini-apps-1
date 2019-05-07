// PLAYER CREATION
class Player {
  constructor(symbol, name) {
    this.symbol = symbol;
    this.name = name;
    this.score = 0;

    document.getElementById("playerName" + symbol).innerHTML = `Player ${name} (Symbol ${symbol}): `;
  }

  updateScore() {
    this.score++;
  }
}

// BOARD INITIALIZATION
class Board {
  constructor() {

    let name1 = prompt("Please enter your name Player 1:", "X");
    let name2 = prompt("Please enter your name Player 2:", "O");

    this.PlayerX = new Player('X', name1);
    this.PlayerO = new Player('O', name2);

    this.currentPlayer = this.PlayerX;
    this.startingPlayer = this.PlayerX;

    this.pieces = [['', '', ''], ['', '', ''], ['', '', '']];
    this.gameRunning = true;
    this.piecesPlaced = 0;
    this.rotating = false;
    this.currentRotation = 1;
    this.pause = false;
  }

  makeMove(event) {
    console.log(this.currentRotation);
    if (this.rotating || this.pause) return;
    this.pause = true;

    let location = event.id;
    let symbol = this.currentPlayer.symbol;

    let row = Math.floor(location / 3);
    let col = location % 3;

    if (this.pieces[row][col] !== '') {
      return;
    }
    event.innerHTML = this.currentPlayer.symbol;
    this.pieces[row][col] = symbol;
    this.piecesPlaced++;

    // If game is won on move
    if (this.checkWin(symbol)) {
      this.gameRunning = false;
      this.piecesPlaced = 0;
      this.currentPlayer.updateScore();
      this.startingPlayer = this.currentPlayer;
      document.getElementById("score" + this.currentPlayer.symbol).innerHTML = this.currentPlayer.score;
      document.getElementById("winner").innerHTML = "Game Won!! Congrats Player " + this.currentPlayer.symbol;
    }
    else {
      // If game is drawn on move
      if (this.piecesPlaced === 9) {
        this.gameRunning = false;
        this.piecesPlaced = 0;
        document.getElementById("winner").innerHTML = 'Draw';
      }
      else {
        this.pause = false;
        this.rotateBoard();
        this.swapPlayers();
      }
    }
  }

  swapPlayers() {
    if (this.currentPlayer.symbol === 'X') {
      this.currentPlayer = this.PlayerO;
      document.getElementById("turn").innerHTML = this.currentPlayer.symbol;
    }
    else {
      this.currentPlayer = this.PlayerX;
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
    this.pieces = [['', '', ''], ['', '', ''], ['', '', '']];
    this.currentPlayer = this.startingPlayer;
    this.gameRunning = true;
    this.pause = false;
    this.currentRotation = 1;
    this.renderScreen();

    // Remove all classes from board
    var classes = document.getElementById("board").classList;
    for (let i = 0; i < classes.length; i++) {
      document.getElementById("board").classList.remove(classes[i]);
    }
    document.getElementById("winner").innerHTML = 'Game Running';
  }

  rotateBoard() {
    if (this.rotating) return;
    document.getElementById("board").className = "rotateTable" + this.currentRotation;
    this.rotating = true;
    setTimeout(() => {
      this.gravityDrop();
      setTimeout(() => {
        this.renderScreen();
        this.rotating = false;
      }, 300);
    }, 1500);
  }

  // GRAVITY DROP FUNCTIONS
  gravityDrop() {
    // Drop to the right
    if (this.currentRotation === 1) {
      for (let row = 0; row < 3; row++) {
        this.dropRight(row, 1);
        this.dropRight(row, 0);
      }
      this.currentRotation++;
    }
    else if (this.currentRotation === 2) {
      for (let col = 0; col < 3; col++) {
        this.dropUp(1, col);
        this.dropUp(2, col);
      }
      this.currentRotation++;
    }
    else if (this.currentRotation === 3) {
      for (let row = 0; row < 3; row++) {
        this.dropLeft(row, 1);
        this.dropLeft(row, 2);
      }
      this.currentRotation++;
    }
    else {
      for (let col = 0; col < 3; col++) {
        this.dropDown(1, col);
        this.dropDown(0, col);
      }
      this.currentRotation = 1;
    }
  }

  dropRight(row, col) {
    if (col <= 1 && this.pieces[row][col + 1] === '') {
      this.pieces[row][col + 1] = this.pieces[row][col];
      this.pieces[row][col] = '';
      this.dropRight(row, col + 1);
    }
  }

  dropUp(row, col) {
    if (row >= 1 && this.pieces[row - 1][col] === '') {
      this.pieces[row - 1][col] = this.pieces[row][col];
      this.pieces[row][col] = '';
      this.dropUp(row - 1, col);
    }
  }

  dropLeft(row, col) {
    if (col >= 1 && this.pieces[row][col - 1] === '') {
      this.pieces[row][col - 1] = this.pieces[row][col];
      this.pieces[row][col] = '';
      this.dropLeft(row, col - 1);
    }
  }

  dropDown(row, col) {
    if (row <= 1 && this.pieces[row + 1][col] === '') {
      this.pieces[row + 1][col] = this.pieces[row][col];
      this.pieces[row][col] = '';
      this.dropDown(row + 1, col);
    }
  }

  renderScreen() {
    for (let row = 0; row < this.pieces.length; row++) {
      for (let col = 0; col < this.pieces[row].length; col++) {
        let id = row * 3 + col;
        document.getElementById(`${id}`).innerHTML = this.pieces[row][col];
      }
    }
  }
}

var board = new Board();