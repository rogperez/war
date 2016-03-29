import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';
import {expect} from 'chai';

import Card from '../../src/components/Card';

describe('card', () => {
  it('renders a card image', () => {
    const component = renderIntoDocument(
      <Card card="1H" />
    );
    const newGameComponent =
      scryRenderedDOMComponentsWithTag(component, 'img');

    expect(newGameComponent.length).to.equal(1);
  });
});
