import {
  DELETE_ALL_SUCCESS,
  LOAD_UNPLANNEDMONEY_SUCCESS,
  UPDATE_UNPLANNEDMONEY_SUCCESS,
} from './action-types';

import { unplannedMoneyReducer } from './reducer';

describe('unplannedMoney', () => {
  describe('unplannedMoneyReducer', () => {
    describe('DEFAULT', () => {
      it('should default state', () => {
        let state = 100;

        let nextState = unplannedMoneyReducer(state, {
          type: 'DEFAULT',
          payload: 100,
        });

        expect(nextState).toBe(state);
      });
    });

    describe('DELETE_ALL_SUCCESS', () => {
      it('should remove all unplannedMoney', () => {
        let state = 100;

        let nextState = unplannedMoneyReducer(state, {
          type: DELETE_ALL_SUCCESS,
        });

        expect(nextState).toBe(0);
      });
    });

    describe('LOAD_UNPLANNEDMONEY_SUCCESS', () => {
      it('should payload === null', () => {
        let state = 100;

        let nextState = unplannedMoneyReducer(state, {
          type: LOAD_UNPLANNEDMONEY_SUCCESS,
          payload: null,
        });

        expect(nextState).toBe(100);
      });

      it('should payload === 100', () => {
        let state = 0;

        let nextState = unplannedMoneyReducer(state, {
          type: LOAD_UNPLANNEDMONEY_SUCCESS,
          payload: 100,
        });

        expect(nextState).toBe(100);
      });
    });

    describe('UPDATE_UNPLANNEDMONEY_SUCCESS', () => {
      it('should default state', () => {
        let state = 0;

        let nextState = unplannedMoneyReducer(state, {
          type: UPDATE_UNPLANNEDMONEY_SUCCESS,
          payload: 100,
        });

        expect(nextState).toBe(100);
      });
    });
  });
});
