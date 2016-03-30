import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import {expect} from 'chai';

import Hand       from '../../src/components/Hand';
import Deck       from '../../src/components/Deck';
import HiddenDeck from '../../src/components/HiddenDeck';
import Card       from '../../src/components/Card';

describe('hand', () => {
  it('renders a Deck when deck prop is present', () => {
    const deckProp = ['1H'];
    const component = renderIntoDocument(<Hand deck={deckProp}/>);
    const deck = scryRenderedComponentsWithType(component, Deck);

    expect(deck.length).to.equal(1);
  });

  it('doesn\'t render a Deck when deck prop is not present', () => {
    const component = renderIntoDocument(<Hand />);
    const deck = scryRenderedComponentsWithType(component, Deck);

    expect(deck.length).to.equal(0);
  });

  it('renders a Hidden Deck when deck prop is present', () => {
    const hiddenDeckProp = ['1H'];
    const component = renderIntoDocument(<Hand hiddenDeck={hiddenDeckProp}/>);
    const hiddenDeck = scryRenderedComponentsWithType(component, HiddenDeck);

    expect(hiddenDeck.length).to.equal(1);
  });

  it('doesn\'t render a Hidden Deck when deck prop is not present', () => {
    const component = renderIntoDocument(<Hand />);
    const hiddenDeck = scryRenderedComponentsWithType(component, HiddenDeck);

    expect(hiddenDeck.length).to.equal(0);
  });

  it('renders a Card when card prop is present', () => {
    const cardProp = '1H';
    const component = renderIntoDocument(<Hand playCard={cardProp}/>);
    const card = scryRenderedComponentsWithType(component, Card);

    expect(card.length).to.equal(1);
  });

  it('doesn\'t render a Card when card prop is not present', () => {
    const component = renderIntoDocument(<Hand />);
    const card = scryRenderedComponentsWithType(component, Card);

    expect(card.length).to.equal(0);
  });
});
