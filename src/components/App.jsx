import React from 'react';
import { Button } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';
import Input from '../inputs/Input';
import CashInfoTable from './CashInfoTable';
import CategoriesTable from './CategoriesTable';

const date = require('date-and-time');

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
      /* categoriesData: JSON.parse(localStorage.getItem('categoriesData')) ?
        JSON.parse(localStorage.getItem('categoriesData')) :
        [],*/
      categoriesData: [
        {
          id: 0,
          nameCategory: '111',
          moneyPlanned: 111,
        },
      ],
    };
  }

  addCash = (value, startDate) => {
    const accountHistory = this.state.accountHistory;
    const unplannedCash = localStorage.unplannedCash =
      +this.state.unplannedCash + +value;
    const dateOut = date.parse(startDate, 'YYYY-MM-DD');
    const newCash = {
      id: accountHistory.length + 1,
      cash: value,
      date: date.format(dateOut, 'YYYY-MM-DD'),
    };

    accountHistory.push(newCash);

    localStorage.setItem('accountHistory', JSON.stringify(accountHistory));

    this.setState({
      accountHistory,
      unplannedCash,
    });
  };

  /* addCategory = () => {
    const categoriesData = this.state.categoriesData;
    const newCategory = {
      id: categoriesData.length + 1,
      nameCategory: '',
      moneyPlanned: 0,
    };

    categoriesData.push(newCategory);

    localStorage.setItem('categoriesData', JSON.stringify(this.state.categoriesData));
    this.setState({ categoriesData });
  };*/

  handleCleanAccountHistory = () => {
    this.refs.dialog.show({
      title: 'Clear accountHistory',
      body: 'You are precisely sure that you want to remove all history?',
      actions: [
        Dialog.CancelAction(),
        Dialog.Action(
          'ОК',
          () => {
            this.setState({
              accountHistory: [],
              unplannedCash: 0,
            });
            localStorage.unplannedCash = 0;
            localStorage.setItem('accountHistory', JSON.stringify([]));
          },
          'btn-danger',
          ),
      ],
      bsSize: 'small',
      onHide: (dialog) => {
        dialog.hide();
      },
    });
  };

  render() {
    return (
      <div className="container">

        <div className="row main-row place-panel">
          <div className="col-md-6">

            <div className="row">
              <h4><b>To place money :</b></h4>
            </div>

            <div className="row">
              <Input addCash={this.addCash} />
            </div>

            <div className="row clear-row">
              <div className="col-md-6">
                <Button
                  bsStyle="danger"
                  className="btn-block"
                  onClick={() => this.handleCleanAccountHistory()}
                >
                  Clear accountHistory
                </Button>
                <Dialog ref="dialog" />
              </div>
            </div>

          </div>

          <div className="col-md-6 text-center">
            <CashInfoTable accountHistory={this.state.accountHistory} />
          </div>
        </div>

        <div
          className={
            `row text-center alert ${this.state.unplannedCash > 0 ?
              'alert-danger' :
              'alert-success'}`
          }
        >
          <h1>UNPLANNED MONEY: {this.state.unplannedCash}</h1>
        </div>
        <div className="row">
          <CategoriesTable
            categoriesData={this.state.categoriesData}
            /* addCategory={this.addCategory}*/
          />
        </div>
      </div>
    );
  }
}
