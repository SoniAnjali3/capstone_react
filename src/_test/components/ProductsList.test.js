import ProductsList from '../../capstone/components/ProductsList';
import { shallow, mount } from 'enzyme';
import { findByTestAtrr, testStore } from '../../../Utils';
import React from 'react';

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<ProductsList store={store} />)
    .childAt(0)
    .dive();
  return wrapper;
};

describe('ProductsList Component', () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {
      products: [
        {
          ProductName: 'TV',
          ProductDetail: 'Andriod TV',
          Manufacturer: 'One PLus',
          Price: '42000',
          Quantity: '3',
          id: 5,
          numberOfHits: 8,
        },
        {
          ProductName: 'refrigerator',
          ProductDetail: 'cooling',
          Manufacturer: 'Whirlpool',
          Price: '20000',
          Quantity: '10',
          id: 'c069d737-1109-4722-939c-4a0fdc423bb8',
          numberOfHits: 11,
        },
      ],
    };
    wrapper = setUp(initialState);
  });

  it('Should render without errors', () => {
    const component = findByTestAtrr(wrapper, 'ProductsListComponent');
    expect(component.length).toBe(1);
  });

  it('has 4 input elements', () => {
    expect(wrapper.find('input').length).toEqual(4);
  });
});
