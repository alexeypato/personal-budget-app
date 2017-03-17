export function getCategories(state) {
  return state.categories;
}

export function getCategoryList(state) {
  return getCategories(state).list;
}
