import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { List } from 'immutable';
import $ from 'jquery';
import Dropdown from 'react-dropdown';

import DropdownCategory from './dropdown/DropdownCategory';

import { getCategoryList, categoriesActions } from '../reducers/categories';
import { getExpenseList, expensesActions } from '../reducers/expenses';
import { getMoneyList, moneysActions } from '../reducers/moneys';
import { getUnplannedMoney, unplannedMoneyActions } from '../reducers/unplannedMoney';

const DatePicker = require('react-bootstrap-date-picker');
const date = require('date-and-time');

const dayLabels = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
const monthLabels = [
  'Январь', 'Февраль', 'Март', 'Апрель',
  'Май', 'Июнь', 'Июль', 'Август',
  'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

class MainForm extends Component {
  static propTypes = {
    categories: PropTypes.instanceOf(List).isRequired,
    createExpense: PropTypes.func.isRequired,
    createMoney: PropTypes.func.isRequired,
    unplannedMoney: PropTypes.number.isRequired,
    updateCategory: PropTypes.func.isRequired,
    updateUnplannedMoney: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      borderTab: {
        border: '3px double steelblue',
        borderRadius: '3px',
      },
      colorTab1: {
        color: 'black',
      },
      colorTab2: {
        color: 'steelblue',
      },
      dateDeposit: new Date().toISOString(),
      dateExpense: new Date().toISOString(),
      deposit: '',
      expense: '',
      focused: false,
      selectedCategory: { value: '0', label: 'Выберите категорию' },
      selectedDeposit: { value: '0', label: 'Баланса' },
      selectedExpense: { value: '0', label: 'С баланса категории' },
      textErrorDeposit: '',
      textErrorExpense: '',
    };
  }

  getCategories = () => {
    let tmp = [{ value: '0', label: 'Выберите категорию' }];
    const categories = this.props.categories.sort((cat1, cat2) => {
      if (cat1.nameCategory > cat2.nameCategory) return 1;
      if (cat1.nameCategory < cat2.nameCategory) return -1;
      return 0;
    });
    categories.map((category, index) => {
      tmp.push({ value: category.key, label: category.nameCategory });
      return 0;
    });
    return tmp;
  }

  findCategory = (nameCategory) => {
    let tmp = {};
    this.props.categories.map((category, index) => {
      if (category.nameCategory === nameCategory) {
        tmp = category;
      }
      return 0;
    });
    return tmp;
  }

  handleOnChangeDeposit = () => {
    this.setState({
      deposit: this.depositInput.value.replace(/\D/, ''),
    });
  }

  handleOnChangeDateDeposit = (value) => {
    this.setState({
      dateDeposit: value,
    });
  }

  handleOnChangeExpense = () => {
    this.setState({
      expense: this.expenseInput.value.replace(/\D/, ''),
    });
  }

  handleOnChangeDateExpense = (value) => {
    this.setState({
      dateExpense: value,
    });
  }

  createDeposit = () => {
    document.getElementById('create-deposit-button').blur();
    const nameCategory = document.getElementById('dropdown-category-deposit')
      .getElementsByClassName('Dropdown-placeholder')[0].textContent;
    const typeDeposit = document.getElementById('dropdown-deposit')
      .getElementsByClassName('Dropdown-placeholder')[0].textContent;
    const deposit = Number(this.state.deposit);
    const dateOut = date.parse(this.state.dateDeposit, 'YYYY-MM-DD');

    if (deposit > 0) {
      if (typeDeposit === 'Баланса') {
        if (nameCategory === 'Выберите категорию') {
          this.props.createMoney(date.format(dateOut, 'YYYY-MM-DD'), deposit);
          this.props.updateUnplannedMoney(deposit);
          this.setState({
            dateDeposit: new Date().toISOString(),
            deposit: '',
            textErrorDeposit: '',
          });
        } else {
          const category = this.findCategory(nameCategory);
          this.props.createMoney(date.format(dateOut, 'YYYY-MM-DD'), deposit);
          this.props.updateCategory(
            category,
            { moneyCategory: category.moneyCategory + deposit },
          );
          this.setState({
            dateDeposit: new Date().toISOString(),
            deposit: '',
            textErrorDeposit: '',
          });
        }
      } else if (typeDeposit === 'Баланса категории с основного баланса') {
        if (deposit > this.props.unplannedMoney) {
          this.setState({
            deposit: '',
            textErrorDeposit: 'Ошибка! Баланс меньше суммы пополнения.',
          });
          $('#text-error-deposit').slideDown('fast');
          setTimeout(this.hideError, 3000);
        } else if (nameCategory === 'Выберите категорию') {
          this.setState({
            deposit: '',
            textErrorDeposit: 'Ошибка! Выберите категорию.',
          });
          $('#text-error-deposit').slideDown('fast');
          setTimeout(this.hideError, 3000);
        } else {
          const category = this.findCategory(nameCategory);
          this.props.updateCategory(
            category,
            { moneyCategory: deposit },
          );
          this.props.updateUnplannedMoney(-deposit);
          this.setState({
            dateDeposit: new Date().toISOString(),
            deposit: '',
            textErrorDeposit: '',
          });
        }
      } else if (typeDeposit === 'Основного баланса с баланса категории') {
        if (nameCategory === 'Выберите категорию') {
          this.setState({
            deposit: '',
            textErrorDeposit: 'Ошибка! Выберите категорию.',
          });
          $('#text-error-deposit').slideDown('fast');
          setTimeout(this.hideError, 3000);
        } else {
          const category = this.findCategory(nameCategory);
          if (deposit > category.moneyCategory) {
            this.setState({
              deposit: '',
              textErrorDeposit: 'Ошибка! Баланс категории меньше суммы пополнения.',
            });
            $('#text-error-deposit').slideDown('fast');
            setTimeout(this.hideError, 3000);
          } else {
            this.props.updateCategory(
              category,
              { moneyCategory: category.moneyCategory - deposit },
            );
            this.props.updateUnplannedMoney(deposit);
            this.setState({
              dateDeposit: new Date().toISOString(),
              deposit: '',
              textErrorDeposit: '',
            });
          }
        }
      }
    } else {
      this.setState({
        textErrorDeposit: 'Ошибка! Введите сумму пополнения.',
        deposit: '',
      });
      $('#text-error-deposit').slideDown('fast');
      setTimeout(this.hideError, 3000);
    }
  }

  createExpense = () => {
    document.getElementById('create-expense-button').blur();
    const nameCategory = document.getElementById('dropdown-сategory-expense')
      .getElementsByClassName('Dropdown-placeholder')[0].textContent;
    const typeExpense = document.getElementById('dropdown-expense')
      .getElementsByClassName('Dropdown-placeholder')[0].textContent;
    const expense = Number(this.state.expense);
    const dateOut = date.parse(this.state.dateExpense, 'YYYY-MM-DD');

    if (expense > 0) {
      if (typeExpense === 'С баланса категории') {
        if (nameCategory === 'Выберите категорию') {
          this.setState({
            expense: '',
            textErrorExpense: 'Ошибка! Выберите категорию.',
          });
          $('#text-error-expense').slideDown('fast');
          setTimeout(this.hideError, 3000);
        } else {
          const category = this.findCategory(nameCategory);
          if (expense > category.moneyCategory) {
            this.setState({
              expense: '',
              textErrorExpense: 'Ошибка! Сумма расходов превышена.',
            });
            $('#text-error-expense').slideDown('fast');
            setTimeout(this.hideError, 3000);
          } else {
            this.props.createExpense(
              date.format(dateOut, 'YYYY-MM-DD'),
              category.key,
              expense,
              category.nameCategory,
            );
            this.props.updateCategory(
              category,
              {
                moneyCategory: (category.moneyCategory - expense),
              },
            );
            this.setState({
              dateExpense: new Date().toISOString(),
              expense: '',
              textErrorExpense: '',
            });
          }
        }
      } else {
        this.setState({
          expense: '',
          textErrorExpense: 'Ошибка! Неверно заполненны данные.',
        });
        $('#text-error-expense').slideDown('fast');
        setTimeout(this.hideError, 3000);
      }
    } else {
      this.setState({
        expense: '',
        textErrorExpense: 'Ошибка! Введите сумму расходов.',
      });
      $('#text-error-expense').slideDown('fast');
      setTimeout(this.hideError, 3000);
    }
  }

  hideError = () => {
    $('#text-error-deposit').slideUp('slow');
    $('#text-error-expense').slideUp('slow');
  }

  tab1 = () => {
    this.setState({
      borderTab: {
        border: '3px double steelblue',
        borderRadius: '3px',
      },
      colorTab1: {
        color: 'black',
      },
      colorTab2: {
        color: 'steelblue',
      },
    });
  }

  tab2 = () => {
    this.setState({
      borderTab: {
        border: '3px double indianred',
        borderRadius: '3px',
      },
      colorTab1: {
        color: 'indianred',
      },
      colorTab2: {
        color: 'black',
      },
    });
  }

  render() {
    const optionsCategory = this.getCategories();
    const optionsDeposit = [
      { value: '0', label: 'Баланса' },
      { value: '1', label: 'Баланса категории с основного баланса' },
      { value: '2', label: 'Основного баланса с баланса категории' },
    ];
    const optionsExpense = [
      { value: '1', label: 'С баланса категории' },
    ];
    return (
      <div
        className="tabbable"
        style={this.state.borderTab}
      >
        <ul className="nav nav-tabs">
          <li className="active">
            <a
              href="#tab1"
              data-toggle="tab"
              onClick={this.tab1}
              style={this.state.colorTab1}
            >
              Пополнение
            </a>
          </li>
          <li>
            <a
              href="#tab2"
              data-toggle="tab"
              onClick={this.tab2}
              style={this.state.colorTab2}
            >
              Расход
            </a>
          </li>
        </ul>
        <div
          className="tab-content"
          style={{
            backgroundColor: 'white',
          }}
        >
          <div className="tab-pane active" id="tab1" style={{ padding: '10px' }}>
            <div className="row">
              <div className="col-sm-2 col-xs-4">
                <button className="btn vertical-align-middle">
                  Пополнение
                </button>
              </div>
              <div id="dropdown-deposit" className="col-sm-5 col-xs-8">
                <DropdownCategory
                  disabled={false}
                  options={optionsDeposit}
                />
              </div>
              <div className="col-sm-5 col-xs-12 margin-top-xs">
                <input
                  className="form-control text-center"
                  onChange={() => this.handleOnChangeDeposit()}
                  placeholder="Сумма"
                  value={this.state.deposit}
                  maxLength="10"
                  ref={(input) => { this.depositInput = input; }}
                  data-toggle="tooltip"
                  title="Сумма пополнения"
                />
              </div>
            </div>
            <div className="row margin-top">
              <div className="col-sm-2 col-xs-4">
                <button className="btn vertical-align-middle">
                  Категория
                </button>
              </div>
              <div id="dropdown-category-deposit" className="col-sm-5 col-xs-8">
                <DropdownCategory
                  disabled={false}
                  options={optionsCategory}
                />
              </div>
              <div className="col-sm-5 col-xs-12 margin-top-xs">
                <DatePicker
                  className="text-center"
                  dateFormat="YYYY-MM-DD"
                  dayLabels={dayLabels}
                  monthLabels={monthLabels}
                  onChange={this.handleOnChangeDateDeposit}
                  onBlur={() => { this.setState({ focused: false }); }}
                  onFocus={() => { this.setState({ focused: true }); }}
                  showClearButton={false}
                  showTodayButton
                  todayButtonLabel={'Сегодня'}
                  value={this.state.dateDeposit}
                  weekStartsOnMonday
                />
              </div>
            </div>
            <div className="row margin-top">
              <div className="col-sm-8">
                <button
                  className="btn btn-block"
                  id="text-error-deposit"
                  style={{ display: 'none', backgroundColor: 'indianred' }}
                  type="button"
                >
                  {this.state.textErrorDeposit}
                </button>
              </div>
              <div className="col-sm-4">
                <button
                  className="btn btn-primary btn-block margin-top"
                  id="create-deposit-button"
                  onClick={this.createDeposit}
                  type="button"
                >
                  Записать
                </button>
              </div>
            </div>
          </div>

          <div className="tab-pane" id="tab2" style={{ padding: '10px' }}>
            <div className="row">
              <div className="col-sm-2 col-xs-4">
                <button className="btn vertical-align-middle">
                  Расход
                </button>
              </div>
              <div id="dropdown-expense" className="col-sm-5 col-xs-8">
                <DropdownCategory
                  disabled
                  options={optionsExpense}
                />
              </div>
              <div className="col-sm-5 col-xs-12 margin-top-xs">
                <input
                  className="form-control text-center"
                  onChange={() => this.handleOnChangeExpense()}
                  placeholder="Сумма"
                  value={this.state.expense}
                  ref={(input) => { this.expenseInput = input; }}
                  data-toggle="tooltip"
                  title="Сумма расходов"
                />
              </div>
            </div>
            <div className="row margin-top">
              <div className="col-sm-2 col-xs-4">
                <button className="btn vertical-align-middle">
                  Категория
                </button>
              </div>
              <div id="dropdown-сategory-expense" className="col-sm-5 col-xs-8">
                <DropdownCategory
                  disabled={false}
                  options={optionsCategory}
                />
              </div>
              <div className="col-sm-5 col-xs-12 margin-top-xs">
                <DatePicker
                  className="text-center"
                  dateFormat="YYYY-MM-DD"
                  dayLabels={dayLabels}
                  monthLabels={monthLabels}
                  onChange={this.handleOnChangeDateExpense}
                  onBlur={() => { this.setState({ focused: false }); }}
                  onFocus={() => { this.setState({ focused: true }); }}
                  showClearButton={false}
                  showTodayButton
                  todayButtonLabel={'Сегодня'}
                  value={this.state.dateExpense}
                  weekStartsOnMonday
                />
              </div>
            </div>
            <div className="row margin-top">
              <div className="col-sm-8">
                <button
                  className="btn btn-block"
                  id="text-error-expense"
                  style={{ display: 'none', backgroundColor: 'indianred' }}
                  type="button"
                >
                  {this.state.textErrorExpense}
                </button>
              </div>
              <div className="col-sm-4">
                <button
                  className="btn btn-danger btn-block margin-top"
                  id="create-expense-button"
                  onClick={this.createExpense}
                  type="button"
                >
                  Записать
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  getCategoryList,
  getExpenseList,
  getMoneyList,
  getUnplannedMoney,
  (categories, expenses, moneys, unplannedMoney) => ({
    categories,
    expenses,
    moneys,
    unplannedMoney,
  }),
);

const mapDispatchToProps = Object.assign(
  {},
  categoriesActions,
  expensesActions,
  moneysActions,
  unplannedMoneyActions,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainForm);
