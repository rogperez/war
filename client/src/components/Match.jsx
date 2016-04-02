import React from 'react';

export default React.createClass({
  render: function() {
    return 
      <div>
        { this.props.players.map(player =>
            <div>{player}'s Card:</div>
            <Card card={this.props.match.player} />
          )
        }
      </div>
  }
});
