import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { List } from 'immutable';
import $ from 'jquery';
import Dropdown from 'react-dropdown';

import DropdownCategory from './dropdown/DropdownCategory';

import { getCategoryList, categoriesActions } from '../reducers/categories';
import { historyActions } from '../reducers/history';
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
    createHistory: PropTypes.func.isRequired,
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
      categoryErrorDeposit: '',
      categoryErrorExpense: '',
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
      selectedDeposit: { value: '0', label: 'Баланс' },
      selectedExpense: { value: '0', label: 'Категория' },
      textErrorDeposit: '',
      textErrorExpense: '',
    };
  }

  componentDidMount = () => {
    $('[data-toggle="popover"]').popover({
      placement: 'bottom',
      trigger: 'hover',
    });
  }

  componentDidUpdate = () => {
    if (this.state.textErrorDeposit !== '') {
      $(document).ready(() => {
        $('#input-deposit').popover('show');
        setTimeout(this.hideInputErrorDeposit, 3000);
      });
    }
    if (this.state.categoryErrorDeposit !== '') {
      $(document).ready(() => {
        $('#dropdown-category-deposit').popover('show');
        setTimeout(this.hideCategoryErrorDeposit, 3000);
      });
    }
    if (this.state.textErrorExpense !== '') {
      $(document).ready(() => {
        $('#input-expense').popover('show');
        setTimeout(this.hideInputErrorExpense, 3000);
      });
    }
    if (this.state.categoryErrorExpense !== '') {
      $(document).ready(() => {
        $('#dropdown-сategory-expense').popover('show');
        setTimeout(this.hideCategoryErrorExpense, 3000);
      });
    }
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
      if (typeDeposit === 'Баланс') {
        if (nameCategory === 'Выберите категорию') {
          this.props.createHistory(
            date.format(dateOut, 'YYYY-MM-DD'),
            '0',
            deposit,
            '-',
            'Пополнение',
          );
          this.props.updateUnplannedMoney(deposit);
          this.setState({
            dateDeposit: new Date().toISOString(),
            deposit: '',
          });
        } else {
          const category = this.findCategory(nameCategory);
          this.props.createHistory(
            date.format(dateOut, 'YYYY-MM-DD'),
            category.key,
            deposit,
            category.nameCategory,
            'Пополнение',
          );
          this.props.updateCategory(
            category,
            { moneyCategory: category.moneyCategory + deposit },
          );
          this.setState({
            dateDeposit: new Date().toISOString(),
            deposit: '',
          });
        }
      } else if (typeDeposit === 'Баланс --> Категория') {
        if (deposit > this.props.unplannedMoney) {
          this.setState({
            deposit: '',
            textErrorDeposit: 'Ошибка! Баланс меньше суммы пополнения.',
          });
        } else if (nameCategory === 'Выберите категорию') {
          this.setState({
            categoryErrorDeposit: 'Ошибка! Выберите категорию.',
          });
        } else {
          const category = this.findCategory(nameCategory);
          this.props.createHistory(
            date.format(dateOut, 'YYYY-MM-DD'),
            category.key,
            deposit,
            `Баланс --> ${category.nameCategory}`,
            'Перевод',
          );
          this.props.updateCategory(
            category,
            { moneyCategory: category.moneyCategory + deposit },
          );
          this.props.updateUnplannedMoney(-deposit);
          this.setState({
            dateDeposit: new Date().toISOString(),
            deposit: '',
          });
        }
      } else if (typeDeposit === 'Категория --> Баланс') {
        if (nameCategory === 'Выберите категорию') {
          this.setState({
            categoryErrorDeposit: 'Ошибка! Выберите категорию.',
          });
        } else {
          const category = this.findCategory(nameCategory);
          if (deposit > category.moneyCategory) {
            this.setState({
              deposit: '',
              textErrorDeposit: 'Ошибка! Баланс категории меньше суммы пополнения.',
            });
          } else {
            this.props.createHistory(
              date.format(dateOut, 'YYYY-MM-DD'),
              category.key,
              deposit,
              `${category.nameCategory} ---> Баланс`,
              'Перевод',
            );
            this.props.updateCategory(
              category,
              { moneyCategory: category.moneyCategory - deposit },
            );
            this.props.updateUnplannedMoney(deposit);
            this.setState({
              dateDeposit: new Date().toISOString(),
              deposit: '',
            });
          }
        }
      }
    } else {
      this.setState({
        textErrorDeposit: 'Ошибка! Введите сумму пополнения.',
        deposit: '',
      });
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
      if (typeExpense === 'Категория') {
        if (nameCategory === 'Выберите категорию') {
          this.setState({
            categoryErrorExpense: 'Ошибка! Выберите категорию.',
          });
        } else {
          const category = this.findCategory(nameCategory);
          if (expense > category.moneyCategory) {
            this.setState({
              expense: '',
              textErrorExpense: 'Ошибка! Сумма расходов превышена.',
            });
          } else {
            this.props.createHistory(
              date.format(dateOut, 'YYYY-MM-DD'),
              category.key,
              expense,
              category.nameCategory,
              'Расход',
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
            });
          }
        }
      } else if (typeExpense === 'Баланс') {
        if (nameCategory === 'Выберите категорию') {
          this.setState({
            categoryErrorExpense: 'Ошибка! Выберите категорию.',
          });
        } else if (expense > this.props.unplannedMoney) {
          this.setState({
            expense: '',
            textErrorExpense: 'Ошибка! Сумма расходов превышена.',
          });
        } else {
          const category = this.findCategory(nameCategory);
          this.props.createHistory(
            date.format(dateOut, 'YYYY-MM-DD'),
            category.key,
            expense,
            category.nameCategory,
            'Перевод',
          );
          this.props.createHistory(
            date.format(dateOut, 'YYYY-MM-DD'),
            category.key,
            expense,
            category.nameCategory,
            'Расход',
          );
          this.props.updateUnplannedMoney(-expense);
          this.setState({
            dateExpense: new Date().toISOString(),
            expense: '',
          });
        }
      }
    } else {
      this.setState({
        expense: '',
        textErrorExpense: 'Ошибка! Введите сумму расходов.',
      });
    }
  }

  hideInputErrorDeposit = () => {
    $('#input-deposit').popover('hide');
    this.setState({
      textErrorDeposit: '',
    });
  }

  hideInputErrorExpense = () => {
    $('#input-expense').popover('hide');
    this.setState({
      textErrorExpense: '',
    });
  }

  hideCategoryErrorDeposit = () => {
    $('#dropdown-category-deposit').popover('hide');
    this.setState({
      categoryErrorDeposit: '',
    });
  }

  hideCategoryErrorExpense = () => {
    $('#dropdown-сategory-expense').popover('hide');
    this.setState({
      categoryErrorExpense: '',
    });
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
      { value: '0', label: 'Баланс' },
      { value: '1', label: 'Баланс --> Категория' },
      { value: '2', label: 'Категория --> Баланс' },
    ];
    const optionsExpense = [
      { value: '0', label: 'Категория' },
      { value: '1', label: 'Баланс' },
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
                  data-toggle="popover"
                  data-content={this.state.textErrorDeposit}
                  id="input-deposit"
                  maxLength="10"
                  onChange={() => this.handleOnChangeDeposit()}
                  placeholder="Сумма"
                  ref={(input) => { this.depositInput = input; }}
                  value={this.state.deposit}
                />
              </div>
            </div>
            <div className="row margin-top">
              <div className="col-sm-2 col-xs-4">
                <button className="btn vertical-align-middle">
                  Категория
                </button>
              </div>
              <div
                className="col-sm-5 col-xs-8"
                data-toggle="popover"
                data-content={this.state.categoryErrorDeposit}
                id="dropdown-category-deposit"
              >
                <DropdownCategory
                  disabled={false}
                  options={optionsCategory}
                />
              </div>
              <div className="col-sm-5 col-xs-12 margin-top-xs">
                <DatePicker
                  className="text-center"
                  cellPadding="4px"
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
              <div className="col-sm-4 col-sm-offset-8">
                <button
                  className="btn btn-primary btn-block"
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
                  disabled={false}
                  options={optionsExpense}
                />
              </div>
              <div className="col-sm-5 col-xs-12 margin-top-xs">
                <input
                  className="form-control text-center"
                  data-toggle="popover"
                  data-content={this.state.textErrorExpense}
                  id="input-expense"
                  onChange={() => this.handleOnChangeExpense()}
                  placeholder="Сумма"
                  value={this.state.expense}
                  ref={(input) => { this.expenseInput = input; }}
                />
              </div>
            </div>
            <div className="row margin-top">
              <div className="col-sm-2 col-xs-4">
                <button className="btn vertical-align-middle">
                  Категория
                </button>
              </div>
              <div
                className="col-sm-5 col-xs-8"
                data-toggle="popover"
                data-content={this.state.categoryErrorExpense}
                id="dropdown-сategory-expense"
              >
                <DropdownCategory
                  disabled={false}
                  options={optionsCategory}
                />
              </div>
              <div className="col-sm-5 col-xs-12 margin-top-xs">
                <DatePicker
                  className="text-center"
                  cellPadding="4px"
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
              <div className="col-sm-4 col-sm-offset-8">
                <button
                  className="btn btn-danger btn-block"
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
  getUnplannedMoney,
  (categories, unplannedMoney) => ({
    categories,
    unplannedMoney,
  }),
);

const mapDispatchToProps = Object.assign(
  {},
  categoriesActions,
  historyActions,
  unplannedMoneyActions,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainForm);
