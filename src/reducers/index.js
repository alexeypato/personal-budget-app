import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { authReducer } from './auth';
import { categoriesReducer } from './categories';
import { historyReducer } from './history';
import { unplannedMoneyReducer } from './unplannedMoney';

export default combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  history: historyReducer,
  routing: routerReducer,
  unplannedMoney: unplannedMoneyReducer,
});
