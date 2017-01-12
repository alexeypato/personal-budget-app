import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal } from 'react-bootstrap';

const DatePicker = require('react-bootstrap-date-picker');

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      textError: '',
      date: new Date().toISOString(),
      focused: false,
      showModal: false,
    };
  }

  handleOnChangeInput = () => {
    this.setState({
      value: ReactDOM.findDOMNode(this.refs.cash).value.replace(/\D/, ''),
    });
  }

  handleOnChangeDate = (value) => {
    this.setState({
      date: value,
    });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  saveAndClose = () => {
    if (this.state.value.length > 0) {
      if (this.state.value.replace(/\d/g, '').length) {
        this.setState({
          value: '',
          textError: 'Ошибка! Неверная сумма средств.',
        });
      } else {
        this.props.addCash(this.state.value, this.state.date);
        this.setState({
          value: '',
          textError: '',
          date: new Date().toISOString(),
        });
        this.closeModal();
      }
    } else {
      this.setState({ textError: 'Ошибка! Введите сумму средств.' });
    }
  }

  render() {
    return (
      <div>
        <Button
          onClick={() => this.setState({ showModal: true })}
          bsStyle="primary"
          className="btn-block"
        >
          Внести средства
        </Button>

        <Modal
          show={this.state.showModal}
          onHide={this.closeModal}
          bsSize="small"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Введите сумму и дату поступления средств!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              className="form-control text-center margin-bottom"
              onChange={() => this.handleOnChangeInput()}
              placeholder={
                this.state.textError ?
                  this.state.textError :
                  'Сумма средств'
              }
              value={this.state.value}
              maxLength="10"
              ref="cash"
            />
            <DatePicker
              className="text-center"
              onChange={this.handleOnChangeDate}
              value={this.state.date}
              onFocus={() => { this.setState({ focused: true }); }}
              onBlur={() => { this.setState({ focused: false }); }}
              dateFormat="YYYY-MM-DD"
              showClearButton={false}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>
              Закрыть
            </Button>
            <Button bsStyle="primary" onClick={this.saveAndClose}>
              Сохранить
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
