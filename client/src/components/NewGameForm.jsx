import React from 'react';

export default React.createClass({
  render: function() {
    return <form>
      <div>
        <label>Player 1:</label><br />
        <input ref="player1" type="text"></input>
      </div>
      <div>
        <label>Player 2:</label> <br />
        <input ref="player2" type="text"></input>
      </div>
      <button>New Game</button>
    </form>;
  }
});
