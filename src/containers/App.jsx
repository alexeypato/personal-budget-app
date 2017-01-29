import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router';

import Input from '../components/Input';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModalClear: false,
    };
  }

  closeModalClear = () => {
    this.setState({ showModalClear: false });
  }

  clearAndClose = () => {
    this.props.onClearState();
    this.closeModalClear();
  }

  render() {
    return (
      <div className="container height-100">
        <div className="row height-100">
          <div className="col-md-2">
            <div className="row margin-bottom">
              <Input />
            </div>

            <div className="row margin-bottom">
              <button
                className="btn btn-primary btn-block"
                type="button"
                onClick={() => this.setState({ showModalClear: true })}
              >
                <span className="glyphicon glyphicon-trash"> Очистить историю</span>
              </button>
              <Modal
                show={this.state.showModalClear}
                onHide={this.closeModalClear}
              >
                <Modal.Header closeButton>
                  <Modal.Title>
                    <span className="glyphicon glyphicon-trash"> Очистить историю</span>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Вы действительно хотите очистить всю историю?</p>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    className="btn btn-default"
                    type="button"
                    onClick={this.closeModalClear}
                  >
                    Закрыть
                  </button>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={this.clearAndClose}
                  >
                    Очистить
                  </button>
                </Modal.Footer>
              </Modal>
            </div>

            <div className="main-menu">
              <div className="row margin-bottom">
                <ul className="nav nav-pills nav-stacked">
                  <li
                    className={this.props.ownProps.location.pathname === '/'
                      ? 'active'
                      : ''
                    }
                  >
                    <Link
                      to={'/'}
                      className="link btn-block"
                    >
                      <span className="glyphicon glyphicon-home"> Главная</span>
                    </Link>
                  </li>
                  <li
                    className={this.props.ownProps.location.pathname === '/deposits'
                      ? 'active'
                      : ''
                    }
                  >
                    <Link
                      to={'/deposits'}
                      className="link btn-block"
                    >
                      <span className="glyphicon glyphicon-usd"> История пополнения</span>
                    </Link>
                  </li>
                  <li
                    className={this.props.ownProps.location.pathname === '/categories'
                      ? 'active'
                      : ''
                    }
                  >
                    <Link
                      to={'/categories'}
                      className="link btn-block"
                    >
                      <span className="glyphicon glyphicon-th-list"> Категории</span>
                    </Link>
                  </li>
                  <li
                    className={this.props.ownProps.location.pathname === '/expenses'
                      ? 'active'
                      : ''
                    }
                  >
                    <Link
                      to={'/expenses'}
                      className="link btn-block"
                    >
                      <span className="glyphicon glyphicon-shopping-cart"> Расходы</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className={
                `row text-center alert ${this.props.unplannedMoney > 0 ?
                  'alert-danger' :
                  'alert-info'}`
              }
            >
              Незапланированные средства<h3><b>{this.props.unplannedMoney}</b></h3>
            </div>
          </div>
          <div
            className="col-md-8 col-md-offset-1 background-table height-100"
          >
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    money: state.money,
    unplannedMoney: state.unplannedMoney,
    ownProps,
  }),
  dispatch => ({
    onClearState: () => {
      dispatch({ type: 'CLEAR_MONEY' });
      dispatch({ type: 'CLEAR_CATEGORY' });
      dispatch({ type: 'CLEAR_EXPENSE' });
      dispatch({ type: 'CLEAR_UNPLANNED_MONEY' });
    },
  }),
)(App);
