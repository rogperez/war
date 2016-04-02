import React from 'react';

export default React.createClass({
  render: function() {
    return <div>
      { this.props.deck.length > 0 ?
          <img
            onClick={this.props.draw}
            className="card"
            src={require('../../assets/img/card-back.svg')} 
          /> 
        :
          <div ref="lastCard">LAST CARD</div>
      }
    </div>
  }
});
