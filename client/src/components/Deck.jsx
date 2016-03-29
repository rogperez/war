import React from 'react';

export default React.createClass({
  render: function() {
    return <div>
      Deck ({this.props.deck.length}):
      <br />
      { this.props.deck.length > 0 ?
          <img
            className="card"
            src={require('../../assets/img/card-back.svg')} 
          /> 
        :
          <div ref="lastCard">LAST CARD</div> }
    </div>
  }
});
