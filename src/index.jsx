import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/css/bootstrap-theme.css');
require('react-datepicker/dist/react-datepicker.css');

render(
  <App />,
  document.getElementById('root'),
);
