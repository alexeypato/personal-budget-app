import React from 'react';
import { List } from 'immutable';
import DataTableHistory from './DataTableHistory';
import { history } from '../../../test/data'

describe('DataTableHistory component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<DataTableHistory filter={'Все операции'} history={new List(history)} />);
  });

  it('Contains text - test1', () => {
    expect(wrapper.find('table').text()).toMatch(/test1/);
  });

  it('Considers quantity of lines in the table', () => {
    expect(wrapper.find('tr').length).toBe(4);
  });
});
