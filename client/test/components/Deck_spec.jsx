import React from 'react';
import ReactDOM from 'react-dom';
import { List } from 'immutable';
import {
  Simulate,
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';
import {expect} from 'chai';

import Deck from '../../src/components/Deck';

describe('deck', () => {
  it('renders a card image', () => {
    const deck = new List(['1H']);
    const component = renderIntoDocument(
      <Deck deck={deck} />
    );
    const cards = scryRenderedDOMComponentsWithTag(component, 'img');

    expect(cards.length).to.equal(1);
  });

  it('renders a last card warning when no more cards in deck', () => {
    const deck = new List([]);
    const component = renderIntoDocument(
      <Deck deck={deck} />
    );

    expect(ReactDOM.findDOMNode(component.refs.emptyDeck)).to.be.ok;
  });

  it('does not render last card warning if more cards available', () => {
    const deck = new List(['1H']);
    const component = renderIntoDocument(
      <Deck deck={deck} />
    );

    expect(ReactDOM.findDOMNode(component.refs.emptyDeck)).not.to.be.ok;
  });

  it('invokes the draw callback when clicked', () => {
    let clicked = false;
    const deck = new List(['1H']);
    const component = renderIntoDocument(
      <Deck deck={deck} draw={() => clicked = true} />
    );
    const card = scryRenderedDOMComponentsWithTag(component, 'img');
    Simulate.click(card[0]);

    expect(clicked).to.be.true;
  });
});
