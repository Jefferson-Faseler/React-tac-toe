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
      currentSymbol: 'X',
      computerSymbol: '',
      computerPlaying: false,
      message: 'Make your move'
    }
    this.resetGame = this.resetGame.bind(this)
    this.changeTurn = this.changeTurn.bind(this)
    this.startX = this.startX.bind(this)
    this.startO = this.startO.bind(this)
    this.threeInRow = this.threeInRow.bind(this)
    this.checkForWin = this.checkForWin.bind(this)
    this.enableBoard = this.enableBoard.bind(this)
    this.disableBoard = this.disableBoard.bind(this)
    this.placeMark = this.placeMark.bind(this)
    this.activateAI = this.activateAI.bind(this)
    this.handleBoardClick = this.handleBoardClick.bind(this)
    this.handleAIClick = this.handleAIClick.bind(this)
    this.waitEffectForUserExperience = this.waitEffectForUserExperience.bind(this)
    this.placeComputerMark = this.placeComputerMark.bind(this)
    this.minimax = this.minimax.bind(this)
  }


  resetGame() {
    this.setState({
      squares: Array(9).fill(null),
      currentSymbol: 'X',
      computerSymbol: '',
      computerPlaying: false,
      message: 'Make your move'
    })
    // enables board clicking
    document.getElementById("game-board").removeAttribute("style", "pointer-events: none;")
  }


  changeTurn() {
    let currentSymbol = this.state.currentSymbol === 'X' ? 'O' : 'X'
    this.setState({currentSymbol})
  }


  startX() {
    this.setState({currentSymbol: 'X'})
  }

  startO() {
    this.setState({currentSymbol: 'O'})
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
      // a,b,c are index values from a particular win condition
      // game over if a,b,c indexes in the board contain the same
      // values as the current symbol
      const [a,b,c] = winConditions[line]
      if (squares[a] === currentSymbol && squares[a] === squares[b] && squares[a] === squares[c]) {
        return true
      }
    }
    return false
  }


  // changes game message state based upon game conditions
  checkForWin(currentSymbol) {
    let gameOver = this.threeInRow(this.state.squares, currentSymbol)
    var message
    if (gameOver) {
      message = 'Good job, ' + currentSymbol

      this.disableBoard()

    } else if (this.state.squares.includes(null)) {
      message = currentSymbol === 'O' ? 'Your turn, X' : 'Go for it, O'
    } else {
      message = "Cat's game"
    }
    this.setState({message})
  }


  enableBoard() {
    document.getElementById("game-board").removeAttribute("style", "pointer-events: none;")
  }

  disableBoard() {
    document.getElementById("game-board").setAttribute("style", "pointer-events: none;")
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

      // if nobody has played the computer places mark in random square
      if (this.state.squares.every(i => i === null)) {

        // selects random square and places mark
        // state of currentSymbol is used because setState is asynchronous
        this.placeMark(document.getElementsByClassName('square')[Math.floor(Math.random()*9)], this.state.currentSymbol)

      } else {

        // state of currentSymbol is used because setState is asynchronous
        this.handleAIClick()
      }
      this.changeTurn()
    }
  

  // finds if the square clicked is empty, if it is
  // appropriate symbol is placed in square and
  // hands turn off to other player or computer
  handleBoardClick(event) {
    if (event.target.textContent === '' ) {
      this.placeMark(event.target, this.state.currentSymbol)
      if (this.state.computerPlaying) {
        this.handleAIClick()
      } else {
        this.changeTurn()
      }
    }
  }


  handleAIClick() {
    if (this.state.squares.includes(null)) {
      this.disableBoard()
      this.waitEffectForUserExperience(function() {
        var index = this.minimax(this.state.squares, this.state.computerSymbol).index
        this.placeComputerMark(index)
        this.enableBoard()
      }.bind(this))
    }
  }


  waitEffectForUserExperience(effectThatBenefitsFromWaitExperience) {
    setTimeout(function() {
      effectThatBenefitsFromWaitExperience();
    }.bind(this), 1000)
  }


  placeComputerMark(index) {
    this.placeMark(document.getElementsByClassName('square')[index], this.state.computerSymbol)
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


  render() {
    var chooseSymbol

    if (!this.state.squares.includes('X') && !this.state.squares.includes('O')) {
      chooseSymbol = (
      <div>
        <a href="javascript:void(0)" onClick={this.startX} className="header-title controls">Play as X</a>
        <a href="javascript:void(0)" onClick={this.startO} className="header-title controls">Play as O</a>
      </div>
      )
    }

    return (
      <div>
        <a href="javascript:void(0)" onClick={this.activateAI} className="header-title controls">Activate unbeatable AI</a>
        <a href="javascript:void(0)" onClick={this.resetGame} className="header-title controls">Reset Game</a>
        {chooseSymbol}
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
