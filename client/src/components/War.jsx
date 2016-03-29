import React from 'react';
import Hand from './Hand';
import NewGameForm from './NewGameForm';

export default React.createClass({
  getPlayers: function() {
    return this.props.players || [];
  },
  getPlayerState: function(player) {
    return {
      playCards: ['1S'],
      deck: ['2H', '3D'],
      hiddenDeck: ['1H', '2D', '3S']
    };
  },
  render: function() {
    return <div className="war">
      {
        this.getPlayers().length > 0 ?
          this.getPlayers().map(player =>
            <Hand
              key={player}
              player={player}
              deck={this.getPlayerState(player).deck}
              playCard={this.getPlayerState(player).playCards}
              hiddenDeck={this.getPlayerState(player).hiddenDeck}
            />
          )
        :
        <NewGameForm />
      }
    </div>;
  }
});
