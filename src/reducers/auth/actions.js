import firebase from 'firebase';
import { firebaseAuth } from '../../firebase';
import {
  INIT_AUTH,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
} from './action-types';

export function initAuth(user) {
  return {
    type: INIT_AUTH,
    payload: user,
  };
}

export function signInSuccess(result) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: result.user,
  };
}

export function signOutSuccess() {
  return {
    type: SIGN_OUT_SUCCESS,
  };
}

export function signOut() {
  return (dispatch) => {
    firebaseAuth.signOut()
      .then(() => dispatch(signOutSuccess()));
  };
}

function authenticate(provider) {
  return (dispatch) => {
    firebaseAuth.signInWithPopup(provider)
      .then(result => dispatch(signInSuccess(result)))
      .catch(error => console.log(`authenticate: ${error}`));
  };
}

export function signInWithGoogle() {
  return authenticate(new firebase.auth.GoogleAuthProvider());
}

export function signInWithFacebook() {
  return authenticate(new firebase.auth.FacebookAuthProvider());
}

export function signInWithTwitter() {
  return authenticate(new firebase.auth.TwitterAuthProvider());
}
