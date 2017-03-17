import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { authReducer } from './auth';
import { categoriesReducer } from './categories';
import { expensesReducer } from './expenses';
import { moneysReducer } from './moneys';
import { unplannedMoneyReducer } from './unplannedMoney';

export default combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  expenses: expensesReducer,
  moneys: moneysReducer,
  routing: routerReducer,
  unplannedMoney: unplannedMoneyReducer,
});
