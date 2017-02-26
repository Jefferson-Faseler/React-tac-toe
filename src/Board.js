import React, { Component } from 'react';

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
      board[emptySquares[i]] = player

      if (player === 'X') {
        var result = this.minimax(board, 'X')
        move.score = result.score
      } else {
        var result = this.minimax(board, 'O')
        move.score = result.score
      }
        moves.push(move)
    }
    return this.bestMove(moves, player)
  }

  bestMove(moves, player) {
    var bestMove;
      if(player === 'X'){
        var bestScore = -10000;
        for(var i = 0; i < moves.length; i++){
          if(moves[i].score > bestScore){
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      }else{

        var bestScore = 10000;
        for(var i = 0; i < moves.length; i++){
          if(moves[i].score < bestScore){
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      }
    return moves[bestMove];
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
    if (this.props.computerPlaying) {
      var computerMove = this.minimax(this.state.squares, 'X')
    }
    let gameOver = this.checkForWin(this.state.squares, turn)
    if (gameOver) {
      var message = 'Good job, ' + turn
    } else {
      var message = !this.state.xIsNext ? 'Your turn, X' : 'Go for it, O'
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
      </div>
      </div>
    )
  }
}

export default Board;
