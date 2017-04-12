import { List } from 'immutable';

import {
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
  LOAD_CATEGORIES_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
} from './action-types';

import { Category } from './category';
import { categoriesReducer, CategoriesState } from './reducer';


describe('categories', () => {
  describe('categoriesReducer', () => {
    let categories1;
    let categories2;

    beforeEach(() => {
      categories1 = new Category({
        key: 1,
        moneyCategory: 10,
        nameCategory: 'test1',
        progress: 100,
      });
      categories2 = new Category({
        key: 2,
        moneyCategory: 100,
        nameCategory: 'test2',
        progress: 100,
      });
    });


    describe('CREATE_CATEGORY_SUCCESS', () => {
      it('should prepend new category to list', () => {
        let state = new CategoriesState({list: new List([categories1])});

        let nextState = categoriesReducer(state, {
          type: CREATE_CATEGORY_SUCCESS,
          payload: categories2,
        });

        expect(nextState.list.get(0)).toBe(categories1);
        expect(nextState.list.get(1)).toBe(categories2);
      });
    });


    describe('DELETE_TASK_SUCCESS', () => {
      it('should remove category from list', () => {
        let state = new CategoriesState({list: new List([categories1, categories2])});

        let nextState = categoriesReducer(state, {
          type: DELETE_CATEGORY_SUCCESS,
          payload: categories2,
        });

        expect(nextState.deleted).toBe(categories2);
        expect(nextState.list.size).toBe(1);
        expect(nextState.list.get(0)).toBe(categories1);
        expect(nextState.previous).toBe(state.list);
      });
    });

    describe('LOAD_CATEGORIES_SUCCESS', () => {
      it('should set categories list', () => {
        let state = new CategoriesState();

        let nextState = categoriesReducer(state, {
          type: LOAD_CATEGORIES_SUCCESS,
          payload: [categories1, categories2],
        });

        expect(nextState.list.size).toBe(2);
      });

      it('should order categories newest first', () => {
        let state = new CategoriesState();

        let nextState = categoriesReducer(state, {
          type: LOAD_CATEGORIES_SUCCESS,
          payload: [categories1, categories2],
        });

        expect(nextState.list.get(0)).toBe(categories2);
        expect(nextState.list.get(1)).toBe(categories1);
      });
    });


    describe('UPDATE_CATEGORY_SUCCESS', () => {
      it('should update category', () => {
        let state = new CategoriesState({list: new List([categories1, categories2])});
        let changedCategory = categories2.set('nameCategory', 'changed');

        let nextState = categoriesReducer(state, {
          type: UPDATE_CATEGORY_SUCCESS,
          payload: changedCategory,
        });

        expect(nextState.list.get(0)).toBe(categories1);
        expect(nextState.list.get(1)).toBe(changedCategory);
      });
    });
  });
});
