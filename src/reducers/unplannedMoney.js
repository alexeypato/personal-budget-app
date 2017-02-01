const initialState = 0;

export default function actionUnplannedMoney(state = initialState, action) {
  switch (action.type) {
    case 'ADD_UNPLANNED_MONEY':
      return (state += action.deposit);

    case 'DELETE_UNPLANNED_MONEY':
      return (state -= action.withdrawal);

    case 'CLEAR_UNPLANNED_MONEY':
      return (state = 0);

    default:
      return state;
  }
}
