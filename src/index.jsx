import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import './assets/stylesheets/main.scss';

require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/css/bootstrap-theme.min.css');
require('react-bootstrap-table/dist/react-bootstrap-table.min.css');
/* require('jquery/dist/jquery.min.js');
require('react-bootstrap/dist/react-bootstrap.min.js');
require('bootstrap/dist/js/bootstrap.min.js');
require('react-bootstrap-table/dist/react-bootstrap-table.min.js');*/

render(
  <App />,
  document.getElementById('root'),
);
