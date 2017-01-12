import React from 'react';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import { render } from 'react-dom';
import App from './components/App';
import './assets/stylesheets/main.scss';

require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/css/bootstrap-theme.min.css');
require('react-bootstrap-table/dist/react-bootstrap-table-all.min.css');

render(
  <App />,
  document.getElementById('root'),
);
