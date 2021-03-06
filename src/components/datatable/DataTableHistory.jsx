import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import $ from 'jquery';

class DataTableHistory extends Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
    history: PropTypes.instanceOf(List).isRequired,
  }

  choiceIcon = (type) => {
    switch (type) {
      case 'Пополнение':
        return <i className="glyphicon glyphicon-plus"></i>;

      case 'Перевод':
        return <i className="glyphicon glyphicon-retweet"></i>;

      case 'Расход':
        return <i className="glyphicon glyphicon-minus"></i>;

      default:
        return <i className="glyphicon glyphicon-question-sign"></i>;
    }
  }

  render() {
    const history = this.props.filter === 'Все операции'
      ? this.props.history
      : this.props.history.filter(history => history.type === this.props.filter);
    return (
      <div className="table-responsive margin-top">
        <table
          className="table table-bordered table-hover table-striped table-condensed"
          id="data-table-history"
        >
          <thead>
            <tr>
              <th className="text-center" style={{ width: '15%' }}>Тип</th>
              <th className="text-center" style={{ width: '50%' }}>Название категории</th>
              <th className="text-center" style={{ width: '15%' }}>Сумма</th>
              <th className="text-center" style={{ width: '20%' }}>Дата</th>
            </tr>
          </thead>
          <tbody>
            {history.map((history, index) =>
              <tr key={index}>
                <td className="text-center">
                  {this.choiceIcon(history.type)}
                </td>
                <td className="text-center">
                  {history.nameCategory}
                </td>
                <td className="text-center">
                  {history.moneyHistory}<i className="glyphicon glyphicon-usd"></i>
                </td>
                <td className="text-center">
                  {history.date}
                </td>
              </tr>,
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DataTableHistory;
