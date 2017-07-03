import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {War, WarContainer} from './components/War';

const store = createStore(reducer);
store.dispatch({
  type: 'SET_STATE',
  state: {
    match: { Player1: '2S', Player2: '1C' },
    hiddenDecks: { Player1: ['4H', '2D', '1S'], Player2: ['4H', '2D', '1S'] },
    playerDecks: {
      Player1: ['1S'],
      Player2: ['2C']
    }
  }
});

// TODO: fix css, currently in index.html
//require('./style/app.css')

ReactDOM.render(
  <Provider store={store}>
    <WarContainer />
  </Provider>,
  document.getElementById('app')
);
