import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', () => {

  it('is a redux store configured with the correct reducer', () => {
    const store = makeStore();
    expect(store.getState().toJS()).to.include.keys('deck');
    expect(store.getState().get('deck').size).to.equal(52);
  });

  it('is a redux store allowing dispatched actions', () => {
    const store = makeStore();
    store.dispatch({
      type: 'ADD_PLAYERS',
      players: ['Kanye', 'Fabolous']
    });
    expect(store.getState().get('playerDecks')).to.be.ok;
    expect(store.getState().getIn(['playerDecks', 'Kanye'])).to.be.ok;
    expect(store.getState().getIn(['playerDecks', 'Kanye']).size).to.equal(26);
    expect(store.getState().getIn(['playerDecks', 'Fabolous']).size).to.equal(26);
  });

});
