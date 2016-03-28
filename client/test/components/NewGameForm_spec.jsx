import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import {expect} from 'chai';

import NewGameForm from '../../src/components/NewGameForm';

describe('new game form', () => {
  it('enables button if player1 and player2 props exist', () => {
    const component = renderIntoDocument(
      <NewGameForm player1Input="Kanye" player2Input="Fabolous" />
    );
    const inputFields =
      scryRenderedDOMComponentsWithTag(component, 'input');
    const button =
      scryRenderedDOMComponentsWithTag(component, 'button');

    expect(button[0].hasAttribute('disabled')).to.equal(false);
  });

  it('disabled button if player1Input and player2Input props don\'t exist', () => {
    const component = renderIntoDocument(
      <NewGameForm />
    );
    const inputFields =
      scryRenderedDOMComponentsWithTag(component, 'input');
    const button =
      scryRenderedDOMComponentsWithTag(component, 'button');

    expect(button[0].hasAttribute('disabled')).to.equal(true);
  });

  it('disabled button if player1Input and player2Input props are empty strings', () => {
    const component = renderIntoDocument(
      <NewGameForm player1Input='' player2Input='' />
    );
    const inputFields =
      scryRenderedDOMComponentsWithTag(component, 'input');
    const button =
      scryRenderedDOMComponentsWithTag(component, 'button');

    expect(button[0].hasAttribute('disabled')).to.equal(true);
  });

  it('invokes callback when button is clicked', () => {
    let callbackInvoked = false;
    const handleClick = () => callbackInvoked = true;

    const component = renderIntoDocument(
      <NewGameForm player1Input='Kanye' player2Input='Fabolous' 
        startGame={handleClick}
      />
    );
    const button =
      scryRenderedDOMComponentsWithTag(component, 'button');

    Simulate.click(button[0]);
    expect(callbackInvoked).to.equal(true);
  });
});
