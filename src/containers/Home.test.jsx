import React from 'react';
import { List } from 'immutable';
import { Home } from './Home';
import MainForm from '../components/MainForm';

import { categories, history } from '../../test/data';

describe('Home component', () => {
  const props = {
    categories: new List(categories),
    loadCategories: () => {},
    loadHistory: () => {},
    loadUnplannedMoney: () => {},
    history: new List(history),
    unloadCategories: () => {},
    unloadHistory: () => {},
    unloadUnplannedMoney: () => {},
    unplannedMoney: 0,
  };

  it('should render <MainForm /> component', () => {
    const wrapper = shallow(<Home {...props} />);
    expect(wrapper.find(MainForm).length).toBe(1);
  });
});
