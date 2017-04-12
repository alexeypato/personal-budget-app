import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

class DataTableCategories extends Component {
  static propTypes = {
    categories: PropTypes.instanceOf(List).isRequired,
    showDeleteCategoryModal: PropTypes.func.isRequired,
    showUpdateCategoryModal: PropTypes.func.isRequired,
  }

  getPercents = (value1, value2) => {
    if ((value1 && value2) < 1) {
      return 0;
    }
    return Math.round(((value1 / value2) * 100) * 100) / 100;
  }

  getColorPercents = (value1, value2) => {
    if (this.getPercents(value1, value2) < 20) {
      return 'progress-bar-danger';
    }
    if (this.getPercents(value1, value2) > 20 && this.getPercents(value1, value2) < 100) {
      return 'progress-bar-warning';
    }
    if (this.getPercents(value1, value2) > 100) {
      return 'progress-bar-success';
    }
    return '';
  }

  render() {
    return (
      <div className="table-responsive margin-top">
        <table
          className="table table-bordered table-hover table-striped table-condensed"
          id="data-table-categories"
        >
          <thead>
            <tr>
              <th className="text-center">Категория</th>
              <th className="text-center" style={{ width: '10%' }}>Баланс</th>
              <th className="text-center" style={{ width: '20%' }}>Цель</th>
              <th className="text-center" style={{ width: '1%' }}></th>
              <th className="text-center" style={{ width: '1%' }}></th>
            </tr>
          </thead>
          <tbody>
            {this.props.categories.map((category, index) =>
              <tr key={index}>
                <td className="text-center">
                  {category.nameCategory}
                </td>
                <td className="text-center">
                  {category.moneyCategory}<i className="glyphicon glyphicon-usd"></i>
                </td>
                <td
                  className="text-center"
                  data-toggle="tooltip"
                  title={`Цель: ${category.progress || 0}$;
Прогресс: ${this.getPercents(category.moneyCategory, category.progress)}% `}
                >
                  <div className="progress" style={{ margin: '0px' }}>
                    <div
                      className={`progress-bar
 ${this.getColorPercents(category.moneyCategory, category.progress)} progress-bar-striped`}
                      role="progressbar"
                      aria-valuenow={this.getPercents(category.moneyCategory, category.progress)}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: `${
                        this.getPercents(
                          category.moneyCategory,
                          category.progress,
                        )
                      }%` }}
                    >
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-xs btn-primary"
                    data-toggle="tooltip"
                    id={`show-update-category-modal-${index}`}
                    onClick={() => this.props.showUpdateCategoryModal(category, index)}
                    title="Редактировать"
                    type="button"
                  >
                    <span className="glyphicon glyphicon-pencil"></span>
                  </button>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-xs btn-danger"
                    data-toggle="tooltip"
                    id={`show-delete-category-modal-${index}`}
                    onClick={() => this.props.showDeleteCategoryModal(category, index)}
                    title="Удалить"
                    type="button"
                  >
                    <span className="glyphicon glyphicon-trash"></span>
                  </button>
                </td>
              </tr>,
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DataTableCategories;
