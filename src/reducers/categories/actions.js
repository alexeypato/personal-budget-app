import { categoryList } from './category-list';
import {
  CREATE_CATEGORY_ERROR,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_ERROR,
  DELETE_CATEGORY_SUCCESS,
  LOAD_CATEGORIES_SUCCESS,
  UNLOAD_CATEGORIES_SUCCESS,
  UPDATE_CATEGORY_ERROR,
  UPDATE_CATEGORY_SUCCESS,
} from './action-types';

export function createCategoryError(error) {
  return {
    type: CREATE_CATEGORY_ERROR,
    payload: error,
  };
}

export function createCategory(moneyCategory, nameCategory) {
  return (dispatch) => {
    categoryList.push({ moneyCategory, nameCategory })
      .catch(error => dispatch(createCategoryError(error)));
  };
}

export function createCategorySuccess(category) {
  return {
    type: CREATE_CATEGORY_SUCCESS,
    payload: category,
  };
}

export function deleteCategoryError(error) {
  return {
    type: DELETE_CATEGORY_ERROR,
    payload: error,
  };
}

export function deleteCategory(category) {
  return ((dispatch) => {
    categoryList.remove(category.key)
      .catch(error => dispatch(deleteCategoryError(error)));
  });
}

export function deleteCategorySuccess(category) {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    payload: category,
  };
}

export function updateCategoryError(error) {
  return {
    type: UPDATE_CATEGORY_ERROR,
    payload: error,
  };
}

export function updateCategory(category, changes) {
  return ((dispatch) => {
    categoryList.update(category.key, changes)
      .catch(error => dispatch(updateCategoryError(error)));
  });
}

export function updateCategorySuccess(category) {
  return {
    type: UPDATE_CATEGORY_SUCCESS,
    payload: category,
  };
}

export function loadCategoriesSuccess(categories) {
  return {
    type: LOAD_CATEGORIES_SUCCESS,
    payload: categories,
  };
}

export function loadCategories() {
  return (dispatch, getState) => {
    const { auth } = getState();
    categoryList.path = `${auth.id}/categories`;
    categoryList.subscribe(dispatch);
  };
}

export function unloadCategories() {
  categoryList.unsubscribe();
  return {
    type: UNLOAD_CATEGORIES_SUCCESS,
  };
}
