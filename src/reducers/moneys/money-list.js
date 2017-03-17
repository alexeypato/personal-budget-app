import { FirebaseList } from '../../firebase';
import * as moneyActions from './actions';
import { Money } from './money';

export const moneyList = new FirebaseList({
  onAdd: moneyActions.createMoneySuccess,
  onLoad: moneyActions.loadMoneysSuccess,
}, Money);
