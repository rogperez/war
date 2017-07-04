import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import remoteActionMiddleware from './remote_action_middleware';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setState} from './action_creators';
import {War, WarContainer} from './components/War';

const socket = io('http://localhost:8090');
socket.on('state', state =>
  store.dispatch(setState(state))
);

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);

// TODO: fix css, currently in index.html
//require('./style/app.css')

ReactDOM.render(
  <Provider store={store}>
    <WarContainer />
  </Provider>,
  document.getElementById('app')
);
