import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default class ProductApi {
  static getAllProducts() {
    return axios
      .get('http://localhost:3001/products')
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
  static saveProduct(product) {
    // id = id + 1;
    product.id = uuidv4();
    product.numberOfHits = 0;
    return axios
      .post('http://localhost:3001/products', product)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  static deleteProduct(id) {
    // axios.delete(`http://localhost:3001/products/${id}`).then(response =>  response.data)
    // .catch(error=>{throw error});
    axios.delete('http://localhost:3001/products/' + id);
    return axios
      .get('http://localhost:3001/products')
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  static updateProduct(product) {
    const id = product.id;
    axios
      .patch(`http://localhost:3001/products/${id}`, product)
      .then((response) => response.data)
      .catch((error) => {
        //  console.log(error);
      });

    return axios
      .get('http://localhost:3001/products')
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  static async updateTopViewHit(productName) {
    // console.log('inside updateTopViewHit : ' + productName);
    let flag = 0;
    let id;
    await axios
      .get('http://localhost:3001/products')
      .then((response) => {
        // console.log(response.data);
        //console.log(response.data.length);
        for (var i = 0; i < response.data.length; i++) {
          //  console.log('inside for loop', response.data[i].ProductName);
          // console.log(response.data[i].ProductName + '==' + productName);
          if (response.data[i].ProductName === productName) {
            flag = response.data[i].numberOfHits;
            id = response.data[i].id;
            //console.log('flag and id : ' + flag + ' ' + id);
            break;
          }
        }
      })
      .catch((error) => {
        throw error;
      });

    await axios
      .patch(`http://localhost:3001/products/${id}`, { numberOfHits: flag + 1 })
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        // console.log(error);
      });

    return this.getAllProducts();
  }

  static async getDataForChart(cb) {
    let arrayProducts = {};
    await axios
      .get('http://localhost:3001/products')
      .then((response) => {
        // console.log(response.data);
        arrayProducts = response.data;
        // console.log('inside axios : arrayProducts are ', arrayProducts);
      })
      .catch((error) => {
        throw error;
      });

    // console.log('arrayProducts : ' + arrayProducts);
    arrayProducts.sort(function (a, b) {
      return parseInt(b.numberOfHits) - parseInt(a.numberOfHits);
    });
    cb(arrayProducts);
  }

  static async loadProductDetails(id) {
    let product;
    console.log('id in prductapi: ', id);
    await axios
      .get('http://localhost:3001/products/' + id)
      .then((response) => {
        //console.log(response.data);
        product = response.data;
      })
      .catch((error) => {
        //  console.log(error);
      });

    console.log(' productapi product: ', product);
    return product;
  }
}
