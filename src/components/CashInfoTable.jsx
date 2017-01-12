import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

function priceFormatter(cell) {
  return `<i class="glyphicon glyphicon-usd"></i> ${cell}`;
}

function revertSortFunc(a, b, order) {
  if (order === 'desc') {
    return a.cash - b.cash;
  }

  return b.cash - a.cash;
}

export default class CashInfoTable extends React.Component {
  render() {
    const options = {
      sizePerPage: 10,  // which size per page you want to locate as default
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
          searchPlaceholder="Поиск..."
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
            dataField="cash"
            dataFormat={priceFormatter}
            dataAlign="center"
            dataSort
            sortFunc={revertSortFunc}
          >
            Сумма внесенных средств
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="date"
            dataAlign="center"
            dataSort
            width="200"
          >
            Дата внесения
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
