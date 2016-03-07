import React from 'react';

export default React.createClass({
  getPlayers: function() {
    return this.props.players || [];
  },
  render: function() {
    return <div className="war">
      {this.getPlayers().map(player =>
        <PlayerDeck />
        <div>
      )}
    </div>;
  }
});
