import React from 'react';
import { BootstrapTable, TableHeaderColumn, InsertButton } from 'react-bootstrap-table';
import Dialog from 'react-bootstrap-dialog';

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
  handleInsertButtonClick = () => {
    this.refs.addCat.show({
      title: 'Clear accountHistory',
      body: 'You are precisely sure that you want to remove all history?',
      actions: [
        Dialog.CancelAction(),
        Dialog.Action(
          'ОК',
          () => {
          },
          'btn-danger',
          ),
      ],
      bsSize: 'small',
      onHide: (dialog) => {
        dialog.hide();
      },
    });
  }

  createCustomInsertButton = (onClick) => {
    return (
      <InsertButton
        btnText="Add Category"
        btnContextual="btn-warning"
        className="my-custom-class"
        onClick={() => this.handleInsertButtonClick(onClick)}
      />
    );
  }

  render() {
    const options = {
      // afterInsertRow: onAfterInsertRow,   // A hook for after insert rows
      sizePerPage: 5,  // which size per page you want to locate as default
      paginationSize: 3,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      hideSizePerPage: true,
      defaultSortName: 'id',  // default sort column name
      defaultSortOrder: 'desc',  // default sort order
      clearSearch: true,
      insertBtn: this.createCustomInsertButton,
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
        <Dialog ref="addCat" />
      </div>
    );
  }
}
