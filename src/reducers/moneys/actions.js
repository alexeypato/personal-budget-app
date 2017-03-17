import { moneyList } from './money-list';
import {
  CREATE_MONEY_ERROR,
  CREATE_MONEY_SUCCESS,
  LOAD_MONEYS_SUCCESS,
  UNLOAD_MONEYS_SUCCESS,
} from './action-types';

export function createMoneyError(error) {
  return {
    type: CREATE_MONEY_ERROR,
    payload: error,
  };
}

export function createMoney(date, money) {
  return (dispatch) => {
    moneyList.push({ date, money })
      .catch(error => dispatch(createMoneyError(error)));
  };
}

export function createMoneySuccess(money) {
  return {
    type: CREATE_MONEY_SUCCESS,
    payload: money,
  };
}

export function loadMoneysSuccess(moneys) {
  return {
    type: LOAD_MONEYS_SUCCESS,
    payload: moneys,
  };
}

export function loadMoneys() {
  return (dispatch, getState) => {
    const { auth } = getState();
    moneyList.path = `${auth.id}/moneys`;
    moneyList.subscribe(dispatch);
  };
}

export function unloadMoneys() {
  moneyList.unsubscribe();
  return {
    type: UNLOAD_MONEYS_SUCCESS,
  };
}
