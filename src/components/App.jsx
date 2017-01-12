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
      categoriesData: JSON.parse(localStorage.getItem('categoriesData')) ?
        JSON.parse(localStorage.getItem('categoriesData')) :
        [],
      visibleHistory: false,
      visibleCategory: true,
      colorHistory: 'warning',
      colorCategory: 'primary',
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

  addCategory = (nameCategory, cashCategory) => {
    const categoriesData = this.state.categoriesData;
    const unplannedCash = localStorage.unplannedCash =
      +this.state.unplannedCash - +cashCategory;
    let id = categoriesData.length + 1;
    for (let i = 0; i < categoriesData.length; i += 1) {
      if (categoriesData[i].id >= id) {
        id = categoriesData[i].id + 1;
      }
    }
    const newCategory = {
      id: +id,
      nameCategory: nameCategory.toString(),
      moneyPlanned: cashCategory,
    };

    categoriesData.push(newCategory);

    localStorage.setItem('categoriesData', JSON.stringify(this.state.categoriesData));
    this.setState({
      categoriesData,
      unplannedCash,
    });
  };

  deleteCategory = (id) => {
    const categoriesData = this.state.categoriesData;
    for (let i = 0; i < categoriesData.length; i += 1) {
      if (categoriesData[i].id === +id) {
        this.refs.deleteCategoryDialog.show({
          title: 'Delete category',
          body: `You precisely want to remove category (${categoriesData[i].nameCategory})?`,
          actions: [
            Dialog.CancelAction(),
            Dialog.Action(
              'ОК',
              () => {
                categoriesData.splice(i, 1);
                localStorage.setItem('categoriesData', JSON.stringify(this.state.categoriesData));
                this.setState({ categoriesData });
              },
              'btn-danger',
              ),
          ],
          bsSize: 'small',
          onHide: (dialog) => {
            dialog.hide();
          },
        });
      }
    }
  };

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
              categoriesData: [],
              unplannedCash: 0,
            });
            localStorage.unplannedCash = 0;
            localStorage.setItem('accountHistory', JSON.stringify([]));
            localStorage.setItem('categoriesData', JSON.stringify([]));
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

  handleViewHistory = () => {
    this.setState({
      visibleHistory: false,
      visibleCategory: true,
      colorHistory: 'warning',
      colorCategory: 'primary',
    });
  };

  handleViewCategory = () => {
    this.setState({
      visibleHistory: true,
      visibleCategory: false,
      colorHistory: 'primary',
      colorCategory: 'warning',
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-2">
            <div className="row margin-bottom">
              <Input addCash={this.addCash} />
            </div>

            <div className="row margin-bottom">
              <Button
                bsStyle="danger"
                className="btn-block"
                onClick={() => this.handleCleanAccountHistory()}
              >
                Clear accountHistory
              </Button>
              <Dialog ref="dialog" />
            </div>
            <div className="main-menu">
              <div className="row margin-bottom">
                <Button
                  bsStyle={this.state.colorHistory}
                  className="btn-block"
                  onClick={() => this.handleViewHistory()}
                >
                  History
                </Button>
              </div>
              <div className="row margin-bottom">
                <Button
                  bsStyle={this.state.colorCategory}
                  className="btn-block"
                  onClick={() => this.handleViewCategory()}
                >
                  Category
                </Button>
              </div>
            </div>
            <div
              className={
                `row text-center alert ${this.state.unplannedCash > 0 ?
                  'alert-danger' :
                  'alert-success'}`
              }
            >
              UNPLANNED MONEY<h3><b>{this.state.unplannedCash}</b></h3>
            </div>
          </div>

          <div className="col-xs-8 col-xs-offset-1" hidden={this.state.visibleHistory}>
            <CashInfoTable accountHistory={this.state.accountHistory} />
          </div>

          <div className="col-xs-8 col-xs-offset-1" hidden={this.state.visibleCategory}>
            <CategoriesTable
              categoriesData={this.state.categoriesData}
              addCategory={this.addCategory}
              deleteCategory={this.deleteCategory}
              unplannedCash={this.state.unplannedCash}
            />
            <Dialog ref="deleteCategoryDialog" />
          </div>
        </div>
      </div>
    );
  }
}
