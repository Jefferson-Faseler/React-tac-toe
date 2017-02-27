import React from 'react';

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
      turn: 'X',
      computerSymbol: '',
      computerPlaying: false
    }
    this.handleBoardClick = this.handleBoardClick.bind(this)
    this.handleAIClick = this.handleAIClick.bind(this)
    this.changeTurn = this.changeTurn.bind(this)
    this.threeInRow = this.threeInRow.bind(this)
    this.checkForWin = this.checkForWin.bind(this)
    this.minimax = this.minimax.bind(this)
    this.placeMark = this.placeMark.bind(this)
  }

  threeInRow(squares, turn) {
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

  changeTurn(){
    let turn = this.state.turn === 'X' ? 'O' : 'X'
    this.setState({turn})
  }

  checkForWin(turn) {
    let gameOver = this.threeInRow(this.state.squares, turn)
    var message
    if (gameOver) {
      message = 'Good job, ' + turn
    } else if (this.state.squares.includes(null)) {
      message = turn === 'O' ? 'Your turn, X' : 'Go for it, O'
    } else {
      message = "Cat's game"
    }
    this.setState({message})
  }

  minimax(board, playerSymbol, turns = 0) {
    var opponent = playerSymbol === 'X' ? 'O' : 'X'

    if (this.threeInRow(board, opponent)) {
      return -10 + turns
    } else if (!this.state.squares.includes(null)) {
      return 0
    }
    var max = -Infinity
    var index = 0
    for (var i = 0; i < 9; i++) {
      if (board[i] === null) {
        var tempBoard = board.slice()
        tempBoard[i] = playerSymbol
        var moveRating = -this.minimax(tempBoard, opponent, turns + 1)
        if (moveRating > max) {
          max = moveRating
          index = i
        }
      }
    }
    if (turns === 0) {
      this.placeMark(document.getElementsByClassName('square')[index], playerSymbol)
    }
    return max
  }

  placeMark(targetSquare, symbol) {
    if (targetSquare.textContent === '' ) {
      targetSquare.textContent = symbol
      var square = Number(targetSquare.value)
      var symbols = this.state.squares
      symbols[square] = symbol
      this.setState({squares: symbols})
      this.checkForWin(symbol)
    }
  }

  handleBoardClick(event) {
    this.placeMark(event.target, this.state.turn)
    if (this.state.computerPlaying) {
      setTimeout(function() {
        this.minimax(this.state.squares, this.state.computerSymbol)
      }.bind(this), 1000)
    } else {
      this.changeTurn()
    }
  }

  handleAIClick() {
    this.setState({computerPlaying: true, computerSymbol: this.state.turn})
    if (this.state.squares.every(i => i === null)) {
      this.placeMark(document.getElementsByClassName('square')[Math.floor(Math.random()*9)], this.state.turn)
    } else {
      this.minimax(this.state.squares, this.state.turn)
    }
    this.changeTurn()
  }

  render() {
    return (
      <div>
      <div className="game-board">
        <button onClick={this.handleAIClick}>Unbeatable AI</button>
        <div className={"board-row"}>
        <Square value={0} onClick={this.handleBoardClick} symbol={this.state.squares[0]} place={"square left"}/>
        <Square value={1} onClick={this.handleBoardClick} symbol={this.state.squares[1]} place={"square"}/>
        <Square value={2} onClick={this.handleBoardClick} symbol={this.state.squares[2]} place={"square right"}/>
        </div>
        <div className={"board-row center"}>
        <Square value={3} onClick={this.handleBoardClick} symbol={this.state.squares[3]} place={"square left"}/>
        <Square value={4} onClick={this.handleBoardClick} symbol={this.state.squares[4]} place={"square"}/>
        <Square value={5} onClick={this.handleBoardClick} symbol={this.state.squares[5]} place={"square right"}/>
        </div>
        <div className={"board-row"}>
        <Square value={6} onClick={this.handleBoardClick} symbol={this.state.squares[6]} place={"square left"}/>
        <Square value={7} onClick={this.handleBoardClick} symbol={this.state.squares[7]} place={"square"}/>
        <Square value={8} onClick={this.handleBoardClick} symbol={this.state.squares[8]} place={"square right"}/>
        </div>
      </div>
        <h1>{this.state.message}</h1>
      </div>
    )
  }
}

export default Board;
