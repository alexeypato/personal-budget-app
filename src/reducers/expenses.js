const initialState = [];

export default function actionExpenses(state = initialState, action) {
  if (action.type === 'ADD_EXPENSE') {
    return [
      ...state,
      action.expense
    ];
  } else if (action.type === 'DELETE_EXPENSE') {
    return state.filter(expense =>
      expense.idCategory !== Number(action.id)
    );
  } else if (action.type === 'CLEAR_EXPENSE') {
    return (state = []);
  }
  return state;
}
