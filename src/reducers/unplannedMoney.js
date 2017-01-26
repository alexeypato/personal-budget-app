const initialState = 0;

export default function actionUnplannedMoney(state = initialState, action) {
  if (action.type === 'ADD_UNPLANNED_MONEY') {
    return (state += +action.addMoney);
  } else if (action.type === 'DELETE_UNPLANNED_MONEY') {
    return (state -= +action.cashCategory);
  } else if (action.type === 'CLEAR_UNPLANNED_MONEY') {
    return (state = 0);
  }
  return state;
}
