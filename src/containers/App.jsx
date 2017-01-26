import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router';

import Input from '../components/Input';
import CashInfoTable from '../components/CashInfoTable';
import CategoriesTable from '../components/CategoriesTable';

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
    this.props.onClearMoney(this.props.unplannedMoney);
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
              <Button
                bsStyle="primary"
                className="btn-block"
                onClick={() => this.setState({ showModalClear: true })}
              >
                <span className="glyphicon glyphicon-trash"> Очистить историю</span>
              </Button>
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
                  <Button onClick={this.closeModalClear}>
                    Закрыть
                  </Button>
                  <Button bsStyle="danger" onClick={this.clearAndClose}>
                    Очистить
                  </Button>
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
                    className={this.props.ownProps.location.pathname === '/history'
                      ? 'active'
                      : ''
                    }
                  >
                    <Link
                      to={'/history'}
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
    onClearMoney: (deleteMoney) => {
      dispatch({ type: 'CLEAR_MONEY' });
      dispatch({ type: 'CLEAR_CATEGORY' });
      dispatch({ type: 'CLEAR_UNPLANNED_MONEY' });
    },
  }),
)(App);
