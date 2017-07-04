import {Map, fromJS} from 'immutable'; 

function setState(state, newState) {
  return Map().merge(newState);
}

export default function(state = Map(), action) {
  switch(action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  case 'ADD_PLAYERS':
    return setState(state, action.newState);
  case 'DRAW':
    return setState(state, action.newState);
  }
  return state;
}
