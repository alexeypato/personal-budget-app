import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { authReducer } from '../auth';

import money from './money';
import categories from './categories';
import expenses from './expenses';
import unplannedMoney from './unplannedMoney';

export { getUnplannedMoney } from './selectors';

export default combineReducers({
  routing: routerReducer,
  auth: authReducer,
  money,
  categories,
  unplannedMoney,
  expenses,
});
