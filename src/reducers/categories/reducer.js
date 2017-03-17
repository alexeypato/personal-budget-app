import { List, Record } from 'immutable';

import {
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
  LOAD_CATEGORIES_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
} from './action-types';

import { DELETE_UNPLANNEDMONEY_SUCCESS } from '../unplannedMoney';

export const CategoriesState = new Record({
  deleted: null,
  list: new List(),
  previous: null,
});

export function categoriesReducer(state = new CategoriesState(), { payload, type }) {
  switch (type) {
    case CREATE_CATEGORY_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.deleted && state.deleted.key === payload.key ?
              state.previous :
              state.list.unshift(payload),
      });

    case DELETE_CATEGORY_SUCCESS:
      return state.merge({
        deleted: payload,
        previous: state.list,
        list: state.list.filter(category => category.key !== payload.key),
      });

    case DELETE_UNPLANNEDMONEY_SUCCESS:
      return new CategoriesState();

    case LOAD_CATEGORIES_SUCCESS:
      return state.set('list', new List(payload.reverse()));

    case UPDATE_CATEGORY_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.list.map((category) => {
          return category.key === payload.key ? payload : category;
        }),
      });

    default:
      return state;
  }
}
