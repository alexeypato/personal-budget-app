import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class HomeTable extends React.Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      nameCategory: PropTypes.string,
      moneyCategory: PropTypes.number,
    })),
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
          hidden={categoriesSort.length !== 0}
        >
          <h2>Список категорий пуст</h2>
        </div>
        <div
          className="row text-center"
          hidden={categoriesSort.length === 0}
          style={{ marginTop: '10px' }}
        >
          {categoriesSort.map((category, index) =>
            <div
              className={(categoriesSort.length % 2) === 1 &&
                (categoriesSort.length === index + 1)
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
                <h4>
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

export default connect(
  state => ({
    categories: state.categories,
  }),
  null,
)(HomeTable);
