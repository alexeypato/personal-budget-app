import React, { Component, PropTypes } from 'react';
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

class CategoriesTable extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      nameCategory: PropTypes.string,
      moneyCategory: PropTypes.number,
    })),
    onAddCategories: PropTypes.func.isRequired,
    onEditCategories: PropTypes.func.isRequired,
    onDeleteCategories: PropTypes.func.isRequired,
    onAddExpenses: PropTypes.func.isRequired,
    unplannedMoney: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toISOString(),
      focused: false,
      idCategorySelect: -1,
      nameCategory: '',
      nameCategorySelect: '',
      moneyPlannedSelect: 0,
      moneyCategoryAndUnplanned: 0,
      moneyCategory: 0,
      showModalAddCategory: false,
      showModalDeleteCategory: false,
      showModalEditCategory: false,
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
        this.props.onAddCategories(nameCategory, moneyCategory);
        this.setState({
          nameCategory: '',
          moneyCategory: 0,
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
      showModalEditCategory: true,
      idCategorySelect: row.id,
      nameCategorySelect: row.nameCategory,
      moneyPlannedSelect: row.moneyCategory,
      moneyCategoryAndUnplanned: row.moneyCategory + this.props.unplannedMoney,
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
        this.props.onEditCategories(
          this.state.idCategorySelect,
          this.state.nameCategorySelect,
          +this.state.moneyPlannedSelect,
          this.props.unplannedMoney -
            (this.state.moneyCategoryAndUnplanned - this.state.moneyPlannedSelect),
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
    this.setState({ showModalEditCategory: false });
  }

  // Delete categories
  handleDeleteButtonClick = (row) => {
    this.setState({
      showModalDeleteCategory: true,
      idCategorySelect: row.id,
      nameCategorySelect: row.nameCategory,
      moneyPlannedSelect: row.moneyCategory,
    });
  }

  deleteAndClose = () => {
    this.props.onDeleteCategories(this.state.idCategorySelect, this.state.moneyPlannedSelect);
    this.closeModalDelete();
  }

  closeModalDelete = () => {
    this.setState({ showModalDeleteCategory: false });
  }

  // ToExpenses
  handleToExpensesButtonClick = (row) => {
    this.setState({
      showModalToExpenses: true,
      idCategorySelect: row.id,
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
      moneyToExpenses: Number(this.moneyToExpensesSlider.value),
    });
  }

  toExpensesAndClose = () => {
    const dateOut = date.parse(this.state.date, 'YYYY-MM-DD');
    this.props.onAddExpenses(
      this.state.idCategorySelect,
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
          show={this.state.showModalAddCategory}
          onHide={this.closeModalAddCategory}
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
              onClick={this.closeModalAddCategory}
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
          show={this.state.showModalDeleteCategory}
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
          show={this.state.showModalEditCategory}
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
                    moneyPlannedSelect:
                      this.state.moneyPlannedSelect < +this.state.moneyCategoryAndUnplanned
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
              max={+this.state.moneyCategoryAndUnplanned}
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
  }),
  dispatch => ({
    onAddCategories: (nameCategory, withdrawal) => {
      dispatch({ type: 'ADD_CATEGORY', nameCategory, withdrawal });
      dispatch({ type: 'DELETE_UNPLANNED_MONEY', withdrawal });
    },
    onEditCategories: (id, nameCategory, moneyCategory, withdrawal) => {
      dispatch({ type: 'EDIT_CATEGORY', id, nameCategory, moneyCategory });
      dispatch({ type: 'DELETE_UNPLANNED_MONEY', withdrawal });
    },
    onDeleteCategories: (id, deposit) => {
      dispatch({ type: 'DELETE_CATEGORY', id });
      dispatch({ type: 'ADD_UNPLANNED_MONEY', deposit });
    },
    onAddExpenses: (idCategory, nameCategory, moneyToExpenses, dateExpense) => {
      dispatch({
        type: 'ADD_EXPENSE',
        idCategory,
        nameCategory,
        moneyToExpenses,
        dateExpense,
      });
      dispatch({ type: 'DELETE_MONEY_TO_CATEGORY', idCategory, moneyToExpenses });
    },
  }),
)(CategoriesTable);
