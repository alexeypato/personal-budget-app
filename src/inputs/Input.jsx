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
        this.setState({ value: '' });
        this.setState({ textError: 'Error! Invalid sum of money.' });
      } else {
        this.props.addCash(this.state.value, this.state.date);
        this.setState({
          value: '',
          textError: '',
          date: new Date().toISOString(),
        });
      }
    } else {
      this.setState({ textError: 'Error! Enter sum of money.' });
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
          Add money
        </Button>

        <Modal
          show={this.state.showModal}
          onHide={this.closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Please, specify the sum and date of transfer of money!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-xs-4 col-xs-offset-1">
                  <input
                    className="form-control"
                    onChange={() => this.handleOnChangeInput()}
                    placeholder={
                      this.state.textError ?
                        this.state.textError :
                        'Sum of money'
                    }
                    value={this.state.value}
                    maxLength="10"
                    ref="cash"
                  />
                  <DatePicker
                    onChange={this.handleOnChangeDate}
                    value={this.state.date}
                    onFocus={() => { this.setState({ focused: true }); }}
                    onBlur={() => { this.setState({ focused: false }); }}
                    dateFormat="YYYY-MM-DD"
                    showClearButton={false}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>
              Close
            </Button>
            <Button onClick={this.saveAndClose}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
