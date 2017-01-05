import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

function priceFormatter(cell) {
  return `<i class="glyphicon glyphicon-usd"></i> ${cell}`;
}

function revertSortFunc(a, b, order) {   // order is desc or asc
  if (order === 'desc') {
    return a.cash - b.cash;
  }

  return b.cash - a.cash;
}

export default class CashInfoTable extends React.Component {
  render() {
  /* const options = {
      page: 0,  // which page you want to show as default
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: this.props.accountHistory.length
      } ], // you can change the dropdown list for size per page
      sizePerPage: 5,  // which size per page you want to locate as default
      pageStartIndex: 0, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text
      paginationShowsTotal: true,  // Accept bool or function
      hideSizePerPage: true //> You can hide the dropdown for sizePerPage
    };*/

    const options = {
      sizePerPage: 5,  // which size per page you want to locate as default
      paginationSize: 3,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      hideSizePerPage: true,
      defaultSortName: 'id',  // default sort column name
      defaultSortOrder: 'desc',  // default sort order
      clearSearch: true,
    };

    return (
      <div>
        <BootstrapTable
          data={this.props.accountHistory}
          striped
          pagination
          options={options}
          search
          searchPlaceholder="Search..."
        >
          <TableHeaderColumn
            dataField="id"
            isKey
            dataAlign="center"
            dataSort
            width="100"
          >
            ID
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="cash"
            dataFormat={priceFormatter}
            dataAlign="center"
            dataSort
            sortFunc={revertSortFunc}
          >
            Sum of money
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="date"
            dataAlign="center"
            dataSort
            width="200"
          >
            Date of receipt
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
