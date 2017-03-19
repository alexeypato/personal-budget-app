import {
  DELETE_UNPLANNEDMONEY_SUCCESS,
  LOAD_UNPLANNEDMONEY_SUCCESS,
  UPDATE_UNPLANNEDMONEY_SUCCESS,
} from './action-types';

const unplannedMoneyState = 0;

export function unplannedMoneyReducer(state = unplannedMoneyState, { payload, type }) {
  switch (type) {
    case DELETE_UNPLANNEDMONEY_SUCCESS:
      return unplannedMoneyState;

    case LOAD_UNPLANNEDMONEY_SUCCESS: {
      return (payload === null ? state : payload);
    }

    case UPDATE_UNPLANNEDMONEY_SUCCESS: {
      return payload;
    }

    default:
      return state;
  }
}
