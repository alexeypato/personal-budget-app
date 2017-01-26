import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import money from './money';
import categories from './categories';
import unplannedMoney from './unplannedMoney';

export default combineReducers({
  routing: routerReducer,
  money,
  categories,
  unplannedMoney,
});
