import React from 'react';
import { List } from 'immutable';
import { DataTableCategories } from './DataTableCategories';
import { categories } from '../../../test/data';

function getPercents(value1, value2){
  if ((value1 && value2) < 1) {
    return 0;
  }
  return Math.round(((value1 / value2) * 100) * 100) / 100;
}

function getColorPercents(value1, value2){
  if (getPercents(value1, value2) < 20) {
    return 'progress-bar-danger';
  }
  if (getPercents(value1, value2) > 20 && getPercents(value1, value2) < 100) {
    return 'progress-bar-warning';
  }
  if (getPercents(value1, value2) > 100) {
    return 'progress-bar-success';
  }
  return '';
}

describe('DataTableCategories functions tests', () => {
   it('should return 10 for arguments 10 and 100', () => {
      expect(getPercents(10, 100)).toBe(10);
   });
   it('should return "progress-bar-warning" for arguments 55 and 100', () => {
      expect(getColorPercents(55, 100)).toBe('progress-bar-warning');
   });
});

describe('DataTableCategories component', () => {
  let wrapper;
  const props = {
    categories: new List(categories),
    showDeleteCategoryModal: () => {},
    showUpdateCategoryModal: () => {},
  }

  beforeEach(() => {
    wrapper = shallow(<DataTableCategories {...props} />);
  });

  it('Contains text - test1', () => {
    expect(wrapper.find('table').text()).toMatch(/test1/);
  });

  it('Considers quantity of lines in the table', () => {
    expect(wrapper.find('tr').length).toBe(4);
  });
});
