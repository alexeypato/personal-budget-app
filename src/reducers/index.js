import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { authReducer } from './auth';
import { moneysReducer } from './moneys';
import { categoriesReducer } from './categories';
import { expensesReducer } from './expenses';
import { unplannedMoneyReducer } from './unplannedMoney';

export default combineReducers({
  routing: routerReducer,
  auth: authReducer,
  moneys: moneysReducer,
  categories: categoriesReducer,
  unplannedMoney: unplannedMoneyReducer,
  expenses: expensesReducer,
});
