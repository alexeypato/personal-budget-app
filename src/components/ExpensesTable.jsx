import React, { Component, PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn, ClearSearchButton } from 'react-bootstrap-table';
import { connect } from 'react-redux';

class ExpensesTable extends Component {
  static propTypes = {
    expenses: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      idCategory: PropTypes.number,
      nameCategory: PropTypes.string,
      moneyExpense: PropTypes.number,
      date: PropTypes.string,
    })),
  }

  priceFormatter = (cell, row) => {
    return `<i class="glyphicon glyphicon-usd"></i> ${cell}`;
  }

  revertSortFunc = (a, b, order) => {
    if (order === 'desc') {
      return a.moneyExpense - b.moneyExpense;
    }
    return b.moneyExpense - a.moneyExpense;
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
      defaultSortName: 'date',
      defaultSortOrder: 'desc',
      clearSearch: true,
      clearSearchBtn: this.createCustomClearButton,
    };

    return (
      <div>
        <BootstrapTable
          data={this.props.expenses}
          striped
          pagination
          options={options}
          search
          searchPlaceholder="Поиск..."
        >
          <TableHeaderColumn
            dataField="id"
            isKey
            width="100px"
            hidden
          >
            ID
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="idCategory"
            hidden
          >
            ID категории
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="nameCategory"
            dataAlign="center"
            dataSort
          >
            Название категории
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="moneyExpense"
            dataFormat={this.priceFormatter}
            dataAlign="center"
            dataSort
            width="200px"
            sortFunc={this.revertSortFunc}
          >
            Сумма расходов
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="date"
            dataAlign="center"
            dataSort
            width="150px"
          >
            Дата
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default connect(
  state => ({
    expenses: state.expenses,
  }),
  null,
)(ExpensesTable);
