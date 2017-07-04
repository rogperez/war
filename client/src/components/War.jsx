import React from 'react';
import {connect} from 'react-redux';
import {List} from 'immutable';

import Hand from './Hand';
import NewGameForm from './NewGameForm';
import * as actionCreators from '../action_creators';

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
        <button onClick={this.props.reset}>Reset Game</button>
        {
          this.getPlayers().length === 2 ?
            this.getPlayers().map(player =>
              <div key={player}>
                {player}
                <Hand
                  player={player}
                  deck={this.getPlayerState(player).deck}
                  playCard={this.getPlayerState(player).playCard}
                  hiddenDeck={this.getPlayerState(player).hiddenDeck}
                  winner={this.props.winner}
                  {...this.props}
                />
              </div>
            )
          :
          <NewGameForm {...this.props} />
        }
        <button onClick={this.props.compare}>Compare Match</button>
        <button onClick={this.props.resolve}>Resolve Match</button>
      </div>
    )
  }
});

const WarContainer = connect(
  mapStateToProps,
  actionCreators
)(War);

function mapStateToProps(state) {
  return {
    winner: state.get('winner', ''),
    playerDecks: state.get('playerDecks'),
    match: state.get('match'),
    hiddenDecks: state.get('hiddenDecks')
  };
}

module.exports = { War, WarContainer }
