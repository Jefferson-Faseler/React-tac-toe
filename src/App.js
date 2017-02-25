import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Square(props) {
  return (
    <button onClick={props.onClick} value={props.value}>YEah</button>
  )
}

class Board extends React.Component {
  constructor() {
    super()
    this.state = {
      squares: [0,0,0,0,0,0,0,0,0]
    }
  }

  handleClick(event) {
    event.preventDefault()
    var value = xIsNext ? return 'X' : 'O';
    console.log(event.target.getAttribute('value'))
  }

  render() {
    return (
      <div>
        <div>
        <Square value={this.state.squares[0]} onClick={this.handleClick}/>
        <Square value={this.state.squares[1]} onClick={this.handleClick}/>
        <Square value={this.state.squares[2]} onClick={this.handleClick}/>
        </div>
        <div>
        <Square value={this.state.squares[3]} onClick={this.handleClick}/>
        <Square value={this.state.squares[4]} onClick={this.handleClick}/>
        <Square value={this.state.squares[5]} onClick={this.handleClick}/>
        </div>
        <div>
        <Square value={this.state.squares[6]} onClick={this.handleClick}/>
        <Square value={this.state.squares[7]} onClick={this.handleClick}/>
        <Square value={this.state.squares[8]} onClick={this.handleClick}/>
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  constructor() {
    super()
    this.state = {
      xIsNext: true
    }
  }

  handleClick(i) {
    if (this.props.twoPlayer) {
      this.setState(xIsNext: !this.state.xIsNext)
    } else {
      // logic for computer
    }
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Play tic tac toe</h2>
        </div>
        <Board />
      </div>
    );
  }
}

export default App;
