const initialState = [];

export default function actionCategories(state = initialState, action) {
  if (action.type === 'ADD_CATEGORY') {
    return [
      ...state,
      action.payload
    ];
  } else if (action.type === 'EDIT_CATEGORY') {
    return state.map(todo =>
      todo.id === action.id ?
        { ...todo, nameCategory: action.nameCategory, moneyPlanned: action.moneyPlanned } :
        todo
    )
  } else if (action.type === 'DELETE_CATEGORY') {
    return state.filter(todo =>
      todo.id !== Number(action.id)
    );
  } else if (action.type === 'CLEAR_CATEGORY') {
    return (state = []);
  }
  return state;
}
