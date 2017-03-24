import { historyList } from './history-list';
import {
  CREATE_HISTORY_SUCCESS,
  FILTER_HISTORY,
  LOAD_HISTORY_SUCCESS,
} from './action-types';

export function createHistory(date, keyCategory, moneyHistory, nameCategory, type) {
  return () => {
    historyList.push({ date, keyCategory, moneyHistory, nameCategory, type })
      .catch(error => console.log(`createHistory: ${error}`));
  };
}

export function createHistorySuccess(history) {
  return {
    type: CREATE_HISTORY_SUCCESS,
    payload: history,
  };
}

export function filterHistory(filterType) {
  return {
    type: FILTER_HISTORY,
    payload: { filterType },
  };
}

export function loadHistorySuccess(history) {
  return {
    type: LOAD_HISTORY_SUCCESS,
    payload: history,
  };
}

export function loadHistory() {
  return (dispatch, getState) => {
    const { auth } = getState();
    historyList.path = `${auth.id}/history`;
    historyList.subscribe(dispatch);
  };
}

export function unloadHistory() {
  return () => {
    historyList.unsubscribe();
  };
}
