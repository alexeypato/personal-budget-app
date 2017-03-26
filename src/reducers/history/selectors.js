export function getHistory(state) {
  return state.history;
}

export function getHistoryList(state) {
  return getHistory(state).list;
}
