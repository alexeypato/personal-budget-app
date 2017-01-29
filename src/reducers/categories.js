const initialState = [];

export default function actionCategories(state = initialState, action) {
  if (action.type === 'ADD_CATEGORY') {
    return [
      ...state,
      action.category
    ];
  } else if (action.type === 'EDIT_CATEGORY') {
    return state.map(category =>
      category.id === action.id ?
        {
          ...category,
          nameCategory: action.nameCategory,
          moneyCategory: action.moneyCategory
        } :
        category
    )
  } else if (action.type === 'ADD_MONEY_TO_CATEGORY') {
    return state.map(category =>
      category.id === action.id ?
        {
          ...category,
          moneyCategory: Number(category.moneyCategory) + Number(action.moneyCategory)
        } :
        category
    )
  } else if (action.type === 'DELETE_MONEY_TO_CATEGORY') {
    return state.map(category =>
      category.id === action.idCategory ?
        {
          ...category,
          moneyCategory: Number(category.moneyCategory) - Number(action.moneyToExpenses)
        } :
        category
    )
  } else if (action.type === 'DELETE_CATEGORY') {
    return state.filter(category =>
      category.id !== Number(action.id)
    );
  } else if (action.type === 'CLEAR_CATEGORY') {
    return (state = []);
  }
  return state;
}
