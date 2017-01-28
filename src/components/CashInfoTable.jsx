import React from 'react';
import { BootstrapTable, TableHeaderColumn, ClearSearchButton } from 'react-bootstrap-table';
import { connect } from 'react-redux';

function priceFormatter(cell) {
  return `<i class="glyphicon glyphicon-usd"></i> ${cell}`;
}

function revertSortFunc(a, b, order) {
  if (order === 'desc') {
    return a.cash - b.cash;
  }
  return b.cash - a.cash;
}

class CashInfoTable extends React.Component {
  createCustomClearButton = (onClick) => {
    return (
      <ClearSearchButton
        btnText="Очистить"
        className="my-custom-class"
      />
    );
  }

  render() {
    const options = {
      sizePerPage: 10,
      paginationSize: 3,
      prePage: 'Prev',
      nextPage: 'Next',
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

export default connect(
  (state, ownProps) => ({
    money: state.money,
    ownProps,
  }),
  dispatch => ({
  }),
)(CashInfoTable);
