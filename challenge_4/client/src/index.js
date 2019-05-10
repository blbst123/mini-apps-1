import React, { Component } from 'react'
import ReactDOM from 'react-dom';

export default class App extends Component {
  render() {
    return (
      <div>
        <Table />
      </div>
    )
  }
}




class Table extends Component {
  constructor(props) {
    super(props);

    var newBoard = [];
    for (let i = 0; i < 6; i++) {
      newBoard.push(new Array(7).fill(0));
    }
    this.state = {
      board: newBoard,
      player: "red"
    }

    this.changePlayer = this.changePlayer.bind(this);
  }

  updateBoard(row, col, player) {
    let newBoard = this.state.board[row][col] = player;
    this.setState({
      board: newBoard
    });
  }

  changePlayer () {
    let player = this.state.player === 'red' ? 'yellow' : 'red';
    this.setState({
      player: player
    });
  }

  render() {
    var tableCols = [];
    for (let i = 0; i < 7; i++) {
      tableCols.push(<TableCol col={i} />);
    }

    return (
      <div className="table">
        {tableCols}
      </div>
    )
  }
}

class TableCol extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emptySpace: 4
    }
    this.placePiece = this.placePiece.bind(this);
  }

  placePiece() {
    console.log('clicked');
    this.setState({
      emptySpace: this.state.emptySpace - 1
    });
  }

  render() {
    var blocks = [];
    for (let i = 0; i < 6; i++) {
      let occupied = i > this.state.emptySpace;
      blocks.push(<Block position={[this.props.col, i]} occupied={occupied}/>);
    }

    return (
      <div className="board-row">
        <Drop loc={this.props.col} placePiece={this.placePiece}/>
        {blocks}
      </div>
    )
  }
}


class Drop extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dropSpace" onClick={this.props.placePiece}>&#8595;</div>
    )
  }
}

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      occupied: false,
      color: 'yellow'
    }
  }

  render() {
    var block;
    if (this.props.occupied) {
      block = <div className="blockSpace"><div className={`blockCircle ${this.state.color}`}></div></div>
    }
    else {
      block = <div className="blockSpace"><div></div></div>
    }
    return (
      block
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
