import { FirebaseList } from '../../firebase';
import * as expenseActions from './actions';
import { Expense } from './expense';

export const expenseList = new FirebaseList({
  onAdd: expenseActions.createExpenseSuccess,
  onLoad: expenseActions.loadExpensesSuccess,
}, Expense);
