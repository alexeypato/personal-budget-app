import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { categorieActions } from '../reducers/categories';
import { expensesActions } from '../reducers/expenses';
import { moneysActions } from '../reducers/moneys';
import { unplannedMoneyActions } from '../reducers/unplannedMoney';

class Home extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    loadCategories: PropTypes.func.isRequired,
    loadExpenses: PropTypes.func.isRequired,
    loadMoneys: PropTypes.func.isRequired,
    loadUnplannedMoney: PropTypes.func.isRequired,
    unloadCategories: PropTypes.func.isRequired,
    unloadExpenses: PropTypes.func.isRequired,
    unloadMoneys: PropTypes.func.isRequired,
    unloadUnplannedMoney: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.loadCategories();
    this.props.loadExpenses();
    this.props.loadMoneys();
    this.props.loadUnplannedMoney();
  }

  componentWillUnmount() {
    this.props.unloadCategories();
    this.props.unloadExpenses();
    this.props.unloadMoneys();
    this.props.unloadUnplannedMoney();
  }

  render() {
    return (
      <div className="intro-header">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = Object.assign(
  {},
  categorieActions,
  expensesActions,
  moneysActions,
  unplannedMoneyActions,
);

export default connect(
  null,
  mapDispatchToProps,
)(Home);
