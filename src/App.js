import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Square(props) {
  return (
    <button onClick={props.onClick} value={props.value}>{props.symbol}</button>
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
        debugger
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
      this.setState({message: 'Game over'})
    } else {
      this.setState({message: turn})
    }
  }

  render() {
    return (
      <div>
        <div>
        <Square value={0} onClick={this.handleClick} symbol={this.state.symbols[0]}/>
        <Square value={1} onClick={this.handleClick} symbol={this.state.symbols[1]} />
        <Square value={2} onClick={this.handleClick} symbol={this.state.symbols[2]} />
        </div>
        <div>
        <Square value={3} onClick={this.handleClick} symbol={this.state.symbols[3]} />
        <Square value={4} onClick={this.handleClick} symbol={this.state.symbols[4]} />
        <Square value={5} onClick={this.handleClick} symbol={this.state.symbols[5]} />
        </div>
        <div>
        <Square value={6} onClick={this.handleClick} symbol={this.state.symbols[6]} />
        <Square value={7} onClick={this.handleClick} symbol={this.state.symbols[7]} />
        <Square value={8} onClick={this.handleClick} symbol={this.state.symbols[8]} />
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
          <h2>Play tic tac toe</h2>
        </div>
        <Board
        onEachClick={this.eachClick}
        computerPlaying={this.state.computerPlaying}
        xIsNext={this.state.xIsNext}
        />
      </div>
    );
  }
}

export default App;
