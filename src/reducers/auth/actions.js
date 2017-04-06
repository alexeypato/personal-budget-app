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
    payload: result.user || result,
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
      .catch(error => alert(error));
  };
}

export function resetPassword(email) {
  return (dispatch) => {
    firebaseAuth.sendPasswordResetEmail(email)
      .then(() => alert('Проверьте свою почту!'))
      .catch(error => alert(error));
  };
}

export function signIn(email, password) {
  return (dispatch) => {
    firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(result => dispatch(signInSuccess(result)))
      .catch(error => alert(error));
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

export function signUp(email, password) {
  return (dispatch) => {
    firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(result => dispatch(signInSuccess(result)))
      .catch(error => alert(error));
  };
}
