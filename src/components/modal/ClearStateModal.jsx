import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { categoriesActions } from '../../reducers/categories';
import { historyActions } from '../../reducers/history';
import { unplannedMoneyActions } from '../../reducers/unplannedMoney';

class ClearStateModal extends Component {
  static propTypes = {
    deleteUnplannedMoney: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    loadCategories: PropTypes.func.isRequired,
    loadHistory: PropTypes.func.isRequired,
    loadUnplannedMoney: PropTypes.func.isRequired,
    showModal: PropTypes.bool,
    unloadCategories: PropTypes.func.isRequired,
    unloadHistory: PropTypes.func.isRequired,
    unloadUnplannedMoney: PropTypes.func.isRequired,
  }

  clearAndClose = () => {
    this.props.unloadCategories();
    this.props.unloadHistory();
    this.props.unloadUnplannedMoney();
    this.props.deleteUnplannedMoney();
    this.props.loadCategories();
    this.props.loadHistory();
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
              <span className="glyphicon glyphicon-trash"></span>{' Очистить все'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Вы действительно хотите очистить всю историю?</p>
          </Modal.Body>
          <Modal.Footer>
            <button
              autoFocus
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
  historyActions,
  unplannedMoneyActions,
);

export default connect(
  null,
  mapDispatchToProps,
)(ClearStateModal);
