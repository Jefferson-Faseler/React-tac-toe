import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class Board extends React.Component {
  constructor() {
    super()
    this.state = {
      squares: [0,0,0,0,0,0,0,0,0]
    }
  }

  handleClick() {
    event.preventDefault()

  }

  render() {
    return (
      <div>
      {
        this.state.squares.map((square, i) => {
          return (
            <Square key={i} />
          )
        })
      }
      </div>
    )
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
