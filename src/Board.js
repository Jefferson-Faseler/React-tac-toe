import React from 'react';
import Square from './Square';

class Board extends React.Component {
  constructor() {
    super()
    this.state = {
      squares: Array(9).fill(null),
      currentSymbol: 'X',
      computerSymbol: '',
      computerPlaying: false,
      message: 'Make your move'
    }
    this.startX = this.startX.bind(this)
    this.startO = this.startO.bind(this)
    this.minimax = this.minimax.bind(this)
    this.resetGame = this.resetGame.bind(this)
    this.placeMark = this.placeMark.bind(this)
    this.emptyBoard = this.emptyBoard.bind(this)
    this.changeTurn = this.changeTurn.bind(this)
    this.threeInRow = this.threeInRow.bind(this)
    this.activateAI = this.activateAI.bind(this)
    this.emptySquare = this.emptySquare.bind(this)
    this.enableBoard = this.enableBoard.bind(this)
    this.checkForWin = this.checkForWin.bind(this)
    this.disableBoard = this.disableBoard.bind(this)
    this.handleAIClick = this.handleAIClick.bind(this)
    this.updateMessage = this.updateMessage.bind(this)
    this.handleBoardClick = this.handleBoardClick.bind(this)
    this.placeComputerMark = this.placeComputerMark.bind(this)
    this.emptySquareOnBoard = this.emptySquareOnBoard.bind(this)
    this.waitEffectForUserExperience = this.waitEffectForUserExperience.bind(this)
  }

  startX() {
    this.setState({currentSymbol: 'X'})
  }

  startO() {
    this.setState({currentSymbol: 'O'})
  }

  placeMark(targetSquare, symbol) {
    var square = Number(targetSquare.value)
    var symbols = this.state.squares

    symbols[square] = symbol

    this.setState({squares: symbols})
    this.checkForWin(symbol)
  }

  activateAI() {
    this.setState({computerPlaying: true, computerSymbol: this.state.currentSymbol})
    if (this.emptyBoard()) {
      this.placeMark(this.findSquare(Math.floor(Math.random()*9)), this.state.currentSymbol)
    } else {
      this.handleAIClick()
    }
    this.changeTurn()
  }

  changeTurn() {
    let currentSymbol = this.state.currentSymbol === 'X' ? 'O' : 'X'
    this.setState({currentSymbol})
  }


  resetGame() {
    this.setState({
      squares: Array(9).fill(null),
      currentSymbol: 'X',
      computerSymbol: '',
      computerPlaying: false,
      message: 'Make your move'
    })
    this.enableBoard()
  }

  threeInRow(squares, currentSymbol) {
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
      if ([squares[a], squares[b], squares[c]].every((sq)=> { return sq === currentSymbol })) {
        return true
      }
    }
    return false
  }

  handleBoardClick(event) {
    if (this.emptySquare(event.target)) {
      this.placeMark(event.target, this.state.currentSymbol)
      if (this.state.computerPlaying) {
        this.handleAIClick()
      } else {
        this.changeTurn()
      }
    }
  }

  handleAIClick() {
    if (this.emptySquareOnBoard()) {
      this.disableBoard()
      this.waitEffectForUserExperience(() => {
        var index = this.minimax(this.state.squares, this.state.computerSymbol).index
        this.placeComputerMark(index)
        this.enableBoard()
      })
    }
  }

  minimax(board, playerSymbol, turns = 0) {
    var opponent = playerSymbol === 'X' ? 'O' : 'X'

    if (this.threeInRow(board, opponent)) {
      return {max: -10 + turns}
    } else if (board.includes(null) === false) {
      return {max: 0}
    }
    var bestMove = {
      max: -Infinity,
      index: 0
    }
    for (var i = 0; i < 9; i++) {
      if (board[i] === null) {
        var tempBoard = board.slice()
        tempBoard[i] = playerSymbol
        var moveRating = -this.minimax(tempBoard, opponent, turns + 1).max
        if (moveRating > bestMove.max) {
          bestMove.max = moveRating
          bestMove.index = i
        }
      }
    }
    return bestMove
  }


  checkForWin(currentSymbol) {
    var gameOver = this.threeInRow(this.state.squares, currentSymbol)
    var message = this.updateMessage(gameOver, currentSymbol)
    this.setState({message})
  }

  updateMessage(gameOver, currentSymbol) {
    if (gameOver) {
      this.disableBoard()
      return 'Good job, ' + currentSymbol
    } else if (this.emptySquareOnBoard()) {
      return currentSymbol === 'O' ? 'Your turn, X' : 'Go for it, O'
    } else {
      return "Cat's game"
    }
  }


  enableBoard() {
    document.getElementById("game-board").removeAttribute("style", "pointer-events: none;")
  }

  disableBoard() {
    document.getElementById("game-board").setAttribute("style", "pointer-events: none;")
  }

  emptyBoard() {
    return this.state.squares.every(i => i === null)
  }

  emptySquareOnBoard() {
    return this.state.squares.includes(null)
  }

  emptySquare(square) {
    return square.textContent === ''
  }

  waitEffectForUserExperience(effectThatBenefitsFromWaitExperience) {
    setTimeout(() => {
      effectThatBenefitsFromWaitExperience();
    }, 1000)
  }

  placeComputerMark(index) {
    this.placeMark(this.findSquare(index), this.state.computerSymbol)
  }

  findSquare(position) {
    return document.getElementsByClassName('square')[position]
  }


  render() {
    var chooseSymbol

    if (this.emptyBoard()) {
      chooseSymbol = (
        <div>
          <a onClick={this.startX} className="header-title controls">Play as X</a>
          <a onClick={this.startO} className="header-title controls">Play as O</a>
        </div>
      )
    }

    return (
      <div>
        <a onClick={this.activateAI} className="header-title controls">Activate unbeatable AI</a>
        <a onClick={this.resetGame} className="header-title controls">Reset Game</a>
        { chooseSymbol }
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
