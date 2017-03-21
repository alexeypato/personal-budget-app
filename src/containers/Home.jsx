import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { List } from 'immutable';
import $ from 'jquery';

import CategoryModal from '../components/modal/CategoryModal';
import MainForm from '../components/MainForm';

import { getCategoryList, categoriesActions } from '../reducers/categories';
import { getExpenseList, expensesActions } from '../reducers/expenses';
import { getMoneyList, moneysActions } from '../reducers/moneys';
import { getUnplannedMoney, unplannedMoneyActions } from '../reducers/unplannedMoney';

class Home extends Component {
  static propTypes = {
    // children: PropTypes.object.isRequired,
    categories: PropTypes.instanceOf(List).isRequired,
    loadCategories: PropTypes.func.isRequired,
    loadExpenses: PropTypes.func.isRequired,
    loadMoneys: PropTypes.func.isRequired,
    loadUnplannedMoney: PropTypes.func.isRequired,
    moneys: PropTypes.instanceOf(List).isRequired,
    unloadCategories: PropTypes.func.isRequired,
    unloadExpenses: PropTypes.func.isRequired,
    unloadMoneys: PropTypes.func.isRequired,
    unloadUnplannedMoney: PropTypes.func.isRequired,
    unplannedMoney: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      category: {},
      filtrTipHistory: 'Все операции',
      isDeleteCategory: false,
      isEditCategory: false,
      refreshTable: false,
      showCategoryModal: false,
    };
  }

  componentWillMount = () => {
    this.props.loadCategories();
    this.props.loadExpenses();
    this.props.loadMoneys();
    this.props.loadUnplannedMoney();
  }

  componentDidMount = () => {
    this.dataTableCreate();
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      refreshTable: true,
    });
  }

  componentDidUpdate = () => {
    if (this.state.refreshTable) {
      this.dataTableCreate();
      this.setState({
        refreshTable: false,
      });
    }
  }

  componentWillUnmount = () => {
    this.props.unloadCategories();
    this.props.unloadExpenses();
    this.props.unloadMoneys();
    this.props.unloadUnplannedMoney();
  }

  getTotalAccountBalance = () => {
    let tmp = 0;
    this.props.moneys.map((money, index) => {
      tmp += money.money;
      return 0;
    });
    return tmp;
  }

  getTotalAccountExpense = () => {
    let tmp = 0;
    this.props.expenses.map((expense, index) => {
      tmp += expense.moneyExpense;
      return 0;
    });
    return tmp;
  }

  dataTableCreate = () => {
    $('#data-table-categories').dataTable({
      bLengthChange: false,
      iDisplayLength: 10,
      info: false,
      language: {
        processing: 'Подождите...',
        search: 'Поиск:',
        lengthMenu: 'Показать _MENU_ записей',
        info: 'Записи с _START_ до _END_ из _TOTAL_ записей',
        infoEmpty: 'Записи с 0 до 0 из 0 записей',
        infoFiltered: '(отфильтровано из _MAX_ записей)',
        infoPostFix: '',
        loadingRecords: 'Загрузка записей...',
        zeroRecords: 'Записи отсутствуют.',
        emptyTable: 'В таблице отсутствуют данные',
        paginate: {
          first: '1',
          previous: '<',
          next: '>',
          last: '...',
        },
        aria: {
          sortAscending: ': активировать для сортировки столбца по возрастанию',
          sortDescending: ': активировать для сортировки столбца по убыванию',
        },
      },
      order: [[0, 'ask']],
      stateSave: true,
    });
    $('#data-table-history').dataTable({
      bLengthChange: false,
      iDisplayLength: 10,
      language: {
        processing: 'Подождите...',
        search: 'Поиск:',
        lengthMenu: 'Показать _MENU_ записей',
        info: 'Записи с _START_ до _END_ из _TOTAL_ записей',
        infoEmpty: 'Записи с 0 до 0 из 0 записей',
        infoFiltered: '(отфильтровано из _MAX_ записей)',
        infoPostFix: '',
        loadingRecords: 'Загрузка записей...',
        zeroRecords: 'Записи отсутствуют.',
        emptyTable: 'В таблице отсутствуют данные',
        paginate: {
          first: '1',
          previous: '<',
          next: '>',
          last: '...',
        },
      },
      order: [[3, 'desc']],
      stateSave: true,
    });
  }

  showCreateCategoryModal = () => {
    this.setState({
      category: {},
      isDeleteCategory: false,
      isEditCategory: false,
      showCategoryModal: true,
    });
    document.getElementById('show-create-category-modal').blur();
  }

  showDeleteCategoryModal = (category, index) => {
    this.setState({
      category,
      isDeleteCategory: true,
      isEditCategory: false,
      showCategoryModal: true,
    });
    document.getElementById(`show-delete-category-modal-${index}`).blur();
  }

  showUpdateCategoryModal = (category, index) => {
    this.setState({
      category,
      isDeleteCategory: false,
      isEditCategory: true,
      showCategoryModal: true,
    });
    document.getElementById(`show-update-category-modal-${index}`).blur();
  }

  closeCategoryModal = () => {
    this.setState({
      showCategoryModal: false,
    });
  }

  renderTable = () => {
    if (this.state.filtrTipHistory === 'Все операции') {
      return (
        <tbody>
          {this.props.moneys.map((money, index) =>
            <tr key={index}>
              <td className="text-center">
                <i className="glyphicon glyphicon-plus"></i>
              </td>
              <td className="text-center">
                -
              </td>
              <td className="text-center">
                {money.money}<i className="glyphicon glyphicon-usd"></i>
              </td>
              <td className="text-center">
                {money.date}
              </td>
            </tr>,
          )}
          {this.props.expenses.map((expense, index) =>
            <tr key={index}>
              <td className="text-center">
                <i className="glyphicon glyphicon-minus"></i>
              </td>
              <td className="text-center">{expense.nameCategory}</td>
              <td className="text-center">
                {expense.moneyExpense}<i className="glyphicon glyphicon-usd"></i>
              </td>
              <td className="text-center">{expense.date}</td>
            </tr>,
          )}
        </tbody>
      );
    }
    if (this.state.filtrTipHistory === 'Пополнение') {
      return (
        <tbody>
          {this.props.moneys.map((money, index) =>
            <tr key={index}>
              <td className="text-center">
                <i className="glyphicon glyphicon-plus"></i>
              </td>
              <td className="text-center">
                -
              </td>
              <td className="text-center">
                {money.money}<i className="glyphicon glyphicon-usd"></i>
              </td>
              <td className="text-center">
                {money.date}
              </td>
            </tr>,
          )}
        </tbody>
      );
    }
    if (this.state.filtrTipHistory === 'Расход') {
      return (
        <tbody>
          {this.props.expenses.map((expense, index) =>
            <tr key={index}>
              <td className="text-center">
                <i className="glyphicon glyphicon-minus"></i>
              </td>
              <td className="text-center">{expense.nameCategory}</td>
              <td className="text-center">
                {expense.moneyExpense}<i className="glyphicon glyphicon-usd"></i>
              </td>
              <td className="text-center">{expense.date}</td>
            </tr>,
          )}
        </tbody>
      );
    }
    return 0;
  }

  render() {
    if (this.state.refreshTable) {
      $('#data-table-categories').DataTable().destroy();
      $('#data-table-history').DataTable().destroy();
    }

    const totalAccountBalance = this.getTotalAccountBalance();
    const totalAccountExpense = this.getTotalAccountExpense();

    return (
      <div className="intro-header">
        <div className="container">
          <div
            className="row"
            style={{ marginTop: '20px' }}
          >
            <div className="col-md-4">
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <h4>Баланс:</h4>
                    </td>
                    <td className="text-right">
                      <h4>
                        <b
                          style={(this.props.unplannedMoney !== 0)
                            ? {
                              color: 'indianred',
                            }
                            : {
                              color: 'steelblue',
                            }
                          }
                        >
                          {` ${this.props.unplannedMoney}`}
                        </b>
                        <i className="glyphicon glyphicon-usd"></i>
                      </h4>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="table">
                <tbody>
                  <tr>
                    <td>Cумма пополнений:</td>
                    <td className="text-right">
                      <b>{` ${totalAccountBalance}`}</b>
                      <i className="glyphicon glyphicon-usd"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>Cумма расходов:</td>
                    <td className="text-right">
                      <b>{` ${totalAccountExpense}`}</b>
                      <i className="glyphicon glyphicon-usd"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-8 text-center">
              <MainForm />
            </div>
          </div>

          <div className="row border-div">
            <div className="col-md-5 border-div-right border-div-table">
              <div className="text-left margin-top">
                <button
                  className="btn btn-primary"
                  id="show-create-category-modal"
                  onClick={this.showCreateCategoryModal}
                >
                  Добавить категорию
                </button>
                <CategoryModal
                  categories={this.props.categories}
                  category={this.state.category}
                  closeCategoryModal={this.closeCategoryModal}
                  isDeleteCategory={this.state.isDeleteCategory}
                  isEditCategory={this.state.isEditCategory}
                  showCategoryModal={this.state.showCategoryModal}
                />
              </div>
              <div className="table-responsive margin-top">
                <table
                  className="table table-bordered table-hover table-striped table-condensed"
                  id="data-table-categories"
                >
                  <thead>
                    <tr>
                      <th className="text-center">Название категории</th>
                      <th className="text-center" style={{ width: '20%' }}>Баланс</th>
                      <th className="text-center" style={{ width: '10px' }}></th>
                      <th className="text-center" style={{ width: '10px' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.categories.map((category, index) =>
                      <tr key={index}>
                        <td className="text-center">
                          {category.nameCategory}
                        </td>
                        <td className="text-center">
                          {category.moneyCategory}<i className="glyphicon glyphicon-usd"></i>
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-xs btn-primary"
                            data-toggle="tooltip"
                            id={`show-update-category-modal-${index}`}
                            onClick={() => this.showUpdateCategoryModal(category, index)}
                            title="Редактировать"
                            type="button"
                          >
                            <span className="glyphicon glyphicon-pencil"></span>
                          </button>
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-xs btn-danger"
                            data-toggle="tooltip"
                            id={`show-delete-category-modal-${index}`}
                            onClick={() => this.showDeleteCategoryModal(category, index)}
                            title="Удалить"
                            type="button"
                          >
                            <span className="glyphicon glyphicon-trash"></span>
                          </button>
                        </td>
                      </tr>,
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-7 border-div-table">
              <div className="text-left margin-top">
                <div className="btn-group">
                  <a
                    className="btn btn-primary dropdown-toggle btn-select"
                    data-toggle="dropdown"
                    href={undefined}
                    tabIndex={0}
                  >
                    Все операции <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="nav-item"
                        href={undefined}
                        onClick={() => this.setState({ filtrTipHistory: 'Все операции' })}
                        tabIndex={0}
                      >
                        Все операции
                      </a>
                    </li>
                    <li>
                      <a
                        className="nav-item"
                        href={undefined}
                        onClick={() => this.setState({ filtrTipHistory: 'Пополнение' })}
                        tabIndex={0}
                      >
                        Пополнение
                      </a>
                    </li>
                    <li>
                      <a
                        className="nav-item"
                        href={undefined}
                        onClick={() => this.setState({ filtrTipHistory: 'Расход' })}
                        tabIndex={0}
                      >
                        Расход
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="table-responsive margin-top">
                <table
                  className="table table-bordered table-hover table-striped table-condensed"
                  id="data-table-history"
                >
                  <thead>
                    <tr>
                      <th className="text-center" style={{ width: '15%' }}>Тип</th>
                      <th className="text-center" style={{ width: '50%' }}>Название категории</th>
                      <th className="text-center" style={{ width: '15%' }}>Сумма</th>
                      <th className="text-center" style={{ width: '20%' }}>Дата</th>
                    </tr>
                  </thead>
                  {this.renderTable()}
                </table>
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
)(Home);
