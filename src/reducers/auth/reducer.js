import { Record } from 'immutable';
import { INIT_AUTH, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS } from './action-types';

export const AuthState = new Record({
  authenticated: false,
  displayName: null,
  email: null,
  id: null,
});

export function authReducer(state = new AuthState(), { payload, type }) {
  switch (type) {
    case INIT_AUTH:
    case SIGN_IN_SUCCESS: {
      return state.merge({
        authenticated: !!payload,
        displayName: payload ? payload.displayName : null,
        email: payload ? payload.email : null,
        id: payload ? payload.uid : null,
      });
    }

    case SIGN_OUT_SUCCESS:
      return new AuthState();

    default:
      return state;
  }
}
