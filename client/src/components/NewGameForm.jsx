import React from 'react';
import {List} from 'immutable';

export default React.createClass({
  getInitialState: function() {
    return {
      disableButton: true,
      player1: '',
      player2: ''
    }
  },

  handlePlayer1Change: function(e) {
    e.preventDefault();
    return this.setState({
      player1: e.target.value.trim(),
      disableButton: e.target.value.trim() === '' || this.state.player2 === ''
    });
  },

  handlePlayer2Change: function(e) {
    e.preventDefault();
    return this.setState({
      player2: e.target.value.trim(),
      disableButton: this.state.player1 === '' || e.target.value.trim() === ''
    });
  },

  handleFormSubmit: function(e) {
    e.preventDefault();
    this.props.addPlayers(List([this.state.player1, this.state.player2]));
  },

  render: function() {
    return (
      <form>
        <div>
          <label>Player 1:</label><br />
          <input ref="player1Input" type="text" onChange={this.handlePlayer1Change}></input>
        </div>
        <div>
          <label>Player 2:</label> <br />
          <input ref="player2Input" type="text" onChange={this.handlePlayer2Change}></input>
        </div>
        <button ref="submit" 
          disabled={this.state.disableButton}
          onClick={this.handleFormSubmit}>New Game</button>
      </form>
    );
  }
});
