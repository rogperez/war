import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        deck: List(['1H'])
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      deck: ['1H']
    }));
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        deck: List(['1H'])
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      deck: ['1H']
    }));
  });

  it('handles SET_STATE without an initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: Map({
        deck: List(['1H'])
      })
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      deck: ['1H']
    }));
  });
});
