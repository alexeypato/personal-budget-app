import {
  DELETE_UNPLANNEDMONEY_SUCCESS,
  LOAD_UNPLANNEDMONEY_SUCCESS,
  UPDATE_UNPLANNEDMONEY_SUCCESS,
} from './action-types';
import { firebaseDb } from '../../firebase';

export function deleteUnplannedMoneySuccess() {
  return {
    type: DELETE_UNPLANNEDMONEY_SUCCESS,
  };
}

export function deleteUnplannedMoney() {
  return ((dispatch, getState) => {
    const { auth } = getState();
    firebaseDb.ref(`${auth.id}`).remove()
      .then(dispatch(deleteUnplannedMoneySuccess()))
      .catch(error => console.log(`deleteUnplannedMoney: ${error}`));
  });
}

export function loadUnplannedMoneySuccess(unplannedMoney) {
  return {
    type: LOAD_UNPLANNEDMONEY_SUCCESS,
    payload: unplannedMoney,
  };
}

export function loadUnplannedMoney() {
  return (dispatch, getState) => {
    const { auth } = getState();
    firebaseDb.ref(`${auth.id}/unplannedMoney`).on('value',
      (snapshot) => { dispatch(loadUnplannedMoneySuccess(snapshot.val())); },
      (error) => { console.log(`loadUnplannedMoney: ${error}`); },
    );
  };
}

export function unloadUnplannedMoney() {
  return (dispatch, getState) => {
    const { auth } = getState();
    firebaseDb.ref(`${auth.id}/unplannedMoney`).off();
  };
}

export function updateUnplannedMoneySuccess(unplannedMoney) {
  return {
    type: UPDATE_UNPLANNEDMONEY_SUCCESS,
    payload: unplannedMoney,
  };
}

export function updateUnplannedMoney(unplannedMoney) {
  return ((dispatch, getState) => {
    const { auth } = getState();
    firebaseDb.ref(`${auth.id}/unplannedMoney`).once('value')
      .then((snapshot) => {
        const _value = snapshot.val() + unplannedMoney;
        firebaseDb.ref(`${auth.id}/unplannedMoney`).set(_value)
          .then(dispatch(updateUnplannedMoneySuccess(_value)))
          .catch(error => console.log(`updateUnplannedMoney: ${error}`));
      })
      .catch(error => console.log(`updateUnplannedMoney: ${error}`));
  });
}
