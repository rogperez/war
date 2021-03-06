import React from 'react';

import Card from './Card';
import HiddenDeck from './HiddenDeck';
import Deck from './Deck';

export default React.createClass({
  // ------------> Render Helpers
  renderDeck: function() {
    if (this.props.deck) {
      return (
        <div>
          <Deck
            draw={() => this.props.draw(this.props.player)}
            deck={this.props.deck} />
          <div>{this.props.deck.size}</div>
        </div>
      );
    }
    return null;
  },

  renderHiddenDeck: function() {
    if (this.props.hiddenDeck) {
      return <HiddenDeck hiddenDeck={this.props.hiddenDeck} />;
    }
    return null;
  },

  renderCard: function() {
    if (this.props.playCard) {
      return <Card card={this.props.playCard} />;
    }
    return null;
  },

  render: function() {
    const winnerClass = this.props.winningPlayer ? 'winner' : '';
    const classList = `${winnerClass} hand`;
    return <div className={classList}>
      {this.renderDeck()}
      {this.renderHiddenDeck()}
      {this.renderCard()}
    </div>;
  }
});
