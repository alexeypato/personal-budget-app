import React from 'react';
import renderer from 'react-test-renderer';
import { App } from './App';
import Footer from '../components/footer/Footer';
import Header from '../components/Header';

describe('App component', () => {
  const props = {
    auth: { 
      authenticated: false,
      displayName: null,
      email: null,
      id: null,
    },
  };

  it('should render <Header /> component', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find(Header).length).toBe(0);
  });

  it('should render <Footer /> component', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find(Footer).length).toBe(1);
  });

  it('calls componentWillReceiveProps', () => {
    const spy = jest.spyOn(App.prototype, 'componentWillReceiveProps');
    const wrapper = mount(<App {...props} />);
    wrapper.instance().componentWillReceiveProps(props);
    expect(spy).toHaveBeenCalled();
  });
});
