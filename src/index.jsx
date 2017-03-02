import React from 'react';
import ReactDOM from 'react-dom';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import 'datatables.net/js/jquery.dataTables';
import 'datatables.net-bs/js/dataTables.bootstrap';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { initAuth } from './auth';
import configureStore from './store';
import { getRoutes } from './routes';

import './assets/stylesheets/main.scss';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

initAuth(store.dispatch)
  .then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <Router history={history} routes={getRoutes(store.getState)} />
      </Provider>,
      document.getElementById('root'),
    );
  })
  .catch(error => console.error(error));
