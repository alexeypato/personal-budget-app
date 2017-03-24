import { createSelector } from 'reselect';

export function getHistory(state) {
  return state.history;
}

export function getHistoryList(state) {
  return getHistory(state).list;
}

export function getHistoryFilter(state) {
  return getHistory(state).filter;
}

export const getVisibleHistory = createSelector(
  getHistoryList,
  getHistoryFilter,
  (history, filter) => {
    switch (filter) {
      case 'Расход':
        return history.filter(history => history.type === 'Расход');

      case 'Пополнение':
        return history.filter(history => history.type === 'Пополнение');

      case 'Перевод':
        return history.filter(history => history.type === 'Перевод');

      default:
        return history;
    }
  },
);
