import React from 'react';
import Footer from './Footer';

describe('Footer component', () => {
  it('Contains copyright information', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('.container').text()).toMatch(/Aliaksei Patotski/);
  });
});
