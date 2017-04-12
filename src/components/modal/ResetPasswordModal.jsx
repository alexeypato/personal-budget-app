import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

class ResetPasswordModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
    showModal: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      textErrorEmail: '',
    };
  }

  handleOnChangeEmail = () => {
    this.setState({
      email: this.inputEmail.value,
    });
  }

  sendAndClose = () => {
    document.getElementById('reset-email-send').blur();
    const trueEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
    this.setState({
      textErrorEmail: '',
    });
    const email = this.state.email;
    let flag = false;
    if (!trueEmail.test(email)) {
      this.setState({
        email: '',
        textErrorEmail: 'Ошибка! Введите email.',
      });
      flag = true;
    }
    if (!flag) {
      this.props.resetPassword(email);
      this.props.closeModal();
    }
  };

  runScript = (e) => {
    if (e.which === 13 || e.keyCode === 13) {
      this.sendAndClose();
      return false;
    }
    return true;
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
              <span className="glyphicon glyphicon-info-sign"></span>{' Восстановление пароля'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              autoFocus
              className="form-control text-center"
              onChange={() => this.handleOnChangeEmail()}
              onKeyPress={e => this.runScript(e)}
              placeholder={this.state.textErrorEmail || 'Email'}
              ref={(input) => { this.inputEmail = input; }}
              value={this.state.email}
            />
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
              id="reset-email-send"
              type="button"
              onClick={this.sendAndClose}
            >
              Восстановить
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ResetPasswordModal;
