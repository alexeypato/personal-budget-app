import { List, Record } from 'immutable';

import {
  CREATE_HISTORY_SUCCESS,
  LOAD_HISTORY_SUCCESS,
} from './action-types';

import { DELETE_UNPLANNEDMONEY_SUCCESS } from '../unplannedMoney';

export const HistoryState = new Record({
  deleted: null,
  filter: '',
  list: new List(),
  previous: null,
});

export function historyReducer(state = new HistoryState(), { payload, type }) {
  switch (type) {
    case CREATE_HISTORY_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.deleted && state.deleted.key === payload.key ?
              state.previous :
              state.list.push(payload),
      });

    case DELETE_UNPLANNEDMONEY_SUCCESS:
      return new HistoryState();

    case LOAD_HISTORY_SUCCESS:
      return state.set('list', new List(payload.reverse()));

    default:
      return state;
  }
}
