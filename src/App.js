import React, { Component } from 'react';
import logo from './logo.svg';
import Board from './Board';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      computerSymbol: '',
      xIsNext: true,
      message: 'Make your move'
    }
    this.changeTurn = this.changeTurn.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({computerSymbol: this.state.xIsNext ? 'X' : 'O'})
  }

  changeTurn(message) {
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
        <button onClick={this.handleClick}>Unbeatale AI</button>
        <div>
          <Board
          onChangeTurn={this.changeTurn}
          computerSymbol={this.state.computerSymbol}
          turn={this.state.xIsNext ? 'X' : 'O'}
          />
        </div>
        <div>
        <h1>{this.state.message}</h1>
        </div>
      </div>
    );
  }
}

export default App;
