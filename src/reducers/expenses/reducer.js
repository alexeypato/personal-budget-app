import { List, Record } from 'immutable';

import {
  CREATE_EXPENSE_SUCCESS,
  LOAD_EXPENSES_SUCCESS,
} from './action-types';

import { DELETE_UNPLANNEDMONEY_SUCCESS } from '../unplannedMoney';

export const ExpensesState = new Record({
  deleted: null,
  list: new List(),
  previous: null,
});

export function expensesReducer(state = new ExpensesState(), { payload, type }) {
  switch (type) {
    case CREATE_EXPENSE_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.deleted && state.deleted.key === payload.key ?
              state.previous :
              state.list.push(payload),
      });

    case DELETE_UNPLANNEDMONEY_SUCCESS:
      return new ExpensesState();

    case LOAD_EXPENSES_SUCCESS:
      return state.set('list', new List(payload.reverse()));

    default:
      return state;
  }
}
