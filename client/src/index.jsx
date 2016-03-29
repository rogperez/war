import React from 'react';
import ReactDOM from 'react-dom';
import War from './components/War';

// TODO: fix css, currently in index.html
require('./style/app.css')

ReactDOM.render(
  <War players={['Roger']} />,
  document.getElementById('app')
);
