import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import InputModal from '../components/modal/InputModal';
import ClearHistoryModal from '../components/modal/ClearHistoryModal';
import { paths } from '../constants';

import { getUnplannedMoney, unplannedMoneyActions } from '../reducers/unplannedMoney';

class Header extends Component {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    signOut: PropTypes.func.isRequired,
    unplannedMoney: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      ModalClearHistory: false,
      ModalInput: false,
    };
  }

  showModalInput = () => {
    this.setState({
      ModalInput: true,
    });
  }

  closeModalInput = () => {
    this.setState({
      ModalInput: false,
    });
  }

  showModalClearHistory = () => {
    this.setState({
      ModalClearHistory: true,
    });
  }

  closeModalClearHistory = () => {
    this.setState({
      ModalClearHistory: false,
    });
  }

  render() {
    const pathname = this.props.pathname;
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand">Личный бюджет</a>
              <a
                className="navbar-brand navbar-right visible-sm visible-md my-navbar-two"
                href={paths.SIGN_IN}
                onClick={this.props.signOut}
              >
                <span className="glyphicon glyphicon-log-out"></span> Выйти
              </a>
              <div className="dropdown navbar-right visible-sm visible-md my-navbar-two">
                <a
                  className="dropdown-toggle navbar-brand nav-item"
                  data-toggle="dropdown"
                >
                  Баланс : {this.props.unplannedMoney}
                  <span className="glyphicon glyphicon-usd"></span> <b className="caret"></b>
                </a>
                <ul className="dropdown-menu">
                  <li><a
                    className="nav-item"
                    onClick={this.showModalInput}
                    tabIndex={0}
                  >
                    <span className="glyphicon glyphicon-plus"></span>  Внести средства
                    <InputModal
                      clearState
                      closeModal={this.closeModalInput}
                      showModal={this.state.ModalInput}
                    />
                  </a></li>
                  <li><a
                    className="nav-item"
                    onClick={this.showModalClearHistory}
                    tabIndex={0}
                  >
                    <span className="glyphicon glyphicon-trash"></span>  Очистить историю
                    <ClearHistoryModal
                      closeModal={this.closeModalClearHistory}
                      showModal={this.state.ModalClearHistory}
                    />
                  </a></li>
                </ul>
              </div>
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
              <ul className="nav navbar-nav">
                <li
                  className={pathname === paths.HOME
                    ? 'active'
                    : ''
                  }
                >
                  <Link
                    to={paths.HOME}
                  >
                    <span className="glyphicon glyphicon-home"></span> Главная
                  </Link>
                </li>
                <li
                  className={pathname === paths.DEPOSITS
                    ? 'active'
                    : ''
                  }
                >
                  <Link
                    to={paths.DEPOSITS}
                  >
                    <span className="glyphicon glyphicon-usd"></span> История пополнения
                  </Link>
                </li>
                <li
                  className={pathname === paths.CATEGORIES
                    ? 'active'
                    : ''
                  }
                >
                  <Link
                    to={paths.CATEGORIES}
                  >
                    <span className="glyphicon glyphicon-th-list"></span> Категории
                  </Link>
                </li>
                <li
                  className={pathname === paths.EXPENSES
                    ? 'active'
                    : ''
                  }
                >
                  <Link
                    to={paths.EXPENSES}
                  >
                    <span className="glyphicon glyphicon-shopping-cart"></span> Расходы
                  </Link>
                </li>
              </ul>
              <a
                className="navbar-brand navbar-right visible-md visible-lg my-navbar"
                href={paths.SIGN_IN}
                onClick={this.props.signOut}
              >
                <span className="glyphicon glyphicon-log-out"></span> Выйти
              </a>
              <div className="dropdown navbar-right visible-md visible-lg my-navbar">
                <a
                  className="dropdown-toggle navbar-brand nav-item"
                  data-toggle="dropdown"
                >
                  Баланс : {this.props.unplannedMoney}
                  <span className="glyphicon glyphicon-usd"></span> <b className="caret"></b>
                </a>
                <ul className="dropdown-menu">
                  <li><a
                    className="nav-item"
                    onClick={this.showModalInput}
                    tabIndex={0}
                  >
                    <span className="glyphicon glyphicon-plus"></span>  Внести средства
                    <InputModal
                      clearState
                      closeModal={this.closeModalInput}
                      showModal={this.state.ModalInput}
                    />
                  </a></li>
                  <li><a
                    className="nav-item"
                    onClick={this.showModalClearHistory}
                    tabIndex={0}
                  >
                    <span className="glyphicon glyphicon-trash"></span>  Очистить историю
                    <ClearHistoryModal
                      closeModal={this.closeModalClearHistory}
                      showModal={this.state.ModalClearHistory}
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
                    Баланс : {this.props.unplannedMoney}
                    <span className="glyphicon glyphicon-usd"></span> <b className="caret"></b>
                  </a>
                  <ul className="dropdown-menu">
                    <li><a
                      className="nav-item"
                      onClick={this.showModalInput}
                      tabIndex={0}
                    >
                      <span className="glyphicon glyphicon-plus"></span>  Внести средства
                      <InputModal
                        clearState
                        closeModal={this.closeModalInput}
                        showModal={this.state.ModalInput}
                      />
                    </a></li>
                    <li><a
                      className="nav-item"
                      onClick={this.showModalClearHistory}
                      tabIndex={0}
                    >
                      <span className="glyphicon glyphicon-trash"></span>  Очистить историю
                      <ClearHistoryModal
                        closeModal={this.closeModalClearHistory}
                        showModal={this.state.ModalClearHistory}
                      />
                    </a></li>
                  </ul>
                </li>
                <li>
                  <Link to={paths.SIGN_IN} onClick={this.props.signOut}>
                    <span className="glyphicon glyphicon-log-out"></span> Выйти
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
  getUnplannedMoney,
  unplannedMoney => ({
    unplannedMoney,
  }),
);

export default connect(
  mapStateToProps,
  null,
)(Header);
