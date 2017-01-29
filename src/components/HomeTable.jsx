import React from 'react';
import { connect } from 'react-redux';

class HomeTable extends React.Component {
  render() {
    const categoriesSort = this.props.categories.sort((cat1, cat2) => {
      if (cat1.nameCategory > cat2.nameCategory) return 1;
      if (cat1.nameCategory < cat2.nameCategory) return -1;
      return 0;
    });
    return (
      <div className="vertical-parent height-100">
        <div
          className="vertical-child"
          hidden={categoriesSort.length !== 0}
        >
          <h1>Данные о категориях отсутствуют</h1>
        </div>
        <div
          className="row text-center panel panel-primary height-100"
          hidden={categoriesSort.length === 0}
        >
          <div className="panel-heading">
            <h3 className="panel-title">Запланированно</h3>
          </div>
          <div className="panel-body">
            {categoriesSort.map((category, index) =>
              <div
                className={(categoriesSort.length % 2) === 1 &&
                  (this.props.categories.length === index + 1)
                    ? 'col-md-6 col-md-offset-3 text-center alert alert-info'
                    : 'col-md-6 text-center alert alert-info'
                }
                key={index}
              >
                {category.nameCategory}<h3><b>{category.moneyCategory}</b></h3>
              </div>,
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    categories: state.categories,
    ownProps,
  }),
  dispatch => ({
  }),
)(HomeTable);
