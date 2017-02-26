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
      squares: Array(9).fill(0),
      symbols: Array(9).fill(null),
      message: 'Make your move'
    }
    this.handleClick = this.handleClick.bind(this)
    this.checkForWin = this.checkForWin.bind(this)
  }

  checkForWin() {
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
      if (this.state.symbols[a] && this.state.symbols[a] === this.state.symbols[b] && this.state.symbols[a] === this.state.symbols[c]) {
        return true
      }
    }
    return false
  }

  handleClick(event) {
    var turn = this.props.xIsNext ? 'X' : 'O'
    if (event.target.textContent === '' ) {
      event.target.textContent = turn
      var square = Number(event.target.value)
      var symbols = this.state.symbols
      symbols[square] = turn
      this.setState({symbols: symbols})
    }
    this.props.onEachClick()
    let message = this.checkForWin()
    if (message) {
      this.setState({message: 'Good job, ' + turn})
    } else {
      this.setState({message: !this.props.xIsNext ? 'Your turn, X' : 'Go for it, O'})
    }
  }

  render() {
    return (
      <div>
      <div className="game-board">
        <div className={"board-row"}>
        <Square value={0} onClick={this.handleClick} symbol={this.state.symbols[0]} place={"square left"}/>
        <Square value={1} onClick={this.handleClick} symbol={this.state.symbols[1]} place={"square"}/>
        <Square value={2} onClick={this.handleClick} symbol={this.state.symbols[2]} place={"square right"}/>
        </div>
        <div className={"board-row center"}>
        <Square value={3} onClick={this.handleClick} symbol={this.state.symbols[3]} place={"square left"}/>
        <Square value={4} onClick={this.handleClick} symbol={this.state.symbols[4]} place={"square"}/>
        <Square value={5} onClick={this.handleClick} symbol={this.state.symbols[5]} place={"square right"}/>
        </div>
        <div className={"board-row"}>
        <Square value={6} onClick={this.handleClick} symbol={this.state.symbols[6]} place={"square left"}/>
        <Square value={7} onClick={this.handleClick} symbol={this.state.symbols[7]} place={"square"}/>
        <Square value={8} onClick={this.handleClick} symbol={this.state.symbols[8]} place={"square right"}/>
        </div>
      </div>
      <h1>{this.state.message}</h1>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      computerPlaying: false,
      xIsNext: true
    }
    this.eachClick = this.eachClick.bind(this)
  }

  eachClick() {
    if (this.state.computerPlaying) {
      // logic for computer
      // logic for recursion
    }
    let turn = !this.state.xIsNext
    this.setState({xIsNext: turn})
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
    );
  }
}

export default App;
