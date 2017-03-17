import { moneyList } from './money-list';
import {
  CREATE_MONEY_SUCCESS,
  LOAD_MONEYS_SUCCESS,
} from './action-types';

export function createMoney(date, money) {
  return () => {
    moneyList.push({ date, money })
      .catch(error => console.log(`createMoney: ${error}`));
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
  return () => {
    moneyList.unsubscribe();
  };
}
