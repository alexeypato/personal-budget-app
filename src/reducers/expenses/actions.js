import { expenseList } from './expense-list';
import {
  CREATE_EXPENSE_SUCCESS,
  LOAD_EXPENSES_SUCCESS,
} from './action-types';

export function createExpense(date, keyCategory, moneyExpense, nameCategory) {
  return () => {
    expenseList.push({ date, keyCategory, moneyExpense, nameCategory })
      .catch(error => console.log(`createExpense: ${error}`));
  };
}

export function createExpenseSuccess(expense) {
  return {
    type: CREATE_EXPENSE_SUCCESS,
    payload: expense,
  };
}

export function loadExpensesSuccess(expenses) {
  return {
    type: LOAD_EXPENSES_SUCCESS,
    payload: expenses,
  };
}

export function loadExpenses() {
  return (dispatch, getState) => {
    const { auth } = getState();
    expenseList.path = `${auth.id}/expenses`;
    expenseList.subscribe(dispatch);
  };
}

export function unloadExpenses() {
  return () => {
    expenseList.unsubscribe();
  };
}
