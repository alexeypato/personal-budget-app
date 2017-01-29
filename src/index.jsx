import React from 'react';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { loadState, saveState } from './reducers/localStore';
import reducer from './reducers';
import App from './containers/App';
import NotFound from './containers/NotFound';
import HomeTable from './components/HomeTable';
import DepositsTable from './components/DepositsTable';
import CategoriesTable from './components/CategoriesTable';
import ExpensesTable from './components/ExpensesTable';
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
        <IndexRoute component={HomeTable} />
        <Route path="/deposits" component={DepositsTable} />
        <Route path="/categories" component={CategoriesTable} />
        <Route path="/expenses" component={ExpensesTable} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
