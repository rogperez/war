import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import {expect} from 'chai';

import War from '../../src/components/War';
import NewGameForm from '../../src/components/NewGameForm';
import Hand from '../../src/components/Hand';

describe('war', () => {
  it('should render form for an empty game', () => {
    const component = renderIntoDocument(
      <War />
    );
    const newGameComponent =
      scryRenderedComponentsWithType(component, NewGameForm);

    expect(newGameComponent.length).to.equal(1);
  });

  it('should render a hand if players are in props', () => {
    const players = ['Kanye', 'Fabolous'];
    const component = renderIntoDocument(
      <War players={players} />
    );
    const hand =
      scryRenderedComponentsWithType(component, Hand);

    expect(hand.length).to.equal(players.length);
  });
});

