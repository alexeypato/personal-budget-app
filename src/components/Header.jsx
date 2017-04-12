import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import ClearStateModal from './modal/ClearStateModal';
import ExitModal from './modal/ExitModal';
import { paths } from '../constants';

import { getAuth } from '../reducers/auth';

class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      ClearStateModal: false,
      ExitModal: false,
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

  showExitModal = () => {
    document.getElementById('show-exit-modal').blur();
    this.setState({
      ExitModal: true,
    });
  }

  closeExitModal = () => {
    this.setState({
      ExitModal: false,
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
                className="navbar-brand navbar-right nav-item hidden-xs"
                id="show-exit-modal"
                onClick={this.showExitModal}
                tabIndex={0}
              >
                <span className="glyphicon glyphicon-log-out"></span>{' Выйти'}
                <ExitModal
                  closeModal={this.closeExitModal}
                  showModal={this.state.ExitModal}
                />
              </a>
              <div className="dropdown navbar-right hidden-xs">
                <a
                  className="dropdown-toggle navbar-brand nav-item"
                  data-toggle="dropdown"
                >
                  <span className="glyphicon glyphicon-user"></span>
                  &nbsp;{this.props.auth.displayName || this.props.auth.email}
                  &nbsp;<b className="caret"></b>
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
                    &nbsp;{this.props.auth.displayName || this.props.auth.email}
                    &nbsp;<b className="caret"></b>
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
                  <a
                    className="navbar-brand navbar-right nav-item"
                    id="show-exit-modal"
                    onClick={this.showExitModal}
                    tabIndex={0}
                  >
                    <span className="glyphicon glyphicon-log-out"></span>{' Выйти'}
                    <ExitModal
                      closeModal={this.closeExitModal}
                      showModal={this.state.ExitModal}
                    />
                  </a>
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
