import * as types from '../../capstone/actions/ActionTypes';
import productReducer from '../../capstone/reducers/productReducer';

describe('products Reducer', () => {
  it('should retrun default state', () => {
    const newState = productReducer(undefined, {});
    expect(newState).toEqual([]);
  });

  it('should retrun new State if receiving type', () => {
    const productsTest = [
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
    ];
    const newState = productReducer(undefined, {
      type: types.LOAD_PRODUCT_SUCCESS,
      products: productsTest,
    });
    expect(newState).toEqual(productsTest);
  });
});
