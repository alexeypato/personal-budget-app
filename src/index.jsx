import React from 'react';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { loadState, saveState } from './reducers/localStore';
import reducer from './reducers';
import App from './containers/App';
import CashInfoTable from './components/CashInfoTable';
import CategoriesTable from './components/CategoriesTable';
import './assets/stylesheets/main.scss';

require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/css/bootstrap-theme.min.css');
require('react-bootstrap-table/dist/react-bootstrap-table-all.min.css');

const persistedState = loadState();
const store = createStore(
  reducer,
  persistedState,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

store.subscribe(() => {
  saveState(store.getState());
});

const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/history" component={CashInfoTable} />
        <Route path="/categories" component={CategoriesTable} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
