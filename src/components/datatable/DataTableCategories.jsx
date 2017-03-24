import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';

class DataTableCategories extends Component {
  static propTypes = {
    categories: PropTypes.instanceOf(List).isRequired,
    showDeleteCategoryModal: PropTypes.func.isRequired,
    showUpdateCategoryModal: PropTypes.func.isRequired,
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
              <th className="text-center">Название категории</th>
              <th className="text-center" style={{ width: '20%' }}>Баланс</th>
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
