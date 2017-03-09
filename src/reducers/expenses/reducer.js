export const initialState = [];

export function expensesReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        {
          id: state.reduce((maxId, expense) => Math.max(expense.id, maxId), -1) + 1,
          idCategory: action.idCategory,
          nameCategory: action.nameCategory,
          moneyExpense: action.moneyToExpenses,
          date: action.dateExpense,
        },
      ];

    case 'CLEAR_EXPENSE':
      return (state = []);

    default:
      return state;
  }
}
