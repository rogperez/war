import React from 'react';

import Card from './Card';
import HiddenDeck from './HiddenDeck';
import Deck from './Deck';

export default React.createClass({
  // ------------> Render Helpers
  renderDeck: function() {
    if (this.props.deck) {
      return <Deck
        draw={() => this.props.draw(this.props.player)}
        deck={this.props.deck} />
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
    return <div className="hand">
      {this.renderDeck()}
      {this.renderHiddenDeck()}
      {this.renderCard()}
    </div>;
  }
});
