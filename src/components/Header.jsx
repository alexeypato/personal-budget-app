import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import ClearStateModal from './modal/ClearStateModal';
import { paths } from '../constants';

import { authActions, getAuth } from '../reducers/auth';

class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
    signOut: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      ClearStateModal: false,
    };
  }

  showClearStateModal = () => {
    this.setState({
      ClearStateModal: true,
    });
  }

  closeClearStateModal = () => {
    this.setState({
      ClearStateModal: false,
    });
  }

  render() {
    const pathname = this.props.pathname;
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href={paths.HOME}>Личный бюджет</a>
              <button
                className="navbar-toggle collapsed"
                data-target=".navbar-collapse"
                data-toggle="collapse"
                type="button"
              >
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="navbar-collapse collapse">
              <a
                className="navbar-brand navbar-right hidden-xs"
                href={paths.SIGN_IN}
                onClick={this.props.signOut}
              >
                <span className="glyphicon glyphicon-log-out"></span>{' Выйти'}
              </a>
              <div className="dropdown navbar-right hidden-xs">
                <a
                  className="dropdown-toggle navbar-brand nav-item"
                  data-toggle="dropdown"
                >
                  <span className="glyphicon glyphicon-user"></span>
                  &nbsp;{this.props.auth.displayName} <b className="caret"></b>
                </a>
                <ul className="dropdown-menu">
                  <li><a
                    className="nav-item"
                    onClick={this.showClearStateModal}
                    tabIndex={0}
                  >
                    <span className="glyphicon glyphicon-trash"></span>{' Очистить историю'}
                    <ClearStateModal
                      closeModal={this.closeClearStateModal}
                      showModal={this.state.ClearStateModal}
                    />
                  </a></li>
                </ul>
              </div>
              <ul className="nav navbar-nav navbar-header navbar-right visible-xs">
                <li className="dropdown">
                  <a
                    className="dropdown-toggle nav-item"
                    data-toggle="dropdown"
                  >
                    <span className="glyphicon glyphicon-user"></span>
                    &nbsp;{this.props.auth.displayName} <b className="caret"></b>
                  </a>
                  <ul className="dropdown-menu">
                    <li><a
                      className="nav-item"
                      onClick={this.showClearStateModal}
                      tabIndex={0}
                    >
                      <span className="glyphicon glyphicon-trash"></span>{' Очистить историю'}
                      <ClearStateModal
                        closeModal={this.closeClearStateModal}
                        showModal={this.state.ClearStateModal}
                      />
                    </a></li>
                  </ul>
                </li>
                <li>
                  <Link to={paths.SIGN_IN} onClick={this.props.signOut}>
                    <span className="glyphicon glyphicon-log-out"></span>{' Выйти'}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
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
  null,
)(Header);
