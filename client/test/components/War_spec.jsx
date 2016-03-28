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

describe('war', () => {
  it('should render form for an empty game', () => {
    const component = renderIntoDocument(
      <War />
    );
    const newGameComponent =
      scryRenderedComponentsWithType(component, NewGameForm);

    expect(newGameComponent.length).to.equal(1);
  });
});

