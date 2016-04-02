import React from 'react';

export default React.createClass({
  render: function() {
    return <div>
      <img className="card" src={require(`../../assets/img/${this.props.card}.svg`)} />
    </div>
  }
});
