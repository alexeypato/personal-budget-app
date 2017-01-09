import React from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn, InsertButton, DeleteButton } from 'react-bootstrap-table';
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

/* function onAfterInsertRow() {
  this.props.addCategory();
}*/

export default class CategoriesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameCategory: '',
      showModal: false,
      textError: '',
    };
  }

  handleOnChangeInput = () => {
    this.setState({
      nameCategory: ReactDOM.findDOMNode(this.refs.name).value,
    });
  }

  handleInsertButtonClick = () => {
    this.setState({ showModal: true });
  }

  /* handleDeleteButtonClick = (next, dropRowKeys) => {
    const dropRowKeysStr = dropRowKeys.join(',');
    confirm(`Are you sure you want to delete ${dropRowKeysStr}?`);
  }*/

  createCustomInsertButton = (onClick) => {
    return (
      <InsertButton
        btnText="New category"
        btnContextual="btn-primary"
        className="my-custom-class"
        onClick={() => this.handleInsertButtonClick(onClick)}
      />
    );
  }

  createCustomDeleteButton = () => {
    return (
      <DeleteButton
        btnText="Delete"
        btnContextual="btn-danger"
        className="my-custom-class"
        onClick={() => this.handleDeleteButtonClick()}
      />
    );
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  saveAndClose = () => {
    if (this.state.nameCategory.trim().length > 0) {
      this.props.addCategory(this.state.nameCategory);
      this.setState({
        nameCategory: '',
        textError: '',
      });
      this.closeModal();
    } else {
      this.setState({ textError: 'Error! Enter name of category.' });
    }
  }

  customConfirm = (next, dropRowKeys) => {
    const dropRowKeysStr = dropRowKeys.join(',');
    confirm(`(It's a custom confirm)Are you sure you want to delete ${dropRowKeysStr}?`);
    this.props.deleteCategory(dropRowKeysStr - 1);
  }

  render() {
    const options = {
      sizePerPage: 5,  // which size per page you want to locate as default
      paginationSize: 3,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      hideSizePerPage: true,
      defaultSortName: 'id',  // default sort column name
      defaultSortOrder: 'desc',  // default sort order
      clearSearch: true,
      insertBtn: this.createCustomInsertButton,
      // deleteBtn: this.createCustomDeleteButton,
      handleConfirmDeleteRow: this.customConfirm,
    };

    const selectRowProp = {
      mode: 'radio',
    };
    return (
      <div>
        <BootstrapTable
          data={this.props.categoriesData}
          striped
          pagination
          options={options}
          search
          searchPlaceholder="Search..."
          selectRow={selectRowProp}
          insertRow
          deleteRow
        >
          <TableHeaderColumn
            dataField="id"
            isKey
            dataAlign="center"
            dataSort
            width="150"
          >
            ID
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="nameCategory"
            dataAlign="center"
            dataSort
          >
            Name of category
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="moneyPlanned"
            dataFormat={priceFormatter}
            dataAlign="center"
            dataSort
            sortFunc={revertSortFunc}
            width="300"
          >
            Total money
          </TableHeaderColumn>
        </BootstrapTable>

        <Modal
          show={this.state.showModal}
          onHide={this.closeModal}
          bsSize="small"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Add new category
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              className="form-control text-center margin-bottom"
              onChange={() => this.handleOnChangeInput()}
              placeholder={
                this.state.textError ?
                  this.state.textError :
                  'Enter a name of category'
              }
              value={this.state.nameCategory}
              maxLength="10"
              ref="name"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>
              Cansel
            </Button>
            <Button bsStyle="primary" onClick={this.saveAndClose}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
