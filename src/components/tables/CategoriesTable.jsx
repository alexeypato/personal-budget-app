import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { List } from 'immutable';
import { Modal } from 'react-bootstrap';
import $ from 'jquery';

import { getCategoryList, categorieActions } from '../../reducers/categories';
import { expensesActions } from '../../reducers/expenses';
import { getUnplannedMoney, unplannedMoneyActions } from '../../reducers/unplannedMoney';

const DatePicker = require('react-bootstrap-date-picker');
const date = require('date-and-time');

const dayLabels = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
const monthLabels = [
  'Январь', 'Февраль', 'Март', 'Апрель',
  'Май', 'Июнь', 'Июль', 'Август',
  'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

class CategoriesTable extends Component {
  static propTypes = {
    categories: PropTypes.instanceOf(List).isRequired,
    createCategory: PropTypes.func.isRequired,
    createExpense: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    updateCategory: PropTypes.func.isRequired,
    updateUnplannedMoney: PropTypes.func.isRequired,
    unplannedMoney: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toISOString(),
      focused: false,
      idCategorySelect: -1,
      moneyCategoryAndUnplanned: 0,
      moneyCategory: 0,
      moneyPlannedSelect: 0,
      nameCategory: '',
      nameCategorySelect: '',
      refreshTable: false,
      showModalAddCategory: false,
      showModalDeleteCategory: false,
      showModalEditCategory: false,
      textError: '',
    };
  }

  componentDidMount = () => {
    this.dataTableCreate();
  }

  componentWillReceiveProps(nextProps) {
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

  dataTableCreate = () => {
    $('#datatable').dataTable({
      aoColumns: [
        null,
        null,
        { bSortable: false },
        { bSortable: false },
        { bSortable: false },
      ],
      iDisplayLength: 20,
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
          first: 'Первая',
          previous: 'Предыдущая',
          next: 'Следующая',
          last: 'Последняя',
        },
        aria: {
          sortAscending: ': активировать для сортировки столбца по возрастанию',
          sortDescending: ': активировать для сортировки столбца по убыванию',
        },
      },
      order: [[0, 'ask']],
      stateSave: true,
    });
  }

  // Add categories
  handleInsertButtonClick = () => {
    this.setState({
      moneyCategory: 0,
      nameCategory: '',
      textError: '',
      showModalAddCategory: true,
    });
  }

  handleOnChangeInput = () => {
    this.setState({
      nameCategory: this.nameCategoryInput.value,
    });
  }

  handleOnChangeMoney = () => {
    this.setState({
      moneyCategory: Number(this.addMoneySlider.value),
    });
  }

  saveAndClose = () => {
    const moneyCategory = this.state.moneyCategory;
    const nameCategory = this.state.nameCategory;

    if (nameCategory.trim().length > 0) {
      let duplicate = false;
      const categoriesData = this.props.categories;

      for (let i = 0; i < categoriesData.length; i += 1) {
        if (categoriesData[i].nameCategory === nameCategory) {
          duplicate = true;
        }
      }

      if (!duplicate) {
        this.props.createCategory(moneyCategory, nameCategory);
        this.props.updateUnplannedMoney(-moneyCategory);
        this.setState({
          moneyCategory: 0,
          nameCategory: '',
          textError: '',
        });
        this.closeModalAddCategory();
      } else {
        this.setState({
          nameCategory: '',
          textError: 'Ошибка! Такая категория уже есть.',
        });
      }
    } else {
      this.setState({
        nameCategory: '',
        textError: 'Ошибка! Введите название категории.',
      });
    }
  }

  closeModalAddCategory = () => {
    this.setState({ showModalAddCategory: false });
  }

  // Edit categories
  handleEditButtonClick = (row) => {
    this.setState({
      idCategorySelect: row,
      moneyPlannedSelect: row.moneyCategory,
      moneyCategoryAndUnplanned: row.moneyCategory + this.props.unplannedMoney,
      nameCategorySelect: row.nameCategory,
      showModalEditCategory: true,
    });
  }

  handleOnChangeInputSelect = () => {
    this.setState({
      nameCategorySelect: this.nameCategoryInputSelect.value,
    });
  }

  moneyPlannedSelectChange = () => {
    this.setState({
      moneyPlannedSelect: Number(this.editMoneySlider.value),
    });
  }

  editAndClose = () => {
    const nameCategory = this.state.nameCategorySelect;
    if (nameCategory.trim().length > 0) {
      let duplicate = false;
      const categoriesData = this.props.categories;

      for (let i = 0; i < categoriesData.length; i += 1) {
        if (
          categoriesData[i].nameCategory === nameCategory
          && categoriesData[i].id !== this.state.idCategorySelect
        ) {
          duplicate = true;
        }
      }

      if (!duplicate) {
        this.setState({
          nameCategorySelect: '',
          textError: '',
        });
        this.props.updateCategory(
          this.state.idCategorySelect,
          {
            moneyCategory: +this.state.moneyPlannedSelect,
            nameCategory: this.state.nameCategorySelect,
          },
        );
        this.props.updateUnplannedMoney(-(this.props.unplannedMoney -
          (this.state.moneyCategoryAndUnplanned - this.state.moneyPlannedSelect)));
        this.closeModalEdit();
      } else {
        this.setState({
          nameCategorySelect: '',
          textError: 'Ошибка! Такая категория уже есть.',
        });
      }
    } else {
      this.setState({
        nameCategorySelect: '',
        textError: 'Ошибка! Введите название категории.',
      });
    }
  }

  closeModalEdit = () => {
    this.setState({ showModalEditCategory: false });
  }

  // Delete categories
  handleDeleteButtonClick = (row) => {
    this.setState({
      idCategorySelect: row,
      moneyPlannedSelect: row.moneyCategory,
      nameCategorySelect: row.nameCategory,
      showModalDeleteCategory: true,
    });
  }

  deleteAndClose = () => {
    this.props.deleteCategory(this.state.idCategorySelect);
    this.props.updateUnplannedMoney(this.state.moneyPlannedSelect);
    this.closeModalDelete();
  }

  closeModalDelete = () => {
    this.setState({ showModalDeleteCategory: false });
  }

  // ToExpenses
  handleToExpensesButtonClick = (row) => {
    this.setState({
      idCategorySelect: row,
      moneyPlannedSelect: row.moneyCategory,
      moneyToExpenses: row.moneyCategory,
      nameCategorySelect: row.nameCategory,
      showModalToExpenses: true,
    });
  }

  handleOnChangeDate = (value) => {
    this.setState({
      date: value,
    });
  }

  moneyToExpensesChange = () => {
    this.setState({
      moneyToExpenses: Number(this.moneyToExpensesSlider.value),
    });
  }

  toExpensesAndClose = () => {
    const dateOut = date.parse(this.state.date, 'YYYY-MM-DD');
    const category = this.state.idCategorySelect;
    this.props.createExpense(
      date.format(dateOut, 'YYYY-MM-DD'),
      category.key,
      this.state.moneyToExpenses,
      this.state.nameCategorySelect,
    );
    this.props.updateCategory(
      category,
      {
        moneyCategory: (category.moneyCategory - this.state.moneyToExpenses),
      },
    );
    this.closeModalToExpenses();
  }

  closeModalToExpenses = () => {
    this.setState({ showModalToExpenses: false });
  }

  render() {
    if (this.state.refreshTable) {
      $('#datatable').DataTable().destroy();
    }
    return (
      <div>
        <div style={{ marginTop: '10px' }}>
          <button className="btn btn-primary" onClick={this.handleInsertButtonClick}>
            Добавить категорию
          </button>
        </div>
        <div className="table-responsive" style={{ marginTop: '10px' }}>
          <table
            className="table table-bordered table-hover table-striped table-condensed"
            id="datatable"
          >
            <thead>
              <tr>
                <th className="text-center">Название категории</th>
                <th className="text-center" style={{ width: '250px' }}>Сумма средств</th>
                <th className="text-center" style={{ width: '10px' }}></th>
                <th className="text-center" style={{ width: '10px' }}></th>
                <th className="text-center" style={{ width: '10px' }}></th>
              </tr>
            </thead>
            <tbody>
              {this.props.categories.map((category, index) =>
                <tr key={index}>
                  <td className="text-center">{category.nameCategory}</td>
                  <td className="text-center">
                    {category.moneyCategory}<i className="glyphicon glyphicon-usd"></i>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-xs btn-primary"
                      data-toggle="tooltip"
                      onClick={() => this.handleEditButtonClick(category)}
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
                      onClick={() => this.handleDeleteButtonClick(category)}
                      title="Удалить"
                      type="button"
                    >
                      <span className="glyphicon glyphicon-trash"></span>
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-xs btn-primary"
                      data-toggle="tooltip"
                      onClick={() => this.handleToExpensesButtonClick(category)}
                      title="Внести расход"
                      type="button"
                    >
                      <span className="glyphicon glyphicon-shopping-cart"></span>
                    </button>
                  </td>
                </tr>,
              )}
            </tbody>
          </table>
        </div>

        <Modal
          onHide={this.closeModalAddCategory}
          show={this.state.showModalAddCategory}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <span className="glyphicon glyphicon-plus"></span> Добавить категорию
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              className="form-control text-center margin-bottom"
              data-toggle="tooltip"
              maxLength="30"
              onChange={() => this.handleOnChangeInput()}
              placeholder={
                this.state.textError ?
                  this.state.textError :
                  'Введите название категории'
              }
              ref={(input) => { this.nameCategoryInput = input; }}
              title="Название категории"
              value={this.state.nameCategory}
            />
            <div className="input-group margin-bottom">
              <span className="input-group-btn">
                <button
                  className="btn btn-primary btn-secondary"
                  onClick={() => this.setState({
                    moneyCategory: this.state.moneyCategory > 0
                        ? +this.state.moneyCategory - 1
                        : +this.state.moneyCategory,
                  })}
                  type="button"
                >
                  <span className="glyphicon glyphicon-minus"></span>
                </button>
              </span>
              <input
                className="form-control text-center"
                data-toggle="tooltip"
                disabled
                title="Сумма средств"
                value={this.state.moneyCategory}
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-primary btn-secondary"
                  onClick={() => this.setState({
                    moneyCategory: this.state.moneyCategory < this.props.unplannedMoney
                        ? +this.state.moneyCategory + 1
                        : +this.state.moneyCategory,
                  })}
                  type="button"
                >
                  <span className="glyphicon glyphicon-plus"></span>
                </button>
              </span>
            </div>
            <input
              max={this.props.unplannedMoney}
              onChange={this.handleOnChangeMoney}
              ref={(input) => { this.addMoneySlider = input; }}
              type="range"
              value={+this.state.moneyCategory}
            />
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-default"
              onClick={this.closeModalAddCategory}
              type="button"
            >
              Закрыть
            </button>
            <button
              className="btn btn-primary"
              onClick={this.saveAndClose}
              type="button"
            >
              Добавить
            </button>
          </Modal.Footer>
        </Modal>

        <Modal
          onHide={this.closeModalDelete}
          show={this.state.showModalDeleteCategory}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <span className="glyphicon glyphicon-trash"></span> Удалить категорию
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Вы действительно хотите удалить категорию: `{this.state.nameCategorySelect}`?</p>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-default"
              onClick={this.closeModalDelete}
              type="button"
            >
              Закрыть
            </button>
            <button
              className="btn btn-danger"
              onClick={this.deleteAndClose}
              type="button"
            >
              Удалить
            </button>
          </Modal.Footer>
        </Modal>

        <Modal
          onHide={this.closeModalEdit}
          show={this.state.showModalEditCategory}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <span className="glyphicon glyphicon-pencil"></span> Редактировать категорию
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              className="form-control text-center margin-bottom"
              data-toggle="tooltip"
              maxLength="30"
              onChange={() => this.handleOnChangeInputSelect()}
              placeholder={
                this.state.textError ?
                  this.state.textError :
                  'Введите название категории'
              }
              ref={(input) => { this.nameCategoryInputSelect = input; }}
              title="Название категории"
              value={this.state.nameCategorySelect}
            />

            <div className="input-group margin-bottom">
              <span className="input-group-btn">
                <button
                  className="btn btn-primary btn-secondary"
                  onClick={() => this.setState({
                    moneyPlannedSelect: this.state.moneyPlannedSelect > 0
                      ? +this.state.moneyPlannedSelect - 1
                      : +this.state.moneyPlannedSelect,
                  })}
                  type="button"
                >
                  <span className="glyphicon glyphicon-minus"></span>
                </button>
              </span>
              <input
                className="form-control text-center"
                data-toggle="tooltip"
                disabled
                title="Сумма средств"
                value={this.state.moneyPlannedSelect}
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-primary btn-secondary"
                  onClick={() => this.setState({
                    moneyPlannedSelect:
                      this.state.moneyPlannedSelect < +this.state.moneyCategoryAndUnplanned
                        ? +this.state.moneyPlannedSelect + 1
                        : +this.state.moneyPlannedSelect,
                  })}
                  type="button"
                >
                  <span className="glyphicon glyphicon-plus"></span>
                </button>
              </span>
            </div>
            <input
              max={+this.state.moneyCategoryAndUnplanned}
              onChange={this.moneyPlannedSelectChange}
              ref={(input) => { this.editMoneySlider = input; }}
              type="range"
              value={+this.state.moneyPlannedSelect}
            />
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-default"
              onClick={this.closeModalEdit}
              type="button"
            >
              Закрыть
            </button>
            <button
              className="btn btn-primary"
              onClick={this.editAndClose}
              type="button"
            >
              Изменить
            </button>
          </Modal.Footer>
        </Modal>

        <Modal
          onHide={this.closeModalToExpenses}
          show={this.state.showModalToExpenses}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <span className="glyphicon glyphicon-shopping-cart"></span> Внести раход
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              className="form-control text-center margin-bottom"
              data-toggle="tooltip"
              disabled
              title="Категория"
              value={this.state.nameCategorySelect}
            />
            <DatePicker
              className="text-center margin-bottom"
              dateFormat="YYYY-MM-DD"
              dayLabels={dayLabels}
              monthLabels={monthLabels}
              onChange={this.handleOnChangeDate}
              onBlur={() => { this.setState({ focused: false }); }}
              onFocus={() => { this.setState({ focused: true }); }}
              showClearButton={false}
              showTodayButton
              todayButtonLabel={'Сегодня'}
              value={this.state.date}
              weekStartsOnMonday
            />
            <div className="input-group margin-bottom">
              <span className="input-group-btn">
                <button
                  className="btn btn-primary btn-secondary"
                  onClick={() => this.setState({
                    moneyPlannedSelect: this.state.moneyToExpenses > 0
                      ? +this.state.moneyToExpenses - 1
                      : +this.state.moneyToExpenses,
                  })}
                  type="button"
                >
                  <span className="glyphicon glyphicon-minus"></span>
                </button>
              </span>
              <input
                className="form-control text-center"
                data-toggle="tooltip"
                disabled
                title="Сумма расходов"
                value={this.state.moneyToExpenses}
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-primary btn-secondary"
                  onClick={() => this.setState({
                    moneyPlannedSelect: this.state.moneyToExpenses < +this.state.moneyPlannedSelect
                      ? +this.state.moneyToExpenses + 1
                      : +this.state.moneyToExpenses,
                  })}
                  type="button"
                >
                  <span className="glyphicon glyphicon-plus"></span>
                </button>
              </span>
            </div>
            <input
              max={+this.state.moneyPlannedSelect}
              onChange={this.moneyToExpensesChange}
              ref={(input) => { this.moneyToExpensesSlider = input; }}
              type="range"
              value={+this.state.moneyToExpenses}
            />
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-default"
              onClick={this.closeModalToExpenses}
              type="button"
            >
              Закрыть
            </button>
            <button
              className="btn btn-primary"
              onClick={this.toExpensesAndClose}
              type="button"
            >
              Внести
            </button>
          </Modal.Footer>
        </Modal>
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
  categorieActions,
  expensesActions,
  unplannedMoneyActions,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoriesTable);
