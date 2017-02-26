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
      computerSymbol: '',
      computerPlaying: false
    }
    this.handleBoardClick = this.handleBoardClick.bind(this)
    this.handleAIClick = this.handleAIClick.bind(this)
    this.threeInRow = this.threeInRow.bind(this)
    this.checkForWin = this.threeInRow.bind(this)
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

  checkForWin(turn) {
    var message
    let gameOver = this.threeInRow(this.state.squares, turn)
    if (gameOver) {
      message = 'Good job, ' + turn
    } else {
      if (this.state.squares.includes(null)) {
      message = !this.state.xIsNext ? 'Your turn, X' : 'Go for it, O'
    } else {
      message = "Cat's game"
    }
    }
    return message
  }

  minimax(board, playerSymbol, turns = 0) {
    var opponent = playerSymbol === 'X' ? 'O' : 'X'

    if (this.threeInRow(board, opponent)) {
      return -10 + turns
    } else if (!this.state.squares.includes(null)) {
      return 0
    }
    var max = -100
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
      // values.index[Math.floor(Math.random()*moves.length)]
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
    }
  }

  handleBoardClick(event) {
    this.placeMark(event.target, this.props.turn)
    this.props.onChangeTurn(this.checkForWin(this.props.turn))
    if (this.state.computerPlaying) {
      this.minimax(this.state.squares, this.state.computerSymbol)
    }
  }

  handleAIClick() {
    this.setState({computerPlaying: true, computerSymbol: this.state.xIsNext ? 'X' : 'O'})
    if (this.state.squares.every(i => i === null)) {
      this.placeMark(document.getElementsByClassName('square')[Math.floor(Math.random()*9)], this.state.computerSymbol)
      this.props.onChangeTurn(this.checkForWin(this.props.turn))
    }
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
      </div>
    )
  }
}

export default Board;
