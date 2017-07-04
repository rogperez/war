import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setState} from './action_creators';
import {War, WarContainer} from './components/War';

const store = createStore(reducer);
const socket = io('http://localhost:8090');
socket.on('state', state =>
  store.dispatch(setState(state))
);

// TODO: fix css, currently in index.html
//require('./style/app.css')

ReactDOM.render(
  <Provider store={store}>
    <WarContainer />
  </Provider>,
  document.getElementById('app')
);
