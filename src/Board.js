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
      computerPlaying: false,
      message: 'Make your move'
    }
    this.handleBoardClick = this.handleBoardClick.bind(this)
    this.activateAI = this.activateAI.bind(this)
    this.changeTurn = this.changeTurn.bind(this)
    this.threeInRow = this.threeInRow.bind(this)
    this.checkForWin = this.checkForWin.bind(this)
    this.minimax = this.minimax.bind(this)
    this.placeMark = this.placeMark.bind(this)
    this.resetGame = this.resetGame.bind(this)
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
      // a,b,c are index values from a particular win condition
      // game over if a,b,c indexes in the board contain the same
      // values as the current symbol
      const [a,b,c] = winConditions[line]
      if (squares[a] === turn && squares[a] === squares[b] && squares[a] === squares[c]) {
        return true
      }
    }
    return false
  }

  resetGame() {
    this.setState({
      squares: Array(9).fill(null),
      turn: 'X',
      computerSymbol: '',
      computerPlaying: false,
      message: 'Make your move'
    })
    // enables board clicking
    document.getElementById("game-board").removeAttribute("style", "pointer-events: none;")
  }

  changeTurn() {
    let turn = this.state.turn === 'X' ? 'O' : 'X'
    this.setState({turn})
  }

  // changes game message state based upon game conditions
  checkForWin(turn) {
    let gameOver = this.threeInRow(this.state.squares, turn)
    var message
    if (gameOver) {
      message = 'Good job, ' + turn

      // disables board clicking until timeout is finished
      document.getElementById("game-board").setAttribute("style", "pointer-events: none;")

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
    } else if (board.includes(null) === false) {
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
      // finds the corresponding square from board with the index of the best move
      // then passes that square and symbol to place the appropriate mark
      this.placeMark(document.getElementsByClassName('square')[index], playerSymbol)
    }
    return max
  }

  placeMark(targetSquare, symbol) {
    var square = Number(targetSquare.value)
    var symbols = this.state.squares.slice()

    symbols[square] = symbol

    this.setState({squares: symbols})
    this.checkForWin(symbol)
  }

  // handles most functionality of app
  // finds if the square clicked is empty, if it is then
  // appropriate symbol is placed in square and then
  // if computer is activated it plays it's turn based on minimax minimal risk
  handleBoardClick(event) {
    if (event.target.textContent === '' ) {
      this.placeMark(event.target, this.state.turn)
      if (this.state.computerPlaying) {
        // disables board clicking until timeout is finished
        document.getElementById("game-board").setAttribute("style", "pointer-events: none;")

        // wait effect for user experience
        setTimeout(function() {
          this.minimax(this.state.squares, this.state.computerSymbol)

          // enables board clicking
          document.getElementById("game-board").removeAttribute("style", "pointer-events: none;")
        }.bind(this), 1000)
      } else {
        this.changeTurn()
      }
    }
  }

  activateAI() {
    this.setState({computerPlaying: true, computerSymbol: this.state.turn})

    // if nobody has played the computer places mark in random square
    if (this.state.squares.every(i => i === null)) {

      // selects random square and places mark
      // state of turn is used because setState is asynchronous
      this.placeMark(document.getElementsByClassName('square')[Math.floor(Math.random()*9)], this.state.turn)

    } else {

      // state of turn is used because setState is asynchronous
      this.minimax(this.state.squares, this.state.turn)
    }
    this.changeTurn()
  }

  render() {
    return (
      <div>
        <button onClick={this.activateAI} className="header-title controls">Activate unbeatable AI</button>
        <button onClick={this.resetGame} className="header-title controls">Reset Game</button>
        <div id="game-board">
        <h1 className="header-title game-message">{this.state.message}</h1>
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
