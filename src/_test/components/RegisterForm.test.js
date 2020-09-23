import React from 'react';
import { mount, shallow } from 'enzyme';
import RegisterForm from '../../capstone/components/RegisterForm';

describe('Test RegisterForm using Shallow rendering', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<RegisterForm />);
  });

  it('has 6 text input elements', () => {
    expect(wrapper.find('input').length).toEqual(6);
  });

  it('has a single button', () => {
    expect(wrapper.find('button').length).toEqual(1);
  });

  it('has a single h1', () => {
    expect(wrapper.find('h1').length).toEqual(1);
  });

  it('has a render h1 correctly', () => {
    expect(wrapper.find('h1').render().text()).toEqual('Register User');
  });
});

describe('Test RegisterForm using Full DOM rendering', () => {
  let mountWrapper;

  beforeEach(() => {
    mountWrapper = mount(<RegisterForm />);
  });

  afterEach(() => {
    mountWrapper.unmount();
  });

  it('has 6 text input elements', () => {
    expect(mountWrapper.find('input').length).toEqual(6);
  });

  it('has a single button', () => {
    expect(mountWrapper.find('button').length).toEqual(1);
  });
});

describe('RegisterFormSnapShot', () => {
  let wrapperFullDOM;
  beforeEach(() => {
    wrapperFullDOM = mount(<RegisterForm></RegisterForm>);
  });
  test('RegisterForm renders correctly', () => {
    expect(wrapperFullDOM).toMatchSnapshot(); //first time takes copy of snapshot and afterwards compare with old snapshot
  });
});
