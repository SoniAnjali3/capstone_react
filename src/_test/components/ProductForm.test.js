import React from 'react';
import { mount, shallow } from 'enzyme';
import ProductForm from '../../capstone/components/ProductForm';

describe('Test ProductForm using Shallow rendering', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ProductForm />);
  });

  it('has 5 text input elements', () => {
    expect(wrapper.find('input').length).toEqual(5);
  });

  it('has a single button', () => {
    expect(wrapper.find('button').length).toEqual(1);
  });

  it('has a single h1', () => {
    expect(wrapper.find('h1').length).toEqual(1);
  });

  it('has a render h1 correctly', () => {
    expect(wrapper.find('h1').render().text()).toEqual('Add Product');
  });
});

describe('Test ProductForm using Full DOM rendering', () => {
  let mountWrapper;

  beforeEach(() => {
    mountWrapper = mount(<ProductForm />);
  });

  afterEach(() => {
    mountWrapper.unmount();
  });

  it('has 5 text input elements', () => {
    expect(mountWrapper.find('input').length).toEqual(5);
  });

  it('has a single button', () => {
    expect(mountWrapper.find('button').length).toEqual(1);
  });
});

describe('ProductFormSnapShot', () => {
  let wrapperFullDOM;
  beforeEach(() => {
    wrapperFullDOM = mount(<ProductForm></ProductForm>);
  });
  test('ProductForm renders correctly', () => {
    expect(wrapperFullDOM).toMatchSnapshot(); //first time takes copy of snapshot and afterwards compare with old snapshot
  });
});
