import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Input from '../inputs/Input';
import CashInfoTable from '../components/CashInfoTable';
import '../assets/stylesheets/app.scss';

const moment = require('moment');
const DatePicker = require('react-datepicker');

export default class App extends React.Component {

  constructor(props) {
    super(props);

    // localStorage.clear();

    this.state = {
      accountHistory: JSON.parse(localStorage.getItem('accountHistory')) ?
        JSON.parse(localStorage.getItem('accountHistory')) :
        [],
      unplannedCash: Number(localStorage.getItem('unplannedCash')) ?
        Number(localStorage.getItem('unplannedCash')) :
        0,
      startDate: moment(),
    };
  }

  addCash = (value) => {
    const accountHistory = this.state.accountHistory;
    const unplannedCash = localStorage.unplannedCash = +this.state.unplannedCash + +value;
    const date = this.state.startDate.format('DD-MM-YYYY');
    const newCash = {
      id: accountHistory.length + 1,
      cash: value,
      date: date.toString(),
    };

    accountHistory.push(newCash);

    localStorage.setItem('accountHistory', JSON.stringify(accountHistory));

    this.setState({ accountHistory });
    this.setState({ unplannedCash });
  };

  handleOnChangeDate = (date) => {
    this.setState({
      startDate: date,
    });
  };

  render() {
    return (
      <div className="root">
        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={4}>
              <div className="alert">
                <h4>To place money :</h4>
                <Input addCash={this.addCash} />
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleOnChangeDate}
                  inline
                />
              </div>
            </Col>
            <Col xs={12} md={8}>
              <CashInfoTable accountHistory={this.state.accountHistory} />
            </Col>
          </Row>
          <Row className="show-grid">
            <Col className="text-center">
              <div className="alert alert-danger">
                <h1>UNPLANNED MONEY: {this.state.unplannedCash}</h1>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
