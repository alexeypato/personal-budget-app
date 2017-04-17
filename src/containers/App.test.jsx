import React from 'react';
import sinon from 'sinon';
import { App } from './App';
import Footer from '../components/footer/Footer';
import Header from '../components/Header';

describe('App component', () => {
  let wrapper;
  const props = {
    auth: {},
  }

  beforeEach(() => {
    wrapper = shallow(<App {...props} />);
  });

  it('should render <Header /> component', () => {
    expect(wrapper.find(Header).length).toBe(0);
  });

  it('should render <Footer /> component', () => {
    expect(wrapper.find(Footer).length).toBe(1);
  });
});
