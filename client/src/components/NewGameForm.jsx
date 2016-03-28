import React from 'react';

export default React.createClass({

  // Event Handlers =============================
  handlePlayer1Change: function (e) {
    e.preventDefault();
    this.props.updatePlayer1(e.value.trim());
  },
  handlePlayer2Change: function (e) {
    e.preventDefault();
    this.props.updatePlayer2(e.value.trim());
  },

  // Render Helpers ============================
  buttonIsDisabled: function () {
    const props = this.props;
    const players = [props.player1Input, props.player2Input]
    return (
      ('undefined' === typeof players[0] || 
       'undefined' === typeof players[1])
      ||
      (players[0] === '' || players[1] === '')
    )
  },

  render: function() {
    return <form>
      <div>
        <label>Player 1:</label><br />
        <input ref="player1Input" type="text"></input>
      </div>
      <div>
        <label>Player 2:</label> <br />
        <input ref="player2Input" type="text"></input>
      </div>
      <button ref="submit" 
        disabled={this.buttonIsDisabled()}
        onClick={() => this.props.startGame()}>New Game</button>
    </form>;
  }
});
