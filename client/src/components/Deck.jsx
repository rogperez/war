import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <div>
        { this.props.deck.size > 0 ?
            <img
              onClick={this.props.draw}
              className="card"
              src={require('../../assets/img/card-back.svg')} 
            /> 
          :
            <img
              className="card"
              ref="emptyDeck"
              src={require('../../assets/img/empty-card.svg')} 
            /> 
        }
      </div>
    );
  }
});
