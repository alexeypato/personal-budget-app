import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BootstrapTable,
  TableHeaderColumn,
  InsertButton,
  DeleteButton,
  ClearSearchButton,
  ExportCSVButton,
} from 'react-bootstrap-table';
import { Button, Modal } from 'react-bootstrap';

function priceFormatter(cell) {
  return `<i class="glyphicon glyphicon-usd"></i> ${cell}`;
}

function revertSortFunc(a, b, order) {
  if (order === 'desc') {
    return a.cash - b.cash;
  }
  return b.cash - a.cash;
}

class CategoriesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameCategory: '',
      nameCategorySelect: '',
      dropRowKeysSelect: '',
      moneyPlannedSelect: '',
      moneyAll: '',
      cashCategory: '',
      showModalAdd: false,
      showModalDelete: false,
      showModalEdit: false,
      textError: '',
    };
  }

  onRowDoubleClick = (row) => {
    this.setState({
      showModalEdit: 'true',
      dropRowKeysSelect: row.id,
      nameCategorySelect: row.nameCategory,
      moneyPlannedSelect: row.moneyPlanned,
      moneyAll: +row.moneyPlanned + +this.props.unplannedMoney,
    });
  }

  handleOnChangeInput = () => {
    this.setState({
      nameCategory: this.nameCategoryInput.value,
    });
  }

  handleOnChangeInputSelect = () => {
    this.setState({
      nameCategorySelect: this.nameCategoryInputSelect.value,
    });
  }

  moneyPlannedSelectChange = () => {
    this.setState({
      moneyPlannedSelect: this.ChangeCashSlider.value,
    });
  }

  handleOnChangeCash = () => {
    this.setState({
      cashCategory: this.AddCashSlider.value,
    });
  }

  handleInsertButtonClick = () => {
    this.setState({
      nameCategory: '',
      cashCategory: 0,
      textError: '',
      showModalAdd: true,
    });
  }

  createCustomInsertButton = (onClick) => {
    return (
      <InsertButton
        btnText=" Добавить"
        btnContextual="btn-primary"
        onClick={() => this.handleInsertButtonClick(onClick)}
      />
    );
  }

  createCustomDeleteButton = () => {
    return (
      <DeleteButton
        btnText="Удалить"
        btnContextual="btn-danger"
      />
    );
  }

  createCustomClearButton = (onClick) => {
    return (
      <ClearSearchButton
        btnText="Очистить"
      />
    );
  }

  closeModalAdd = () => {
    this.setState({ showModalAdd: false });
  }

  closeModalDelete = () => {
    this.setState({ showModalDelete: false });
  }

  closeModalEdit = () => {
    this.setState({ showModalEdit: false });
  }

  saveAndClose = () => {
    const cashCategory = this.state.cashCategory;
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
        this.props.onAddCategories(id, nameCategory, cashCategory);
        this.setState({
          nameCategory: '',
          cashCategory: '',
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
      this.setState({ textError: 'Ошибка! Введите название категории.' });
    }
  }

  deleteAndClose = () => {
    this.props.onDeleteCategories(this.state.dropRowKeysSelect, this.state.moneyPlannedSelect);
    this.closeModalDelete();
  }

  editAndClose = () => {
    const nameCategory = this.state.nameCategorySelect;
    if (nameCategory.trim().length > 0) {
      let duplicate = false;
      const categoriesData = this.props.categories;

      for (let i = 0; i < categoriesData.length; i += 1) {
        if (
          categoriesData[i].nameCategory === nameCategory
          && categoriesData[i].id !== this.state.dropRowKeysSelect
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
          this.state.dropRowKeysSelect,
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
      this.setState({ textError: 'Ошибка! Введите название категории.' });
    }
  }

  customConfirm = (next, dropRowKeys) => {
    const dropRowKey = dropRowKeys.join(',');
    const categoriesData = this.props.categories;
    for (let i = 0; i < categoriesData.length; i += 1) {
      if (categoriesData[i].id === +dropRowKey) {
        this.setState({
          nameCategorySelect: categoriesData[i].nameCategory,
          moneyPlannedSelect: categoriesData[i].moneyPlanned,
          dropRowKeysSelect: dropRowKey,
          showModalDelete: true,
        });
      }
    }
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
      deleteBtn: this.createCustomDeleteButton,
      handleConfirmDeleteRow: this.customConfirm,
      onRowDoubleClick: this.onRowDoubleClick,
    };

    const selectRowProp = {
      mode: 'radio',
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
          selectRow={selectRowProp}
          insertRow
          deleteRow
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
            dataField="moneyPlanned"
            dataFormat={priceFormatter}
            dataAlign="center"
            dataSort
            sortFunc={revertSortFunc}
            width="200"
          >
            Сумма средств
          </TableHeaderColumn>
        </BootstrapTable>
        <div className="text-right">
          <em>*Для редактирования категории совершите двойной щелчок по строке таблицы</em>
        </div>
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
            />
            <div className="input-group margin-bottom">
              <span className="input-group-btn">
                <button
                  className="btn btn-primary btn-secondary"
                  type="button"
                  onClick={() => this.setState({
                    cashCategory: this.state.cashCategory > 0
                        ? +this.state.cashCategory - 1
                        : +this.state.cashCategory,
                  })}
                >
                  <span className="glyphicon glyphicon-minus"></span>
                </button>
              </span>
              <input
                className="form-control text-center"
                value={this.state.cashCategory}
                disabled
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-primary btn-secondary"
                  type="button"
                  onClick={() => this.setState({
                    cashCategory: this.state.cashCategory < +this.props.unplannedMoney
                        ? +this.state.cashCategory + 1
                        : +this.state.cashCategory,
                  })}
                >
                  <span className="glyphicon glyphicon-plus"></span>
                </button>
              </span>
            </div>
            <input
              type="range"
              value={+this.state.cashCategory}
              max={+this.props.unplannedMoney}
              onChange={this.handleOnChangeCash}
              ref={(input) => { this.AddCashSlider = input; }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModalAdd}>
              Закрыть
            </Button>
            <Button bsStyle="primary" onClick={this.saveAndClose}>
              Добавить
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showModalDelete}
          onHide={this.closeModalDelete}
          bsSize="small"
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
            <Button onClick={this.closeModalDelete}>
              Закрыть
            </Button>
            <Button bsStyle="danger" onClick={this.deleteAndClose}>
              Удалить
            </Button>
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
              maxLength="20"
              ref={(input) => { this.nameCategoryInputSelect = input; }}
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
              ref={(input) => { this.ChangeCashSlider = input; }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModalEdit}>
              Закрыть
            </Button>
            <Button bsStyle="primary" onClick={this.editAndClose}>
              Изменить
            </Button>
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
    ownProps,
  }),
  dispatch => ({
    onAddCategories: (id, nameCategory, cashCategory) => {
      const payload = {
        id: +id,
        nameCategory: nameCategory.toString(),
        moneyPlanned: cashCategory,
      };
      dispatch({ type: 'ADD_CATEGORY', payload });
      dispatch({ type: 'DELETE_UNPLANNED_MONEY', cashCategory });
    },
    onEditCategories: (id, nameCategory, moneyPlanned, cashCategory) => {
      dispatch({ type: 'EDIT_CATEGORY', id, nameCategory, moneyPlanned });
      dispatch({ type: 'DELETE_UNPLANNED_MONEY', cashCategory });
    },
    onDeleteCategories: (id, addMoney) => {
      dispatch({ type: 'DELETE_CATEGORY', id });
      dispatch({ type: 'ADD_UNPLANNED_MONEY', addMoney });
    },
  }),
)(CategoriesTable);
