import { List, Record } from 'immutable';

import {
  CREATE_MONEY_SUCCESS,
  LOAD_MONEYS_SUCCESS,
} from './action-types';

import { DELETE_UNPLANNEDMONEY_SUCCESS } from '../unplannedMoney';


export const MoneysState = new Record({
  deleted: null,
  list: new List(),
  previous: null,
});

export function moneysReducer(state = new MoneysState(), { payload, type }) {
  switch (type) {
    case CREATE_MONEY_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.deleted && state.deleted.key === payload.key ?
              state.previous :
              state.list.unshift(payload),
      });

    case DELETE_UNPLANNEDMONEY_SUCCESS:
      return new MoneysState();

    case LOAD_MONEYS_SUCCESS:
      return state.set('list', new List(payload.reverse()));

    default:
      return state;
  }
}
