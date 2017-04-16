import React from 'react';
import Dropdown from 'react-dropdown';
import DropdownCategory from './DropdownCategory';
import { categories } from '../../../test/data';

describe('DropdownCategory component', () => {
  const props = {
    disabled: false,
    options: categories,
  }

  it('should render <Dropdown /> component', () => {
    const wrapper = shallow(<DropdownCategory {...props} />);
    expect(wrapper.find(Dropdown).length).toBe(1);
  });
});
