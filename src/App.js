import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Square(props) {
  return (
    <button onClick={props.onClick} value={props.value} className={props.place}>{props.symbol}</button>
  )
}

class Board extends React.Component {
  constructor() {
    super()
    this.state = {
      squares: Array(9).fill(null),
    }
    this.handleClick = this.handleClick.bind(this)
    this.checkForWin = this.checkForWin.bind(this)
    this.minimax = this.minimax.bind(this)
  }

  checkForWin(squares, turn) {
    const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ]
    for (var line = 0; line < winConditions.length; line++) {
      const [a,b,c] = winConditions[line]
      if (squares[a] === turn && squares[a] === squares[b] && squares[a] === squares[c]) {
        return true
      }
    }
    return false
  }

  minimax(board, player) {
    if (this.props.computerPlaying) {
      var emptySquares = board.filter(s => s != "O" && s != "X")

      if (emptySquares.length === 0){
        return {score:0};
      } else if (this.checkForWin(board, 'O')){
         return {score:-10};
      } else if (this.checkForWin(board, 'X')){
        return {score:10};
      }
      
      var moves = []

      for (var i = 0; i < emptySquares.length; i++) {
        var move = {};
        newBoard[emptySquares[i]] = player

        if (player === 'X') {
          var result = minimax(board, 'X')
          move.score = result.score
        } else {
          var result = minimax(board, 'O')
          move.score = result.score
        }
          moves.push(move)
      }
    }
  }

  handleClick(event) {
    var turn = this.props.xIsNext ? 'X' : 'O'
    if (event.target.textContent === '' ) {
      event.target.textContent = turn
      var square = Number(event.target.value)
      var symbols = this.state.squares
      symbols[square] = turn
      this.setState({squares: symbols})
    }
    minimax(this.state.squares, 'X')
    let gameOver = this.checkForWin(this.state.squares, turn)
    if (gameOver) {
      let message = 'Good job, ' + turn
    } else {
      let message = !this.state.xIsNext ? 'Your turn, X' : 'Go for it, O'
    }
    this.props.onEachClick(message)
  }

  render() {
    return (
      <div>
      <div className="game-board">
        <div className={"board-row"}>
        <Square value={0} onClick={this.handleClick} symbol={this.state.squares[0]} place={"square left"}/>
        <Square value={1} onClick={this.handleClick} symbol={this.state.squares[1]} place={"square"}/>
        <Square value={2} onClick={this.handleClick} symbol={this.state.squares[2]} place={"square right"}/>
        </div>
        <div className={"board-row center"}>
        <Square value={3} onClick={this.handleClick} symbol={this.state.squares[3]} place={"square left"}/>
        <Square value={4} onClick={this.handleClick} symbol={this.state.squares[4]} place={"square"}/>
        <Square value={5} onClick={this.handleClick} symbol={this.state.squares[5]} place={"square right"}/>
        </div>
        <div className={"board-row"}>
        <Square value={6} onClick={this.handleClick} symbol={this.state.squares[6]} place={"square left"}/>
        <Square value={7} onClick={this.handleClick} symbol={this.state.squares[7]} place={"square"}/>
        <Square value={8} onClick={this.handleClick} symbol={this.state.squares[8]} place={"square right"}/>
        </div>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      computerPlaying: false,
      xIsNext: true,
      message: 'Make your move'
    }
    this.eachClick = this.eachClick.bind(this)
  }

  eachClick(message) {
    let turn = !this.state.xIsNext
    this.setState({xIsNext: turn, message})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="header-title">React-tac-toe</h2>
        </div>
        <div>
          <Board
          onEachClick={this.eachClick}
          computerPlaying={this.state.computerPlaying}
          xIsNext={this.state.xIsNext}
          />
        </div>
        </div>
        <h1>{this.state.message}</h1>
        </div>
      </div>
    );
  }
}

export default App;
