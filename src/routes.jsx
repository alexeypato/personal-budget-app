import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect, Redirect } from 'react-router';
import { isAuthenticated } from './reducers/auth';

import App from './containers/App';
import Home from './containers/Home';

import LogIn from './components/LogIn';
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
      <IndexRedirect to={paths.SIGN_IN} />
      <Route path={paths.SIGN_IN} component={LogIn} onEnter={requireUnauth(getState)} />
      <Route path={paths.HOME} component={Home} onEnter={requireAuth(getState)} />
      <Redirect from={paths.NOTFOUND} to={paths.SIGN_IN} />
    </Route>
  );
};
