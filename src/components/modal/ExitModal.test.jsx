import React from 'react';
import { Modal } from 'react-bootstrap';
import { ExitModal } from './ExitModal';
import sinon from 'sinon';

describe('ExitModal component', () => {
  let wrapper;
  const close = sinon.spy();
  const props = {
    closeModal: close,
    showModal: true,
    signOut: () => {},
  }

  beforeEach(() => {
    wrapper = shallow(<ExitModal {...props} />);
  });

  it('should render <Modal /> component', () => {
    expect(wrapper.find(Modal).length).toBe(1);
  });

  it('simulates click events', () => {
    wrapper.find('button.btn-default').simulate('click');
    expect(close.calledOnce).toBe(true);
  });
});
