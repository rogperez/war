import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';
import {expect} from 'chai';

import Deck from '../../src/components/Deck';

describe('deck', () => {
  it('renders a card image', () => {
    const deck = ['1H'];
    const component = renderIntoDocument(
      <Deck deck={deck} />
    );
    const cards =
      scryRenderedDOMComponentsWithTag(component, 'img');

    expect(cards.length).to.equal(1);
  });

  it('renders a last card warning when no more cards in deck', () => {
    const deck = [];
    const component = renderIntoDocument(
      <Deck deck={deck} />
    );

    expect(ReactDOM.findDOMNode(component.refs.lastCard)).to.be.ok;
  });

  it('does not render last card warning if more cards available', () => {
    const deck = ['1H'];
    const component = renderIntoDocument(
      <Deck deck={deck} />
    );

    expect(ReactDOM.findDOMNode(component.refs.lastCard)).not.to.be.ok;
  });
});
