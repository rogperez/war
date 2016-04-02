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
    playerDecks: { Roger: ['1S'] },
    playerDecks: {
      Roger: ['1S']
    }
  }
});

// TODO: fix css, currently in index.html
require('./style/app.css')

ReactDOM.render(
  <Provider store={store}>
    <WarContainer />
  </Provider>,
  document.getElementById('app')
);
