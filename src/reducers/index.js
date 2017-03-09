import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { authReducer } from './auth';
import { moneyReducer } from './money';
import { categoriesReducer } from './categories';
import { expensesReducer } from './expenses';
import { unplannedMoneyReducer } from './unplannedMoney';

export default combineReducers({
  routing: routerReducer,
  auth: authReducer,
  money: moneyReducer,
  categories: categoriesReducer,
  unplannedMoney: unplannedMoneyReducer,
  expenses: expensesReducer,
});
