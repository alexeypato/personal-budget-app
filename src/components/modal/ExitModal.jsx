import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { authActions, getAuth } from '../../reducers/auth';

export class ExitModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool,
    signOut: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.showModal}
          onHide={this.props.closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <span className="glyphicon glyphicon-log-out"></span>{' Выйти'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Вы действительно хотите выйти из системы?</p>
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
              onClick={this.props.signOut}
            >
              Выйти
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = Object.assign(
  {},
  authActions,
);

export default connect(
  null,
  mapDispatchToProps,
)(ExitModal);
