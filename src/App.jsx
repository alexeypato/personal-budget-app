import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Input from './inputs/Input';
import CashInfoTable from './components/CashInfoTable';

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
    };
  }

  addCash = (value) => {
    const accountHistory = this.state.accountHistory;
    const unplannedCash = localStorage.unplannedCash = +this.state.unplannedCash + +value;
    const date = new Date();
    const newCash = {
      id: accountHistory.length + 1,
      cash: value,
      date: date.toDateString(),
    };

    accountHistory.push(newCash);

    localStorage.setItem('accountHistory', JSON.stringify(accountHistory));

    this.setState({ accountHistory });
    this.setState({ unplannedCash });
  };

  render() {
    return (
      <Grid>
        <code>
          <Row className="show-grid">
            <Col xs={6} md={4}>
              <h4>To place money :</h4>
              <Input addCash={this.addCash} />
            </Col>
            <Col xs={12} md={8}>
              <CashInfoTable accountHistory={this.state.accountHistory} />
            </Col>
          </Row>
          <Row className="show-grid">
            <Col className="text-center">
              <h1>UNPLANNED MONEY: {this.state.unplannedCash}</h1>
            </Col>
          </Row>
        </code>
      </Grid>
    );
  }
}
