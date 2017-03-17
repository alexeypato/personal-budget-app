import { categoryList } from './category-list';
import {
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
  LOAD_CATEGORIES_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
} from './action-types';

export function createCategory(moneyCategory, nameCategory) {
  return () => {
    categoryList.push({ moneyCategory, nameCategory })
      .catch(error => console.log(`createCategory: ${error}`));
  };
}

export function createCategorySuccess(category) {
  return {
    type: CREATE_CATEGORY_SUCCESS,
    payload: category,
  };
}

export function deleteCategory(category) {
  return () => {
    categoryList.remove(category.key)
      .catch(error => console.log(`deleteCategory: ${error}`));
  };
}

export function deleteCategorySuccess(category) {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    payload: category,
  };
}

export function updateCategory(category, changes) {
  return () => {
    categoryList.update(category.key, changes)
      .catch(error => console.log(`updateCategory: ${error}`));
  };
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
  return () => {
    categoryList.unsubscribe();
  };
}
