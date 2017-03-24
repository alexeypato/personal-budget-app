import { FirebaseList } from '../../firebase';
import * as historyActions from './actions';
import { History } from './history';

export const historyList = new FirebaseList({
  onAdd: historyActions.createHistorySuccess,
  onLoad: historyActions.loadHistorySuccess,
}, History);
