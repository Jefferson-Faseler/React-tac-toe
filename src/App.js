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
      symbols: Array(9).fill(null)
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    if (event.target.textContent === '' ) {
      event.target.textContent = this.props.xIsNext ? 'X' : 'O';
    }
    this.props.onEachClick()
  }

  render() {
    return (
      <div>
        <div>
        <Square value={this.state.squares[0]} onClick={this.handleClick} symbol={this.state.symbols[0]}/>
        <Square value={this.state.squares[1]} onClick={this.handleClick} symbol={this.state.symbols[1]} />
        <Square value={this.state.squares[2]} onClick={this.handleClick} symbol={this.state.symbols[2]} />
        </div>
        <div>
        <Square value={this.state.squares[3]} onClick={this.handleClick} symbol={this.state.symbols[3]} />
        <Square value={this.state.squares[4]} onClick={this.handleClick} symbol={this.state.symbols[4]} />
        <Square value={this.state.squares[5]} onClick={this.handleClick} symbol={this.state.symbols[5]} />
        </div>
        <div>
        <Square value={this.state.squares[6]} onClick={this.handleClick} symbol={this.state.symbols[6]} />
        <Square value={this.state.squares[7]} onClick={this.handleClick} symbol={this.state.symbols[7]} />
        <Square value={this.state.squares[8]} onClick={this.handleClick} symbol={this.state.symbols[8]} />
        </div>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      twoPlayer: true,
      xIsNext: true
    }
    this.eachClick = this.eachClick.bind(this)
  }

  eachClick() {
    if (this.state.twoPlayer) {
      //logic for recursion
    } else {
      // logic for computer
    }
    let turn = !this.state.xIsNext
    this.setState({xIsNext: turn})
    debugger
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Play tic tac toe</h2>
        </div>
        <Board onEachClick={this.eachClick} twoPlayer={this.state.twoPlayer} xIsNext={this.state.xIsNext}/>
      </div>
    );
  }
}

export default App;
