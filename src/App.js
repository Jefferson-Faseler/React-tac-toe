import React, { Component } from 'react';
import logo from './logo.svg';
import './Board.js';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      computerPlaying: false,
      xIsNext: true,
      message: 'Make your move'
    }
    this.eachClick = this.eachClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({computerPlaying: true})
  }

  eachClick(message) {
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
          onEachClick={this.eachClick}
          computerPlaying={this.state.computerPlaying}
          xIsNext={this.state.xIsNext}
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
