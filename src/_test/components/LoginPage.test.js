import React from 'react';
import { mount, shallow } from 'enzyme';
import LoginPage from '../../capstone/components/LoginPage';

describe('Test LoginPage using Shallow rendering', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LoginPage />);
  });

  it('has 2 text input elements', () => {
    expect(wrapper.find('input').length).toEqual(2);
  });

  it('has a single button', () => {
    expect(wrapper.find('button').length).toEqual(1);
  });

  it('has a single h1', () => {
    expect(wrapper.find('h1').length).toEqual(1);
  });

  it('has a render h1 correctly', () => {
    expect(wrapper.find('h1').render().text()).toEqual('Login');
  });
});

describe('Test LoginPage using Full DOM rendering', () => {
  let mountWrapper;

  beforeEach(() => {
    mountWrapper = mount(<LoginPage />);
  });

  afterEach(() => {
    mountWrapper.unmount();
  });

  it('has 2 text input elements', () => {
    expect(mountWrapper.find('input').length).toEqual(2);
  });

  it('has a single button', () => {
    expect(mountWrapper.find('button').length).toEqual(1);
  });
});

describe('LoginPageSnapShot', () => {
  let wrapperFullDOM;
  beforeEach(() => {
    wrapperFullDOM = mount(<LoginPage></LoginPage>);
  });
  test('LoginPage renders correctly', () => {
    expect(wrapperFullDOM).toMatchSnapshot(); //first time takes copy of snapshot and afterwards compare with old snapshot
  });
});
