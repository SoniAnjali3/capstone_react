import * as types from '../actions/ActionTypes';
import initialState from './initialState';

export default function productReducer(state = initialState.products, action) {
  switch (action.type) {
    case types.LOAD_PRODUCT_SUCCESS:
      // console.log(
      //   'inside productReducer LOAD_PRODUCT_SUCCESS: ' + action.products
      // );
      return action.products;

    case types.ADD_PRODUCT_SUCCESS:
      return [...state, Object.assign({}, action.products)];
    case types.LOAD_ON_FILTER_PRODUCT_SUCCESS:
      let newStateFilter = state.filter(
        (products) => products.ProductName === action.productNameEntered
      );
      // console.log(
      //   'inside productReducer LOAD_ON_FILTER_PRODUCT_SUCCESS : ',
      //   newStateFilter
      // );
      return newStateFilter;

    case types.DELETE_PRODUCT_SUCCESS:
      // let newState = state.filter(products => products.id != action.id); // ES6 arrow fns
      // console.log("inside productReducer DELETE_PRODUCT_SUCCESS : " , newState);
      return action.product;

    case types.UPDATE_PRODUCT_SUCCESS:
      return action.updatedProduct;

    case types.UPDATE_TOPVIEWHITS_SUCCESS:
      return action.updatedProduct;

    case types.TOPVIEW_PRODUCT_SUCCESS:
      return action.product;

    case types.LOAD_PRODUCT_FROM_ID_SUCCESS:
      return action.product;
    default:
      return state;
  }
}
