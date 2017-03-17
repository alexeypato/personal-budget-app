import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Link } from 'react-router';

import { authActions, getAuth } from '../reducers/auth';
import { paths } from '../constants';
import Header from '../components/Header';

class App extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { router } = this.context;
    const { auth } = this.props;

    if (auth.authenticated && !nextProps.auth.authenticated) {
      router.replace(paths.SIGN_IN);
    } else if (!auth.authenticated && nextProps.auth.authenticated) {
      router.replace(paths.HOME);
    }
  }

  render() {
    return (
      <div>
        {
          this.props.auth.authenticated
          ? <Header
            pathname={this.context.router.location.pathname}
            signOut={this.props.signOut}
          />
          : null
        }
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  getAuth,
  auth => ({
    auth,
  }),
);

const mapDispatchToProps = Object.assign(
  {},
  authActions,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
