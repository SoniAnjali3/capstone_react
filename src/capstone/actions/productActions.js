import * as types from './ActionTypes';
import ProductApi from '../data/ProductApi';
import UserApi from '../data/UserApi';

export function loadProductSuccess(products) {
  //console.log('product in loadProductSuccess', products);
  return { type: types.LOAD_PRODUCT_SUCCESS, products };
}

export function addProductSuccess(product) {
  return { type: types.ADD_PRODUCT_SUCCESS, product };
}

export function loadOnFilterProductSuccess(productNameEntered) {
  return { type: types.LOAD_ON_FILTER_PRODUCT_SUCCESS, productNameEntered };
}

export function deteleProductSuccess(product) {
  return { type: types.DELETE_PRODUCT_SUCCESS, product };
}

export function updateProductSuccess(updatedProduct) {
  alert('product updated');
  return { type: types.UPDATE_PRODUCT_SUCCESS, updatedProduct };
}
export function updateTopViewHitSuccess(updatedProduct) {
  return { type: types.UPDATE_TOPVIEWHITS_SUCCESS, updatedProduct };
}

export function topViewProductsSuccess(product) {
  return { type: types.TOPVIEW_PRODUCT_SUCCESS, product };
}

export function logoutSuccess(id) {
  return { type: types.CHECK_LOGIN_FLAG, id };
}
export function loadProductFromID(product) {
  return { type: types.LOAD_PRODUCT_FROM_ID_SUCCESS, product };
}
export function loadProduct() {
  return function (dispatch) {
    //this called thunk function which is actually funct of dispatch, asyn fnct
    return ProductApi.getAllProducts()
      .then((products) => {
        // console.log(products, ' : inside loadProduct products');
        dispatch(loadProductSuccess(products));
        // console.log('loadProductSuccess done****');
      })
      .catch((error) => {
        throw error;
      });
  };
}
export function loadProductOfID(id) {
  return function (dispatch) {
    //this called thunk function which is actually funct of dispatch, asyn fnct
    return ProductApi.loadProductDetails(id)
      .then((products) => {
        // console.log(products, ' : inside loadProduct products');
        dispatch(loadProductFromID(products));
        // console.log('loadProductSuccess done****');
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function onFilter(productName) {
  return function (dispatch, getState) {
    //dispatch(loadOnFilterProductSuccess(products.filter(row => row.ProductName == (productName))))
    return ProductApi.getAllProducts()
      .then((products) => {
        //  console.log(productName, ' : inside onFilter products');
        dispatch(loadOnFilterProductSuccess(productName));
        //  console.log('onFilter done****');
      })
      .catch((error) => {
        throw error;
      });
  };
}
export function addProduct(userid, product) {
  return function (dispatch) {
    return UserApi.checkLoginFlag(userid)
      .then((loginFlag) => {
        // console.log(' onDelete loginFlag inside productAction : ', loginFlag);
        if (loginFlag === 1) {
          return ProductApi.saveProduct(product)
            .then((product) => {
              //   console.log('inside prouctActionAddproduct : ', product);
              dispatch(addProductSuccess(product));
            })
            .catch((error) => {
              throw error;
            });
        } else alert('Please signin to Add Product');
      })
      .catch((error) => {
        throw error;
      });
  };

  // return function (dispatch, getState) {
  //   return ProductApi.saveProduct(product).then(product => {
  //     console.log("inside prouctActionAddproduct : " , product)
  //     dispatch(addProductSuccess(product));
  //   }).catch(error => {
  //     throw(error);
  //   });
  // };
}

export function onDelete(userid, id) {
  return function (dispatch) {
    return UserApi.checkLoginFlag(userid)
      .then((loginFlag) => {
        // console.log(' onDelete loginFlag inside productAction : ', loginFlag);
        if (loginFlag === 1) {
          return ProductApi.deleteProduct(id)
            .then((product) => {
              //   console.log('inside onDelete : ', product);
              dispatch(deteleProductSuccess(product));
            })
            .catch((error) => {
              throw error;
            });
        } else alert('Please signin for delete');
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function onUpdate(product) {
  return function (dispatch, getState) {
    return ProductApi.updateProduct(product)
      .then((product) => {
        dispatch(updateProductSuccess(product));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function onupdateTopViewHit(productName) {
  return function (dispatch, getState) {
    return ProductApi.updateTopViewHit(productName)
      .then((product) => {
        // console.log('inside onupdateTopViewHit : ', productName);
        dispatch(updateTopViewHitSuccess(productName));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function topViewProducts() {
  return function (dispatch, getState) {
    return ProductApi.getDataForChart()
      .then((product) => {
        //  console.log('inside onupdateTopViewHit : ', product);
        dispatch(topViewProductsSuccess(product));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function logout(userid) {
  return function (dispatch, getState) {
    return UserApi.logoutFlag(userid)
      .then((id) => {
        console.log('productAction logoutSuccess : ', id);
        dispatch(logoutSuccess(id));
      })
      .catch((error) => {
        throw error;
      });
  };
}
