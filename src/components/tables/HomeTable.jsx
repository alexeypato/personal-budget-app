import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { List } from 'immutable';

import { getCategoryList, categorieActions } from '../../reducers/categories';

class HomeTable extends React.Component {
  static propTypes = {
    categories: PropTypes.instanceOf(List).isRequired,
  }

  render() {
    const categoriesSort = this.props.categories.sort((cat1, cat2) => {
      if (cat1.nameCategory > cat2.nameCategory) return 1;
      if (cat1.nameCategory < cat2.nameCategory) return -1;
      return 0;
    });
    return (
      <div>
        <div
          className="row text-center"
          hidden={(categoriesSort._capacity !== 0)}
        >
          <h2>Список категорий пуст</h2>
        </div>
        <div
          className="row text-center"
          hidden={categoriesSort._capacity === 0}
          style={{ marginTop: '10px' }}
        >
          {categoriesSort.map((category, index) =>
            <div
              className={(categoriesSort._capacity % 2) === 1 &&
                (categoriesSort._capacity === index + 1)
                  ? 'col-md-6 col-md-offset-3'
                  : 'col-md-6'
              }
              key={index}
            >
              <div className="text-center backgroun-categories">
                <p
                  data-toggle="tooltip"
                  title={category.nameCategory}
                >{category.nameCategory}</p>
                <h4 style={{ color: 'darkslategray' }}>
                  <span
                    className="glyphicon glyphicon-usd"
                  >
                  </span> <b>{category.moneyCategory}</b>
                </h4>
              </div>
            </div>,
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  getCategoryList,
  categories => ({
    categories,
  }),
);

export default connect(
  mapStateToProps,
  null,
)(HomeTable);
