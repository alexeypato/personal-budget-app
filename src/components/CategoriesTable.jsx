import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BootstrapTable,
  TableHeaderColumn,
  InsertButton,
  DeleteButton,
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
      nameCategoryDelete: '',
      cashCategory: '',
      showModalAdd: false,
      showModalDelete: false,
      textError: '',
      textErrorCash: '',
      dropRowKeysStrTmp: '',
      moneyPlannedTmp: '',
    };
  }

  handleOnChangeInput = () => {
    this.setState({
      nameCategory: this.nameCategoryInput.value,
    });
  }

  handleOnChangeCash = () => {
    this.setState({
      cashCategory: this.cashCategoryInput.value.replace(/\D/, ''),
    });
  }

  handleInsertButtonClick = () => {
    this.setState({
      nameCategory: '',
      cashCategory: '',
      textError: '',
      textErrorCash: '',
      showModalAdd: true,
    });
  }

  createCustomInsertButton = (onClick) => {
    return (
      <InsertButton
        btnText=" Добавить"
        btnContextual="btn-primary"
        className="my-custom-class"
        onClick={() => this.handleInsertButtonClick(onClick)}
      />
    );
  }

  createCustomDeleteButton = () => {
    return (
      <DeleteButton
        btnText=" Удалить"
        btnContextual="btn-danger"
        className="my-custom-class"
      />
    );
  }

  closeModalAdd = () => {
    this.setState({ showModalAdd: false });
  }

  closeModalDelete = () => {
    this.setState({ showModalDelete: false });
  }

  saveAndClose = () => {
    const cashCategory = this.state.cashCategory;
    const nameCategory = this.state.nameCategory;

    if (cashCategory.length > 0
      && (+cashCategory <= +this.props.unplannedMoney)) {
      if (cashCategory.replace(/\d/g, '').length) {
        this.setState({
          cashCategory: '',
          textErrorCash: 'Ошибка! Неверная сумма денег.',
        });
      } else if (nameCategory.trim().length > 0) {
        const categoriesData = this.props.categories;
        let id = categoriesData.length + 1;
        for (let i = 0; i < categoriesData.length; i += 1) {
          if (categoriesData[i].id >= id) {
            id = categoriesData[i].id + 1;
          }
        }
        this.props.onAddCategories(id, nameCategory, cashCategory);
        this.setState({
          nameCategory: '',
          cashCategory: '',
          textError: '',
          textErrorCash: '',
        });
        this.closeModalAdd();
      } else {
        this.setState({ textError: 'Ошибка! Введите название категории.' });
      }
    } else {
      this.setState({
        cashCategory: '',
        textErrorCash: 'Ошибка! Неверная сумма денег.',
      });
    }
  }

  deleteAndClose = () => {
    this.props.onDeleteCategories(this.state.dropRowKeysStrTmp, this.state.moneyPlannedTmp);
    this.closeModalDelete();
  }

  customConfirm = (next, dropRowKeys) => {
    const dropRowKeysStr = dropRowKeys.join(',');
    const categoriesData = this.props.categories;
    for (let i = 0; i < categoriesData.length; i += 1) {
      if (categoriesData[i].id === +dropRowKeysStr) {
        this.setState({
          nameCategoryDelete: categoriesData[i].nameCategory,
          showModalDelete: true,
          moneyPlannedTmp: categoriesData[i].moneyPlanned,
          dropRowKeysStrTmp: dropRowKeysStr,
        });
      }
    }
  }

  render() {
    const options = {
      sizePerPage: 10,  // which size per page you want to locate as default
      paginationSize: 3,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      hideSizePerPage: true,
      defaultSortName: 'nameCategory',  // default sort column name
      defaultSortOrder: 'asc',  // default sort order
      clearSearch: true,
      insertBtn: this.createCustomInsertButton,
      deleteBtn: this.createCustomDeleteButton,
      handleConfirmDeleteRow: this.customConfirm,
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

        <Modal
          show={this.state.showModalAdd}
          onHide={this.closeModalAdd}
          bsSize="small"
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
              maxLength="10"
              ref={(input) => { this.nameCategoryInput = input; }}
            />
            <input
              className="form-control text-center margin-bottom"
              onChange={() => this.handleOnChangeCash()}
              placeholder={
                this.state.textErrorCash ?
                  this.state.textErrorCash :
                  `Введите сумму средств до : ${this.props.unplannedMoney}`
              }
              value={this.state.cashCategory}
              maxLength="10"
              ref={(input) => { this.cashCategoryInput = input; }}
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
            <p>Вы действительно хотите удалить категорию: `{this.state.nameCategoryDelete}`?</p>
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
    onDeleteCategories: (id, addMoney) => {
      dispatch({ type: 'DELETE_CATEGORY', id });
      dispatch({ type: 'ADD_UNPLANNED_MONEY', addMoney });
    },
  }),
)(CategoriesTable);
