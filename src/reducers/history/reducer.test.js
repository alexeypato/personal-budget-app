import { List } from 'immutable';

import {
  CREATE_HISTORY_SUCCESS,
  LOAD_HISTORY_SUCCESS,
} from './action-types';

import { DELETE_ALL_SUCCESS } from '../unplannedMoney';

import { History } from './history';
import { historyReducer, HistoryState } from './reducer';


describe('history', () => {
  describe('historyReducer', () => {
    let history1;
    let history2;

    beforeEach(() => {
      history1 = new History({
        date: '2017-03-26',
        key: 1,
        keyCategory: 1,
        moneyHistory: 1,
        nameCategory: 'test1',
        type: 'test1',
      });
      history2 = new History({
        date: '2017-03-26',
        key: 2,
        keyCategory: 2,
        moneyHistory: 2,
        nameCategory: 'test2',
        type: 'test2',
      });
    });


    describe('CREATE_HISTORY_SUCCESS', () => {
      it('should prepend new history to list', () => {
        let state = new HistoryState({list: new List([history1])});

        let nextState = historyReducer(state, {
          type: CREATE_HISTORY_SUCCESS,
          payload: history2,
        });

        expect(nextState.list.get(0)).toBe(history1);
        expect(nextState.list.get(1)).toBe(history2);
      });
    });

    describe('DEFAULT', () => {
      it('should default state', () => {
        let state = new HistoryState({list: new List([history1, history2])});

        let nextState = historyReducer(state, {
          type: 'DEFAULT',
        });

        expect(nextState.list).toBe(state.list);
      });
    });

    describe('DELETE_ALL_SUCCESS', () => {
      it('should remove all history', () => {
        let state = new HistoryState({list: new List([history1, history2])});

        let nextState = historyReducer(state, {
          type: DELETE_ALL_SUCCESS,
        });

        expect(nextState.list.size).toBe(0);
      });
    });

    describe('LOAD_HISTORY_SUCCESS', () => {
      it('should set history list', () => {
        let state = new HistoryState();

        let nextState = historyReducer(state, {
          type: LOAD_HISTORY_SUCCESS,
          payload: [history1, history2],
        });

        expect(nextState.list.size).toBe(2);
      });

      it('should order history newest first', () => {
        let state = new HistoryState();

        let nextState = historyReducer(state, {
          type: LOAD_HISTORY_SUCCESS,
          payload: [history1, history2],
        });

        expect(nextState.list.get(0)).toBe(history2);
        expect(nextState.list.get(1)).toBe(history1);
      });
    });
  });
});
