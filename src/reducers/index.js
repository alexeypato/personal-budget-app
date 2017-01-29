import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import money from './money';
import categories from './categories';
import expenses from './expenses';
import unplannedMoney from './unplannedMoney';

export default combineReducers({
  routing: routerReducer,
  money,
  categories,
  unplannedMoney,
  expenses,
});
