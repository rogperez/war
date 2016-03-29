import React from 'react';

export default React.createClass({
  render: function() {
    return <div>
      <div>Player's Current Card:</div>
      <img className="card" src={require(`../../assets/img/${this.props.card}.svg`)} />
    </div>
  }
});
