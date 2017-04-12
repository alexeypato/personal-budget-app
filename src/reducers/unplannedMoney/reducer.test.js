import {
  LOAD_UNPLANNEDMONEY_SUCCESS,
} from './action-types';

import { unplannedMoneyReducer } from './reducer';

describe('unplannedMoney', () => {
  describe('unplannedMoneyReducer', () => {
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
  });
});
