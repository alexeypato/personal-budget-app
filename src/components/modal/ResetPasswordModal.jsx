import React, { Component, PropTypes } from 'react';
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
              className="form-control text-center"
              onChange={() => this.handleOnChangeEmail()}
              placeholder={this.state.textErrorEmail || 'Email'}
              ref={(input) => { this.inputEmail = input; }}
              value={this.state.email}
            />
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
