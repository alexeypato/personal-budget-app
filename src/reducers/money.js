const initialState = [];

export default function actionMoney(state = initialState, action) {
  if (action.type === 'ADD_MONEY') {
    return [
      ...state,
      action.payload,
    ];
  } else if (action.type === 'CLEAR_MONEY') {
    return (state = []);
  }
  return state;
}
