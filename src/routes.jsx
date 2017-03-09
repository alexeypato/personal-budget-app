import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect, Redirect } from 'react-router';
import { isAuthenticated } from './reducers/auth';

import App from './containers/App';
import LogIn from './containers/LogIn';
import Home from './components/Home';
import HomeTable from './components/HomeTable';
import DepositsTable from './components/DepositsTable';
import CategoriesTable from './components/CategoriesTable';
import ExpensesTable from './components/ExpensesTable';
import { paths } from './constants';

const requireAuth = (getState) => {
  return (nextState, replace) => {
    if (!isAuthenticated(getState())) {
      replace(paths.SIGN_IN);
    }
  };
};

const requireUnauth = (getState) => {
  return (nextState, replace) => {
    if (isAuthenticated(getState())) {
      replace(paths.HOME);
    }
  };
};

export const getRoutes = (getState) => {
  return (
    <Route path={paths.ROOT} component={App}>
      <Route path={paths.SIGN_IN} component={LogIn} onEnter={requireUnauth(getState)} />
      <Route path={paths.HOME} component={Home} onEnter={requireAuth(getState)}>
        <IndexRoute component={HomeTable} />
        <Route path={paths.DEPOSITS} component={DepositsTable} />
        <Route path={paths.CATEGORIES} component={CategoriesTable} />
        <Route path={paths.EXPENSES} component={ExpensesTable} />
      </Route>
      <IndexRedirect to={paths.SIGN_IN} />
      <Redirect from={paths.NOTFOUND} to={paths.HOME} />
    </Route>
  );
};
