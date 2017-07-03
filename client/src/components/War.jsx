import React from 'react';
import {connect} from 'react-redux';

import Hand from './Hand';
import NewGameForm from './NewGameForm';

const War = React.createClass({
  getPlayers: function() {
    if(this.props.playerDecks) {
      return Object.keys(this.props.playerDecks.toJS());
    }
    return [];
  },

  getPlayerState: function(player) {
    return {
      deck: (this.props.playerDecks ? this.props.playerDecks.get(player) : null),
      playCard: (this.props.match ? this.props.match.get(player) : null),
      hiddenDeck: (this.props.hiddenDecks ? this.props.hiddenDecks.get(player) : null)
    };
  },

  render: function() {
    return (
      <div className="war">
        {
          this.getPlayers().length === 2 ?
            this.getPlayers().map(player =>
              <div className="hand" key={player}>
                <div>{player}</div>
                <Hand
                  player={player}
                  deck={this.getPlayerState(player).deck}
                  playCard={this.getPlayerState(player).playCard}
                  hiddenDeck={this.getPlayerState(player).hiddenDeck}
                />
              </div>
            )
          :
          <NewGameForm />
        }
      </div>
    )
  }
});

const WarContainer = connect(mapStateToProps)(War);

function mapStateToProps(state) {
  return {
    playerDecks: state.get('playerDecks'),
    match: state.get('match'),
    hiddenDecks: state.get('hiddenDecks')
  };
}

module.exports = { War, WarContainer }
