import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Link } from 'react-router';

import { getAuth } from '../reducers/auth';
import { paths } from '../constants';
import Footer from '../components/footer/Footer';
import Header from '../components/Header';

class App extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
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
        <div className="content">
          {
            this.props.auth.authenticated
            ? <Header
              pathname={this.context.router.location.pathname}
            />
            : null
          }
          {this.props.children}
        </div>
        <div className="footer">
          <Footer />
        </div>
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

export default connect(
  mapStateToProps,
)(App);
