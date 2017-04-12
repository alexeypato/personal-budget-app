// Make Enzyme functions available in all test files without importing
import { shallow, render, mount } from 'enzyme';
import expect from 'expect';
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.expect = expect;
// Fail tests on any warning
console.error = message => {
   throw new Error(message);
};