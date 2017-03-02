import React, { Component, PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn, ClearSearchButton } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import $ from 'jquery';

class DepositsTable extends Component {
  static propTypes = {
    money: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      money: PropTypes.number,
      date: PropTypes.string,
    })),
  }

  componentDidMount = () => {
    $(document).ready(() => {
      $('#datatable').dataTable({
        iDisplayLength: 15,
        language: {
          processing: 'Подождите...',
          search: 'Поиск:',
          lengthMenu: 'Показать _MENU_ записей',
          info: 'Записи с _START_ до _END_ из _TOTAL_ записей',
          infoEmpty: 'Записи с 0 до 0 из 0 записей',
          infoFiltered: '(отфильтровано из _MAX_ записей)',
          infoPostFix: '',
          loadingRecords: 'Загрузка записей...',
          zeroRecords: 'Записи отсутствуют.',
          emptyTable: 'В таблице отсутствуют данные',
          paginate: {
            first: 'Первая',
            previous: 'Предыдущая',
            next: 'Следующая',
            last: 'Последняя',
          },
          aria: {
            sortAscending: ': активировать для сортировки столбца по возрастанию',
            sortDescending: ': активировать для сортировки столбца по убыванию',
          },
        },
      });
    });
  }

  componentWillUpdate = () => {
    $('#datatable').DataTable().destroy();
  }

  componentDidUpdate = () => {
    $('#datatable').dataTable({
      iDisplayLength: 15,
      language: {
        processing: 'Подождите...',
        search: 'Поиск:',
        lengthMenu: 'Показать _MENU_ записей',
        info: 'Записи с _START_ до _END_ из _TOTAL_ записей',
        infoEmpty: 'Записи с 0 до 0 из 0 записей',
        infoFiltered: '(отфильтровано из _MAX_ записей)',
        infoPostFix: '',
        loadingRecords: 'Загрузка записей...',
        zeroRecords: 'Записи отсутствуют.',
        emptyTable: 'В таблице отсутствуют данные',
        paginate: {
          first: 'Первая',
          previous: 'Предыдущая',
          next: 'Следующая',
          last: 'Последняя',
        },
        aria: {
          sortAscending: ': активировать для сортировки столбца по возрастанию',
          sortDescending: ': активировать для сортировки столбца по убыванию',
        },
      },
    });
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
        <div className="table-responsive" style={{ marginTop: 10 + 'px' }}>
          <table
            id="datatable"
            className="table table-bordered table-hover table-striped table-condensed"
          >
            <thead>
              <tr>
                <th className="text-center">Сумма внесенных средств</th>
                <th className="text-center" style={{ width: 100 + 'px' }}>Дата</th>
              </tr>
            </thead>
            <tbody>
              {this.props.money.map((money, index) =>
                <tr key={index}>
                  <td className="text-center">
                    {money.money}<i className="glyphicon glyphicon-usd"></i>
                  </td>
                  <td className="text-center">{money.date}</td>
                </tr>,
              )}
            </tbody>
          </table>
          {/* <div>
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
                width="100px"
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
                width="200px"
              >
                Дата
              </TableHeaderColumn>
            </BootstrapTable>
          </div>*/}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    money: state.money,
  }),
  null,
)(DepositsTable);
