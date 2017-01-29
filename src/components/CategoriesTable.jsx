import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BootstrapTable,
  TableHeaderColumn,
  InsertButton,
  ClearSearchButton,
} from 'react-bootstrap-table';
import { Modal } from 'react-bootstrap';

const DatePicker = require('react-bootstrap-date-picker');
const date = require('date-and-time');

class CategoriesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toISOString(),
      focused: false,
      idSelect: '',
      nameCategory: '',
      nameCategorySelect: '',
      moneyPlannedSelect: '',
      moneyAll: '',
      moneyCategory: '',
      showModalAdd: false,
      showModalDelete: false,
      showModalEdit: false,
      textError: '',
    };
  }

  priceFormatter = (cell, row) => {
    return `<i class="glyphicon glyphicon-usd"></i> ${cell}`;
  }

  buttonEditFormatter = (cell, row) => {
    return (
      <button
        className="btn btn-xs btn-primary"
        type="button"
        onClick={() => this.handleEditButtonClick(row)}
        data-toggle="tooltip"
        title="Редактировать"
      >
        <span className="glyphicon glyphicon-pencil"></span>
      </button>
    );
  }

  buttonDeleteFormatter = (cell, row) => {
    return (
      <button
        className="btn btn-xs btn-danger"
        type="button"
        onClick={() => this.handleDeleteButtonClick(row)}
        data-toggle="tooltip"
        title="Удалить"
      >
        <span className="glyphicon glyphicon-trash"></span>
      </button>
    );
  }

  buttonToExpensesFormatter = (cell, row) => {
    return (
      <button
        className="btn btn-xs btn-primary"
        type="button"
        onClick={() => this.handleToExpensesButtonClick(row)}
        data-toggle="tooltip"
        title="Внести расход"
      >
        <span className="glyphicon glyphicon-shopping-cart"></span>
      </button>
    );
  }

  revertSortFunc = (a, b, order) => {
    if (order === 'desc') {
      return a.moneyCategory - b.moneyCategory;
    }
    return b.moneyCategory - a.moneyCategory;
  }

  // Add categories
  createCustomInsertButton = (onClick) => {
    return (
      <InsertButton
        btnText=" Добавить категорию"
        btnContextual="btn-primary"
        onClick={() => this.handleInsertButtonClick(onClick)}
      />
    );
  }

  handleInsertButtonClick = () => {
    this.setState({
      nameCategory: '',
      moneyCategory: 0,
      textError: '',
      showModalAdd: true,
    });
  }

  handleOnChangeInput = () => {
    this.setState({
      nameCategory: this.nameCategoryInput.value,
    });
  }

  handleOnChangeMoney = () => {
    this.setState({
      moneyCategory: this.addMoneySlider.value,
    });
  }

  saveAndClose = () => {
    const moneyCategory = this.state.moneyCategory;
    const nameCategory = this.state.nameCategory;

    if (nameCategory.trim().length > 0) {
      let duplicate = false;
      const categoriesData = this.props.categories;

      let id = categoriesData.length + 1;
      for (let i = 0; i < categoriesData.length; i += 1) {
        if (categoriesData[i].id >= id) {
          id = categoriesData[i].id + 1;
        }
        if (categoriesData[i].nameCategory === nameCategory) {
          duplicate = true;
        }
      }

      if (!duplicate) {
        this.props.onAddCategories(id, nameCategory, moneyCategory);
        this.setState({
          nameCategory: '',
          moneyCategory: '',
          textError: '',
        });
        this.closeModalAdd();
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

  closeModalAdd = () => {
    this.setState({ showModalAdd: false });
  }

  // Edit categories
  handleEditButtonClick = (row) => {
    this.setState({
      showModalEdit: true,
      idSelect: row.id,
      nameCategorySelect: row.nameCategory,
      moneyPlannedSelect: row.moneyCategory,
      moneyAll: +row.moneyCategory + +this.props.unplannedMoney,
    });
  }

  handleOnChangeInputSelect = () => {
    this.setState({
      nameCategorySelect: this.nameCategoryInputSelect.value,
    });
  }

  moneyPlannedSelectChange = () => {
    this.setState({
      moneyPlannedSelect: this.editMoneySlider.value,
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
          && categoriesData[i].id !== this.state.idSelect
        ) {
          duplicate = true;
        }
      }

      if (!duplicate) {
        this.setState({
          nameCategorySelect: '',
          textError: '',
        });
        this.props.onEditCategories(
          this.state.idSelect,
          this.state.nameCategorySelect,
          +this.state.moneyPlannedSelect,
          this.props.unplannedMoney - (this.state.moneyAll - this.state.moneyPlannedSelect),
        );
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
    this.setState({ showModalEdit: false });
  }

  // Delete categories
  handleDeleteButtonClick = (row) => {
    this.setState({
      showModalDelete: true,
      idSelect: row.id,
      nameCategorySelect: row.nameCategory,
      moneyPlannedSelect: row.moneyCategory,
    });
  }

  deleteAndClose = () => {
    this.props.onDeleteCategories(this.state.idSelect, this.state.moneyPlannedSelect);
    this.closeModalDelete();
  }

  closeModalDelete = () => {
    this.setState({ showModalDelete: false });
  }

  // ToExpenses
  handleToExpensesButtonClick = (row) => {
    this.setState({
      showModalToExpenses: true,
      idSelect: row.id,
      nameCategorySelect: row.nameCategory,
      moneyPlannedSelect: row.moneyCategory,
      moneyToExpenses: row.moneyCategory,
    });
  }

  handleOnChangeDate = (value) => {
    this.setState({
      date: value,
    });
  }

  moneyToExpensesChange = () => {
    this.setState({
      moneyToExpenses: this.moneyToExpensesSlider.value,
    });
  }

  toExpensesAndClose = () => {
    const expenses = this.props.expenses;
    let id = expenses.length + 1;
    for (let i = 0; i < expenses.length; i += 1) {
      if (expenses[i].id >= id) {
        id = expenses[i].id + 1;
      }
    }
    const dateOut = date.parse(this.state.date, 'YYYY-MM-DD');
    this.props.onAddExpenses(
      id,
      this.state.idSelect,
      this.state.nameCategorySelect,
      this.state.moneyToExpenses,
      date.format(dateOut, 'YYYY-MM-DD'),
    );
    this.closeModalToExpenses();
  }

  closeModalToExpenses = () => {
    this.setState({ showModalToExpenses: false });
  }

  createCustomClearButton = (onClick) => {
    return (
      <ClearSearchButton
        btnText="Очистить"
      />
    );
  }

  render() {
    const options = {
      sizePerPage: 10,
      paginationSize: 3,
      hideSizePerPage: true,
      defaultSortName: 'nameCategory',
      defaultSortOrder: 'asc',
      clearSearch: true,
      clearSearchBtn: this.createCustomClearButton,
      insertBtn: this.createCustomInsertButton,
    };

    return (
      <div>
        <BootstrapTable
          data={this.props.categories}
          striped
          pagination
          options={options}
          search
          searchPlaceholder="Поиск..."
          insertRow
        >
          <TableHeaderColumn
            dataField="id"
            isKey
            dataAlign="center"
            dataSort
            width="100"
            hidden
          >
            ID
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="nameCategory"
            dataAlign="center"
            dataSort
          >
            Название категории
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="moneyCategory"
            dataFormat={this.priceFormatter}
            dataAlign="center"
            dataSort
            sortFunc={this.revertSortFunc}
            width="150"
          >
            Сумма средств
          </TableHeaderColumn>
          <TableHeaderColumn
            dataAlign="center"
            dataField="buttonDelete"
            dataFormat={this.buttonEditFormatter}
            width="50"
          >
          </TableHeaderColumn>
          <TableHeaderColumn
            dataAlign="center"
            dataField="buttonEdit"
            dataFormat={this.buttonDeleteFormatter}
            width="50"
          >
          </TableHeaderColumn>
          <TableHeaderColumn
            dataAlign="center"
            dataField="buttonToExpenses"
            dataFormat={this.buttonToExpensesFormatter}
            width="50"
          >
          </TableHeaderColumn>
        </BootstrapTable>
        <Modal
          show={this.state.showModalAdd}
          onHide={this.closeModalAdd}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <span className="glyphicon glyphicon-plus"> Добавить категорию</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              className="form-control text-center margin-bottom"
              onChange={() => this.handleOnChangeInput()}
              placeholder={
                this.state.textError ?
                  this.state.textError :
                  'Введите название категории'
              }
              value={this.state.nameCategory}
              maxLength="30"
              ref={(input) => { this.nameCategoryInput = input; }}
              data-toggle="tooltip"
              title="Название категории"
            />
            <div className="input-group margin-bottom">
              <span className="input-group-btn">
                <button
                  className="btn btn-primary btn-secondary"
                  type="button"
                  onClick={() => this.setState({
                    moneyCategory: this.state.moneyCategory > 0
                        ? +this.state.moneyCategory - 1
                        : +this.state.moneyCategory,
                  })}
                >
                  <span className="glyphicon glyphicon-minus"></span>
                </button>
              </span>
              <input
                className="form-control text-center"
                value={this.state.moneyCategory}
                disabled
                data-toggle="tooltip"
                title="Сумма средств"
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-primary btn-secondary"
                  type="button"
                  onClick={() => this.setState({
                    moneyCategory: this.state.moneyCategory < +this.props.unplannedMoney
                        ? +this.state.moneyCategory + 1
                        : +this.state.moneyCategory,
                  })}
                >
                  <span className="glyphicon glyphicon-plus"></span>
                </button>
              </span>
            </div>
            <input
              type="range"
              value={+this.state.moneyCategory}
              max={+this.props.unplannedMoney}
              onChange={this.handleOnChangeMoney}
              ref={(input) => { this.addMoneySlider = input; }}
            />
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-default"
              type="button"
              onClick={this.closeModalAdd}
            >
              Закрыть
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.saveAndClose}
            >
              Добавить
            </button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showModalDelete}
          onHide={this.closeModalDelete}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <span className="glyphicon glyphicon-trash"> Удалить категорию</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Вы действительно хотите удалить категорию: `{this.state.nameCategorySelect}`?</p>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-default"
              type="button"
              onClick={this.closeModalDelete}
            >
              Закрыть
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={this.deleteAndClose}
            >
              Удалить
            </button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showModalEdit}
          onHide={this.closeModalEdit}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <span className="glyphicon glyphicon-pencil"> Редактировать категорию</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              className="form-control text-center margin-bottom"
              onChange={() => this.handleOnChangeInputSelect()}
              placeholder={
                this.state.textError ?
                  this.state.textError :
                  'Введите название категории'
              }
              value={this.state.nameCategorySelect}
              maxLength="30"
              ref={(input) => { this.nameCategoryInputSelect = input; }}
              data-toggle="tooltip"
              title="Название категории"
            />

            <div className="input-group margin-bottom">
              <span className="input-group-btn">
                <button
                  className="btn btn-primary btn-secondary"
                  type="button"
                  onClick={() => this.setState({
                    moneyPlannedSelect: this.state.moneyPlannedSelect > 0
                      ? +this.state.moneyPlannedSelect - 1
                      : +this.state.moneyPlannedSelect,
                  })}
                >
                  <span className="glyphicon glyphicon-minus"></span>
                </button>
              </span>
              <input
                className="form-control text-center"
                value={this.state.moneyPlannedSelect}
                disabled
                data-toggle="tooltip"
                title="Сумма средств"
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-primary btn-secondary"
                  type="button"
                  onClick={() => this.setState({
                    moneyPlannedSelect: this.state.moneyPlannedSelect < +this.state.moneyAll
                      ? +this.state.moneyPlannedSelect + 1
                      : +this.state.moneyPlannedSelect,
                  })}
                >
                  <span className="glyphicon glyphicon-plus"></span>
                </button>
              </span>
            </div>
            <input
              type="range"
              value={+this.state.moneyPlannedSelect}
              max={+this.state.moneyAll}
              onChange={this.moneyPlannedSelectChange}
              ref={(input) => { this.editMoneySlider = input; }}
            />
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-default"
              type="button"
              onClick={this.closeModalEdit}
            >
              Закрыть
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.editAndClose}
            >
              Изменить
            </button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showModalToExpenses}
          onHide={this.closeModalToExpenses}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <span className="glyphicon glyphicon-shopping-cart"> Внести раход</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              className="form-control text-center margin-bottom"
              value={this.state.nameCategorySelect}
              disabled
              data-toggle="tooltip"
              title="Категория"
            />
            <DatePicker
              className="text-center margin-bottom"
              onChange={this.handleOnChangeDate}
              value={this.state.date}
              onFocus={() => { this.setState({ focused: true }); }}
              onBlur={() => { this.setState({ focused: false }); }}
              dateFormat="YYYY-MM-DD"
              showClearButton={false}
            />
            <div className="input-group margin-bottom">
              <span className="input-group-btn">
                <button
                  className="btn btn-primary btn-secondary"
                  type="button"
                  onClick={() => this.setState({
                    moneyPlannedSelect: this.state.moneyToExpenses > 0
                      ? +this.state.moneyToExpenses - 1
                      : +this.state.moneyToExpenses,
                  })}
                >
                  <span className="glyphicon glyphicon-minus"></span>
                </button>
              </span>
              <input
                className="form-control text-center"
                value={this.state.moneyToExpenses}
                disabled
                data-toggle="tooltip"
                title="Сумма расходов"
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-primary btn-secondary"
                  type="button"
                  onClick={() => this.setState({
                    moneyPlannedSelect: this.state.moneyToExpenses < +this.state.moneyPlannedSelect
                      ? +this.state.moneyToExpenses + 1
                      : +this.state.moneyToExpenses,
                  })}
                >
                  <span className="glyphicon glyphicon-plus"></span>
                </button>
              </span>
            </div>
            <input
              type="range"
              value={+this.state.moneyToExpenses}
              max={+this.state.moneyPlannedSelect}
              onChange={this.moneyToExpensesChange}
              ref={(input) => { this.moneyToExpensesSlider = input; }}
            />
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-default"
              type="button"
              onClick={this.closeModalToExpenses}
            >
              Закрыть
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.toExpensesAndClose}
            >
              Внести
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    categories: state.categories,
    unplannedMoney: state.unplannedMoney,
    expenses: state.expenses,
    ownProps,
  }),
  dispatch => ({
    onAddCategories: (id, nameCategory, withdrawal) => {
      const category = {
        id: Number(id),
        nameCategory: nameCategory.toString(),
        moneyCategory: withdrawal,
      };
      dispatch({ type: 'ADD_CATEGORY', category });
      dispatch({ type: 'DELETE_UNPLANNED_MONEY', withdrawal });
    },
    onEditCategories: (id, nameCategory, moneyCategory, withdrawal) => {
      dispatch({ type: 'EDIT_CATEGORY', id, nameCategory, moneyCategory });
      dispatch({ type: 'DELETE_UNPLANNED_MONEY', withdrawal });
    },
    onDeleteCategories: (id, deposit) => {
      dispatch({ type: 'DELETE_CATEGORY', id });
      dispatch({ type: 'DELETE_EXPENSE', id });
      dispatch({ type: 'ADD_UNPLANNED_MONEY', deposit });
    },
    onAddExpenses: (id, idCategory, nameCategory, moneyToExpenses, dateExpense) => {
      const expense = {
        id: Number(id),
        idCategory: Number(idCategory),
        nameCategory: nameCategory.toString(),
        moneyExpense: moneyToExpenses,
        date: dateExpense,
      };
      dispatch({ type: 'ADD_EXPENSE', expense });
      dispatch({ type: 'DELETE_MONEY_TO_CATEGORY', idCategory, moneyToExpenses });
    },
  }),
)(CategoriesTable);
