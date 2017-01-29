import React from 'react';
import { BootstrapTable, TableHeaderColumn, ClearSearchButton } from 'react-bootstrap-table';
import { connect } from 'react-redux';

class DepositsTable extends React.Component {
  priceFormatter = (cell, row) => {
    return `<i class="glyphicon glyphicon-usd"></i> ${cell}`;
  }

  revertSortFunc = (a, b, order) => {
    if (order === 'desc') {
      return a.money - b.money;
    }
    return b.money - a.money;
  }

  createCustomClearButton = (onClick) => {
    return (
      <ClearSearchButton btnText="Очистить" />
    );
  }

  render() {
    const options = {
      sizePerPage: 10,
      paginationSize: 3,
      hideSizePerPage: true,
      defaultSortName: 'id',
      defaultSortOrder: 'desc',
      clearSearch: true,
      clearSearchBtn: this.createCustomClearButton,
    };

    return (
      <div>
        <BootstrapTable
          data={this.props.money}
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
            dataField="money"
            dataFormat={this.priceFormatter}
            dataAlign="center"
            dataSort
            sortFunc={this.revertSortFunc}
          >
            Сумма внесенных средств
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="date"
            dataAlign="center"
            dataSort
            width="200"
          >
            Дата
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    money: state.money,
    ownProps,
  }),
  dispatch => ({
  }),
)(DepositsTable);
