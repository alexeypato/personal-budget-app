import React, { Component, PropTypes } from 'react';
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
    this.dataTableCreate();
  }

  componentWillUpdate = () => {
    $('#datatable').DataTable().destroy();
  }

  componentDidUpdate = () => {
    this.dataTableCreate();
  }

  dataTableCreate = () => {
    $('#datatable').dataTable({
      iDisplayLength: 20,
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
      order: [[1, 'desc']],
      stateSave: true,
    });
  }

  render() {
    return (
      <div>
        <div className="table-responsive" style={{ marginTop: '10px' }}>
          <table
            id="datatable"
            className="table table-bordered table-hover table-striped table-condensed"
          >
            <thead>
              <tr>
                <th className="text-center" style={{ width: '60%' }}>Сумма внесенных средств</th>
                <th className="text-center" style={{ width: '40%' }}>Дата</th>
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
