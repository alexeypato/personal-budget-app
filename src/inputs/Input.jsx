import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';

const moment = require('moment');
const DatePicker = require('react-datepicker');

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      textError: '',
      startDate: moment(),
    };
  }

  handleOnChangeInput = () => {
    this.setState({
      value: ReactDOM.findDOMNode(this.refs.cash).value.replace(/\D/, ''),
    });
  };

  handleAddCash = () => {
    if (this.state.value.length > 0) {
      if (this.state.value.replace(/\d/g, '').length) {
        this.setState({ value: '' });
        this.setState({ textError: 'Error! Invalid sum of money.' });
      } else {
        this.props.addCash(this.state.value);
        this.setState({ value: '' });
        this.setState({ textError: '' });
      }
    } else {
      this.setState({ textError: 'Error! Enter sum of money.' });
    }
  };

  handleOnChangeDate = (date) => {
    this.setState({
      startDate: date,
    });
  };

  render() {
    return (
      <div>
        <div className="col-md-9">
          <input
            className="form-control place-form-control"
            onChange={() => this.handleOnChangeInput()}
            placeholder={this.state.textError ? this.state.textError : 'Sum of money'}
            value={this.state.value}
            ref="cash"
          />
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleOnChangeDate}
            inline
          />
        </div>
        <Button
          onClick={() => this.handleAddCash()}
          bsStyle="primary"
          className="add-btn"
        >
          Place
        </Button>
      </div>
    );
  }
}
