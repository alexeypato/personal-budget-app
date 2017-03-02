import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createSelector } from 'reselect';
import { authActions, getAuth } from '../auth';
import { getUnplannedMoney } from '../reducers';
import { paths } from '../routes';
import Header from '../components/Header';

class App extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired,
    unplannedMoney: PropTypes.number.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { router } = this.context;
    const { auth } = this.props;

    if (auth.authenticated && !nextProps.auth.authenticated) {
      router.replace(paths.ROOT);
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
            signOut={this.props.signOut}
            unplannedMoney={this.props.unplannedMoney}
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
  getUnplannedMoney,
  (auth, unplannedMoney) => ({
    auth,
    unplannedMoney,
  }),
);

export default connect(
  mapStateToProps,
  authActions,
)(App);
