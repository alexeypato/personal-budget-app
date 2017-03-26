import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { List } from 'immutable';
import $ from 'jquery';

import CategoryModal from '../components/modal/CategoryModal';
import DataTableCategories from '../components/datatable/DataTableCategories';
import DataTableHistory from '../components/datatable/DataTableHistory';
import MainForm from '../components/MainForm';

import { getCategoryList, categoriesActions } from '../reducers/categories';
import { getHistoryList, historyActions } from '../reducers/history';
import { getUnplannedMoney, unplannedMoneyActions } from '../reducers/unplannedMoney';

class Home extends Component {
  static propTypes = {
    // children: PropTypes.object.isRequired,
    categories: PropTypes.instanceOf(List).isRequired,
    loadCategories: PropTypes.func.isRequired,
    loadHistory: PropTypes.func.isRequired,
    loadUnplannedMoney: PropTypes.func.isRequired,
    history: PropTypes.instanceOf(List).isRequired,
    unloadCategories: PropTypes.func.isRequired,
    unloadHistory: PropTypes.func.isRequired,
    unloadUnplannedMoney: PropTypes.func.isRequired,
    unplannedMoney: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      balanceColor: 'steelblue',
      category: {},
      contentPopoverBalance: 'Баланс пуст!',
      filterTypeHistory: 'Все операции',
      isDeleteCategory: false,
      isEditCategory: false,
      refreshTable: false,
      showCategoryModal: false,
    };
  }

  componentWillMount = () => {
    this.props.loadCategories();
    this.props.loadHistory();
    this.props.loadUnplannedMoney();
  }

  componentDidMount = () => {
    this.dataTableCreate();
    $('#balance').popover({
      placement: 'bottom',
      trigger: 'hover',
    });
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      refreshTable: true,
    });
    if (nextProps.unplannedMoney !== 0) {
      this.setState({
        balanceColor: 'indianred',
        contentPopoverBalance: 'Внимание! На балансе находятся незапланнированные средства.',
      });
    } else {
      this.setState({
        balanceColor: 'steelblue',
        contentPopoverBalance: 'Баланс пуст!',
      });
    }
    if (nextProps.unplannedMoney > 0 && nextProps.unplannedMoney !== this.props.unplannedMoney) {
      $(document).ready(() => {
        $('#balance').popover('show');
        setTimeout(this.hidePopover, 4000);
      });
    }
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
    this.props.unloadHistory();
    this.props.unloadUnplannedMoney();
  }

  getTotalAccountBalance = () => {
    let tmp = 0;
    this.props.history.map((history, index) => {
      if (history.type === 'Пополнение') {
        tmp += history.moneyHistory;
      }
      return 0;
    });
    return tmp;
  }

  getTotalAccountExpense = () => {
    let tmp = 0;
    this.props.history.map((history, index) => {
      if (history.type === 'Расход') {
        tmp += history.moneyHistory;
      }
      return 0;
    });
    return tmp;
  }

  dataTableCreate = () => {
    $('#data-table-categories').dataTable({
      aoColumns: [
        null,
        null,
        { bSortable: false },
        { bSortable: false },
      ],
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
      },
      order: [[0, 'ask']],
      stateSave: true,
    });
    $('#data-table-history').dataTable({
      aoColumns: [
        { bSortable: false },
        null,
        null,
        null,
      ],
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

  hidePopover = () => {
    $('#balance').popover('hide');
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

  filterHistory = (filter) => {
    this.setState({
      filterTypeHistory: filter,
      refreshTable: true,
    });
  }

  render() {
    if (this.state.refreshTable) {
      $('#data-table-categories').DataTable().destroy();
      $('#data-table-history').DataTable().destroy();
    }

    const totalAccountBalance = this.getTotalAccountBalance();
    const totalAccountExpense = this.getTotalAccountExpense();

    return (
      <div className="intro-header container-fluid">
        <div className="my-table col-md-12" style={{ marginTop: '20px' }}>
          <div className="table-row text-center">
            <div className="table-cell table-cell-1 table-cell-1-padding text-left">
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <h4>
                        {'Баланс: '}
                        <a
                          data-toggle="popover"
                          data-content={this.state.contentPopoverBalance}
                          id="balance"
                          style={{ color: this.state.balanceColor }}
                        >{'?'}</a>
                      </h4>
                    </td>
                    <td className="text-right">
                      <h4>
                        <b
                          style={{ color: this.state.balanceColor }}
                        >
                          {` ${this.props.unplannedMoney}`}
                        </b>
                        <i className="glyphicon glyphicon-usd"></i>
                      </h4>
                    </td>
                  </tr>
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
            <div className="table-cell-clear">
            </div>
            <div className="table-cell table-cell-2 text-center" style={{ verticalAlign: 'top' }}>
              <MainForm />
            </div>
          </div>

          <div className="table-row-clear"></div>
          <div className="table-row">
            <div className="border-div table-cell table-cell-1">
              <div className="text-left">
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
              <DataTableCategories
                categories={this.props.categories}
                showDeleteCategoryModal={this.showDeleteCategoryModal}
                showUpdateCategoryModal={this.showUpdateCategoryModal}
              />
            </div>
            <div className="table-cell-clear">
            </div>
            <div className="border-div table-cell table-cell-2">
              <div className="text-left">
                <div className="btn-group">
                  <a
                    className="btn btn-primary dropdown-toggle btn-select"
                    data-toggle="dropdown"
                    href={undefined}
                    tabIndex={0}
                  >
                    {this.state.filterTypeHistory} <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="nav-item"
                        href={undefined}
                        onClick={() => this.filterHistory('Все операции')}
                        tabIndex={0}
                      >
                        Все операции
                      </a>
                    </li>
                    <li role="separator" className="divider"></li>
                    <li>
                      <a
                        className="nav-item"
                        href={undefined}
                        onClick={() => this.filterHistory('Пополнение')}
                        tabIndex={0}
                      >
                        Пополнение
                      </a>
                    </li>
                    <li>
                      <a
                        className="nav-item"
                        href={undefined}
                        onClick={() => this.filterHistory('Перевод')}
                        tabIndex={0}
                      >
                        Перевод
                      </a>
                    </li>
                    <li>
                      <a
                        className="nav-item"
                        href={undefined}
                        onClick={() => this.filterHistory('Расход')}
                        tabIndex={0}
                      >
                        Расход
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <DataTableHistory
                filter={this.state.filterTypeHistory}
                history={this.props.history}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  getCategoryList,
  getHistoryList,
  getUnplannedMoney,
  (categories, history, unplannedMoney) => ({
    categories,
    history,
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
)(Home);
