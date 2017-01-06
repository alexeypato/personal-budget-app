import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import './assets/stylesheets/main.scss';

require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/css/bootstrap-theme.css');

render(
  <App />,
  document.getElementById('root'),
);
