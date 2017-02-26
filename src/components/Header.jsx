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
      <header>
        {/* <div id="cryptopia-nav">
          <ul className="mobile-menu pull-right hidden-lg">
            <li className="nohover"><a href="/Home">Home</a></li>
            <li className="has-sub">
              <a href="1" style={{ "min-width": "70px !important" }}>
                <div style={
                  { margin-top: "4px" },
                  { margin-bottom: "-4px" },
                }>
                  <i className="fa fa-2x fa-bars"></i>
                </div>
              </a>
              <ul>
                <li><a className="visible-xs" href="/Account">
                  <i className="fa icon-user"></i> Account</a>
                </li>
                <li>
                  <a className="visible-xs" href="/Balances" style="border-bottom:1px solid white">
                    <i className="fa icon-bitcoin"></i> Balances
                  </a>
                </li>
                <li><a href="/Exchange"><i className="fa icon-barchartasc"></i> Exchange</a></li>
                <li><a href="/MineShaft"><i className="fa icon-pickaxe"></i> Mineshaft</a></li>
                <li><a href="/MarketPlace">
                  <i className="fa icon-shoppingcartalt"></i> Marketplace</a>
                </li>
                <li className="visible-xs"><a style="border-top:1px solid white" href="/Login">
                  <i className="fa icon-exitalt"></i> Logout</a>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="visible-lg">
            <li className="nohover"><a href="/Home">Home</a></li>

            <li className="nav-exchange has-sub has-sub-right">
              <a href="/Exchange"><i className="fa icon-barchartasc"></i> Exchange</a>
            </li>
            <li className="nav-mineshaft has-sub has-sub-right">
              <a href="/Mineshaft"><i className="fa icon-pickaxe"></i> Mineshaft</a>
            </li>
            <li className="nav-marketplace"><a href="/MarketPlace">
              <i className="fa icon-shoppingcartalt"></i> Marketplace</a>
            </li>
          </ul>
          <ul className="pull-right hidden-xs">
            <li className="pull-right" title="Logout">
              <a href="/Login" style="min-width:50px !important;">
                <div style="font-size:16px;margin-top:2px;margin-bottom:-2px">
                  <i className="fa icon-exitalt"></i>
                </div>
              </a>
            </li>
            <li className="has-sub pull-right ">
              <a href="/Account" style="padding:0 10px">alexeypato</a>
              <ul>
                <li><a href="/UserSupport"><i className="fa icon-firstaid"></i> Support</a></li>
                <li><a href="/Settings">
                  <i className="glyphicon glyphicon-cog"></i> Settings</a>
                </li>
                <li><a href="/Balances"><i className="fa icon-bitcoin"></i> Balances</a></li>
                <li><a href="/Account"><i className="fa icon-user"></i> Account</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </header>
      */}
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand">Личный бюджет</a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to={'/sign-in'} onClick={this.props.signOut}>
                  <span className="glyphicon glyphicon-log-out"></span> Выйти
                </Link>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
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
            </ul>
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
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
