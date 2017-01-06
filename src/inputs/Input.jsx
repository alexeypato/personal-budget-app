import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import CustomControl from '../components/CustomControl';

const DatePicker = require('react-bootstrap-date-picker');

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      textError: '',
      date: new Date().toISOString(),
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
        this.props.addCash(this.state.value, this.state.date);
        this.setState({ value: '' });
        this.setState({ textError: '' });
      }
    } else {
      this.setState({ textError: 'Error! Enter sum of money.' });
    }
  };

  handleOnChangeDate = (value) => {
    this.setState({
      date: value,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3 text-center padding-margin-none">
            <input
              className="form-control text-center"
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
          </div>
          <div className="col-md-1 padding-margin-none">
            <DatePicker
              customControl={<CustomControl />}
              onChange={this.handleOnChangeDate}
              value={this.state.date}
              dateFormat="YYYY-MM-DD"
            />
          </div>
          <div className="col-md-1">
            <Button
              onClick={() => this.handleAddCash()}
              bsStyle="primary"
              className="btn-block"
            >
              Place
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
