import React from 'react';

export default React.createClass({
  render: function() {
    return <div>
      Hidden Deck ({this.props.hiddenDeck.length}):
        <ul className="cards hidden-deck">
          {this.props.hiddenDeck.map((card) =>
            <li key={card}>
              <img
                className="card"
                src={require(`../../assets/img/${card}.svg`)} 
              />
            </li>
          )}
        </ul>
    </div>
  }
});
