import React from 'react';
import PlayerDeck from './PlayerDeck';
import NewGameForm from './NewGameForm';

export default React.createClass({
  getPlayers: function() {
    return this.props.players || [];
  },
  render: function() {
    return <div className="war">
      if (this.getPlayers().length > 0) {
        this.getPlayers().map(player =>
          <PlayerDeck key={player} player={player} />
        )
      } else {
        <NewGameForm player1Input="Foo" player2Input="Bar" />
      }
    </div>;
  }
});
