export function getMoneys(state) {
  return state.moneys;
}

export function getMoneyList(state) {
  return getMoneys(state).list;
}
