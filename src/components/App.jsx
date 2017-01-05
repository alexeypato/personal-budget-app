import React from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import Input from '../inputs/Input';
import CashInfoTable from './CashInfoTable';

// const moment = require('moment');
// const DatePicker = require('react-datepicker');

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      accountHistory: JSON.parse(localStorage.getItem('accountHistory')) ?
        JSON.parse(localStorage.getItem('accountHistory')) :
        [],
      unplannedCash: Number(localStorage.getItem('unplannedCash')) ?
        Number(localStorage.getItem('unplannedCash')) :
        0,
      // startDate: moment(),
    };
  }

  addCash = (value, startDate) => {
    const accountHistory = this.state.accountHistory;
    const unplannedCash = localStorage.unplannedCash = +this.state.unplannedCash + +value;
    // const date = this.state.startDate.format('YYYY-MM-DD');
    const date = startDate.format('YYYY-MM-DD');
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

  /* handleOnChangeDate = (date) => {
    this.setState({
      startDate: date,
    });
  };*/

  handleCleanAccountHistory = () => {
    this.setState({
      accountHistory: [],
      unplannedCash: 0,
    });
  };

  render() {
    return (
      <Grid>
        <Row className="main-row show-grid">
          <Col md={6}>
            <Button
              bsStyle="danger"
              onClick={() => this.handleCleanAccountHistory()}
            >
              Clean accountHistory
            </Button>
            <h4><b>To place money :</b></h4>
            <Input addCash={this.addCash} />
          </Col>
          <Col md={6}>
            <CashInfoTable accountHistory={this.state.accountHistory} />
          </Col>
        </Row>
        <Row className="show-grid">
          <Col className="text-center">
            <div className={`alert ${this.state.unplannedCash > 0 ? 'alert-danger' : 'alert-success'}`}>
              <h1>UNPLANNED MONEY: {this.state.unplannedCash}</h1>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
