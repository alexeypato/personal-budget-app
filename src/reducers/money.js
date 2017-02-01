const initialState = [];

export default function actionMoney(state = initialState, action) {
  switch (action.type) {
    case 'ADD_MONEY':
      return [
        ...state,
        {
          id: state.reduce((maxId, money) => Math.max(money.id, maxId), -1) + 1,
          money: action.deposit,
          date: action.addDate,
        },
      ];

    case 'CLEAR_MONEY':
      return (state = []);

    default:
      return state;
  }
}
