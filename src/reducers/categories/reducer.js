export const initialState = [];

export function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return [
        ...state,
        {
          id: state.reduce((maxId, expense) => Math.max(expense.id, maxId), -1) + 1,
          nameCategory: action.nameCategory,
          moneyCategory: action.withdrawal,
        },
      ];

    case 'EDIT_CATEGORY':
      return state.map((category) => {
        return (category.id === action.id
          ? {
            ...category,
            nameCategory: action.nameCategory,
            moneyCategory: action.moneyCategory,
          }
          : category
        );
      });

    case 'ADD_MONEY_TO_CATEGORY':
      return state.map((category) => {
        return (category.id === action.id
          ? {
            ...category,
            moneyCategory: category.moneyCategory + action.moneyCategory,
          }
          : category
        );
      });

    case 'DELETE_MONEY_TO_CATEGORY':
      return state.map((category) => {
        return (category.id === action.idCategory
          ? {
            ...category,
            moneyCategory: category.moneyCategory - action.moneyToExpenses,
          }
          : category
        );
      });

    case 'DELETE_CATEGORY':
      return state.filter(category => category.id !== action.id);

    case 'CLEAR_CATEGORY':
      return (state = []);

    default:
      return state;
  }
}
