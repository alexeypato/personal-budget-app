import React from 'react';
import { App } from './App';
import Footer from '../components/footer/Footer';
import Header from '../components/Header';
import { SignIn } from '../components/SignIn';

describe('App component', () => {
  const propsChild = {
    resetPassword: () => {},
    signInWithGoogle: () => {},
    signInWithFacebook: () => {},
    signInWithTwitter: () => {},
  };

  const props = {
    auth: { 
      authenticated: false,
      displayName: null,
      email: null,
      id: null,
    },
    children: <SignIn {...propsChild} />,
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
