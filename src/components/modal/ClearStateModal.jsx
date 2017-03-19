import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { categoriesActions } from '../../reducers/categories';
import { expensesActions } from '../../reducers/expenses';
import { moneysActions } from '../../reducers/moneys';
import { unplannedMoneyActions } from '../../reducers/unplannedMoney';

class ClearStateModal extends Component {
  static propTypes = {
    deleteUnplannedMoney: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    loadCategories: PropTypes.func.isRequired,
    loadExpenses: PropTypes.func.isRequired,
    loadMoneys: PropTypes.func.isRequired,
    loadUnplannedMoney: PropTypes.func.isRequired,
    showModal: PropTypes.bool,
    unloadCategories: PropTypes.func.isRequired,
    unloadExpenses: PropTypes.func.isRequired,
    unloadMoneys: PropTypes.func.isRequired,
    unloadUnplannedMoney: PropTypes.func.isRequired,
  }

  clearAndClose = () => {
    this.props.unloadCategories();
    this.props.unloadExpenses();
    this.props.unloadMoneys();
    this.props.unloadUnplannedMoney();
    this.props.deleteUnplannedMoney();
    this.props.loadCategories();
    this.props.loadExpenses();
    this.props.loadMoneys();
    this.props.loadUnplannedMoney();
    this.props.closeModal();
  };

  render() {
    return (
      <div>
        <Modal
          show={this.props.showModal}
          onHide={this.props.closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <span className="glyphicon glyphicon-trash"></span> Очистить все
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Вы действительно хотите очистить всю историю?</p>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-default"
              type="button"
              onClick={this.props.closeModal}
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
    );
  }
}

const mapDispatchToProps = Object.assign(
  {},
  categoriesActions,
  expensesActions,
  moneysActions,
  unplannedMoneyActions,
);

export default connect(
  null,
  mapDispatchToProps,
)(ClearStateModal);
