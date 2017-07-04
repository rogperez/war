import React from 'react';
import ReactDOM from 'react-dom';
import {List, fromJS} from 'immutable';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import {expect} from 'chai';

import NewGameForm from '../../src/components/NewGameForm';

describe('new game form', () => {
  it('disabled button if player1Input and player2Input are empty', () => {
    const component = renderIntoDocument(
      <NewGameForm />
    );
    const inputFields = scryRenderedDOMComponentsWithTag(component, 'input');
    const button = scryRenderedDOMComponentsWithTag(component, 'button')[0];

    expect(button.hasAttribute('disabled')).to.equal(true);
  });

  it('disabled button if a single input is empty', () => {
    const component = renderIntoDocument(
      <NewGameForm />
    );

    const inputFields = scryRenderedDOMComponentsWithTag(component, 'input');
    const button = scryRenderedDOMComponentsWithTag(component, 'button')[0];

    inputFields[0].value = 'hey';
    Simulate.change(inputFields[0]);
    expect(button.hasAttribute('disabled')).to.equal(true);

    inputFields[1].value = 'ho';
    Simulate.change(inputFields[1]);
    expect(button.hasAttribute('disabled')).to.equal(false);
  });

  it('sets the player from state', () => {
    const component = renderIntoDocument(
      <NewGameForm />
    );

    const inputFields = scryRenderedDOMComponentsWithTag(component, 'input');
    const button = scryRenderedDOMComponentsWithTag(component, 'button')[0];

    inputFields[0].value = 'hey';
    Simulate.change(inputFields[0]);
    expect(component.state.player1).to.equal('hey');

    inputFields[1].value = 'ho';
    Simulate.change(inputFields[1]);

    expect(component.state.player2).to.equal('ho');
  });

  it('invokes callback when button is with the players', () => {
    let callbackArguments = null;
    const handleClick = (args) => callbackArguments = args;

    const component = renderIntoDocument(
      <NewGameForm addPlayers={handleClick} />
    );

    const inputFields = scryRenderedDOMComponentsWithTag(component, 'input');
    const button = scryRenderedDOMComponentsWithTag(component, 'button');

    inputFields[0].value = 'hey';
    Simulate.change(inputFields[0]);
    inputFields[1].value = 'ho';
    Simulate.change(inputFields[1]);

    Simulate.click(button[0]);
    expect(callbackArguments).to.equal(List(['hey', 'ho']));
  });
});
