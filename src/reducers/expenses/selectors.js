export function getExpenses(state) {
  return state.expenses;
}

export function getExpenseList(state) {
  return getExpenses(state).list;
}
