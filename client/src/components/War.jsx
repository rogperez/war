import React from 'react';
import {connect} from 'react-redux';

import Hand from './Hand';
import NewGameForm from './NewGameForm';

export const War =  React.createClass({
  getPlayers: function() {
    return this.props.players || [];
  },
  getPlayerState: function(player) {
    return {
      deck: this.props.playerDecks.get(player),
      playCard: this.props.match.get(player)

    };
  },
  render: function() {
    return 
      <div className="war">
        {
          this.getPlayers().count === 2 ?
            this.getPlayers().map(player =>
              <Hand
                key={player}
                player={player}
                deck={this.getPlayerState(player).deck}
                playCard={this.getPlayerState(player).playCard}
                hiddenDeck={this.getPlayerState(player).hiddenDeck}
              />
            )
          :
          <NewGameForm />
        }
      </div>;
  }
});

function mapStateToProps(state) {
  return {
    players: state.get('players'),
    playerDecks: state.get('playerDecks'),
  };
}

export const WarContainer = connect(mapStateToProps)(War);

