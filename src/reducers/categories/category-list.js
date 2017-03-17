import { FirebaseList } from '../../firebase';
import * as categoryActions from './actions';
import { Category } from './category';

export const categoryList = new FirebaseList({
  onAdd: categoryActions.createCategorySuccess,
  onChange: categoryActions.updateCategorySuccess,
  onLoad: categoryActions.loadCategoriesSuccess,
  onRemove: categoryActions.deleteCategorySuccess,
}, Category);
