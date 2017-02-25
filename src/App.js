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
      squares: [0,0,0,0,0,0,0,0,0]
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    this.props.onEachClick()
  }

  render() {
    var symbol = this.props.xIsNext ? 'X' : 'O';
    return (
      <div>
        <div>
        <Square value={this.state.squares[0]} onClick={this.handleClick} symbol={symbol}/>
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
    this.setState({xIsNext: !this.state.xIsNext})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Play tic tac toe</h2>
        </div>
        <Board onEachClick={this.eachClick} twoPlayer={this.state.twoPlayer}/>
      </div>
    );
  }
}

export default App;
