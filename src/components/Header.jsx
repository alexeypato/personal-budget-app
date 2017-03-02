import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Input from '../components/Input';
import ClearHistory from '../components/ClearHistory';

class Header extends Component {
  static propTypes = {
    signOut: PropTypes.func.isRequired,
    unplannedMoney: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      ModalInput: false,
      ModalClearHistory: false,
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
    const pathname = window.location.pathname;
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand">Личный бюджет</a>
              <a
                className="navbar-brand navbar-right visible-sm"
                href="/sign-in"
                onClick={this.props.signOut}
              >
                <span className="glyphicon glyphicon-log-out"></span> Выйти
              </a>
              <div className="dropdown navbar-right visible-sm">
                <a
                  className="dropdown-toggle navbar-brand"
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
                    <Input
                      showModal={this.state.ModalInput}
                      closeModal={this.closeModalInput}
                    />
                  </a></li>
                  <li><a
                    className="nav-item"
                    onClick={this.showModalClearHistory}
                    tabIndex={0}
                  >
                    <span className="glyphicon glyphicon-trash"></span>  Очистить историю
                    <ClearHistory
                      showModal={this.state.ModalClearHistory}
                      closeModal={this.closeModalClearHistory}
                    />
                  </a></li>
                </ul>
              </div>
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target=".navbar-collapse"
              >
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li
                  className={pathname === '/home'
                    ? 'active'
                    : ''
                  }
                >
                  <Link
                    to={'/home'}
                  >
                    <span className="glyphicon glyphicon-home"></span> Главная
                  </Link>
                </li>
                <li
                  className={pathname === '/deposits'
                    ? 'active'
                    : ''
                  }
                >
                  <Link
                    to={'/deposits'}
                  >
                    <span className="glyphicon glyphicon-usd"></span> История пополнения
                  </Link>
                </li>
                <li
                  className={pathname === '/categories'
                    ? 'active'
                    : ''
                  }
                >
                  <Link
                    to={'/categories'}
                  >
                    <span className="glyphicon glyphicon-th-list"></span> Категории
                  </Link>
                </li>
                <li
                  className={pathname === '/expenses'
                    ? 'active'
                    : ''
                  }
                >
                  <Link
                    to={'/expenses'}
                  >
                    <span className="glyphicon glyphicon-shopping-cart"></span> Расходы
                  </Link>
                </li>
              </ul>
              <a
                className="navbar-brand navbar-right visible-md visible-lg"
                href="/sign-in"
                onClick={this.props.signOut}
              >
                <span className="glyphicon glyphicon-log-out"></span> Выйти
              </a>
              <div className="dropdown navbar-right visible-md visible-lg">
                <a
                  className="dropdown-toggle navbar-brand"
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
                    <Input
                      showModal={this.state.ModalInput}
                      closeModal={this.closeModalInput}
                    />
                  </a></li>
                  <li><a
                    className="nav-item"
                    onClick={this.showModalClearHistory}
                    tabIndex={0}
                  >
                    <span className="glyphicon glyphicon-trash"></span>  Очистить историю
                    <ClearHistory
                      showModal={this.state.ModalClearHistory}
                      closeModal={this.closeModalClearHistory}
                    />
                  </a></li>
                </ul>
              </div>
              <ul className="nav navbar-nav navbar-header navbar-right visible-xs">
                <li className="dropdown">
                  <a
                    href="1"
                    className="dropdown-toggle"
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
                      <Input
                        showModal={this.state.ModalInput}
                        closeModal={this.closeModalInput}
                      />
                    </a></li>
                    <li><a
                      className="nav-item"
                      onClick={this.showModalClearHistory}
                      tabIndex={0}
                    >
                      <span className="glyphicon glyphicon-trash"></span>  Очистить историю
                      <ClearHistory
                        showModal={this.state.ModalClearHistory}
                        closeModal={this.closeModalClearHistory}
                      />
                    </a></li>
                  </ul>
                </li>
                <li>
                  <Link to={'/sign-in'} onClick={this.props.signOut}>
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

export default Header;
