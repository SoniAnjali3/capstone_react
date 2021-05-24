/* eslint-disable eqeqeq */
import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import ProductForm from './ProductForm';
import { Navbar, Nav } from 'react-bootstrap';
import toastr from 'toastr';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as productActions from '../actions/productActions';

class AddProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.saveProduct = this.saveProduct.bind(this);
    this.state = {
      redirect: '',
    };
    this.isBackButtonClicked = false;
  }

  // saveProduct(product) {
  //     ProductApi.saveProduct(product);
  //     alert('products added successfully');
  //     this.props.history.push('/products');
  // }
  componentDidMount() {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', this.onBackButtonEvent);
  }
  onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!this.isBackButtonClicked) {
      if (window.confirm('Do you want to save your changes')) {
        this.isBackButtonClicked = true;
        this.setState({ redirect: '/products' });
        // your custom logic to page transition,like react-router-dom history.push()
      } else {
        window.history.pushState(null, null, window.location.pathname);
        this.isBackButtonClicked = false;
      }
    }
  };
  componentWillUnmount = () => {
    window.removeEventListener('popstate', this.onBackButtonEvent);
  };
  saveProduct(product) {
    //console.log('inside AddProductPage : ', product);
    if (
      this.props.match.params.userID == 'login' ||
      this.props.match.params.userID == ''
    ) {
      alert('Please signin to add product');
    } else {
      this.props.actions
        .addProduct(this.props.match.params.userID, product)
        .then(() => toastr.success('Product added'))
        .catch((error) => {
          alert(error);
        });
    }
  }
  back = () => {
    this.setState({ redirect: '/products' });
  };
  render() {
    if (this.state.redirect) {
      // return <Redirect to='products' />
      return (
        <Redirect
          to={{
            pathname: '/products',
            state: {
              id: this.props.match.params.userID,
              firstName: this.props.match.params.userName,
            },
          }}
        />
      );
    }
    return (
      <div>
        <Navbar bg='dark' variant='dark'>
          <Navbar.Brand href=''>Product Inventory</Navbar.Brand>
          <Navbar.Collapse className='justify-content-end navbar-dark navbar-nav nav-link'>
            <Nav.Link onClick={this.back.bind(this)} href=''>
              Back
            </Nav.Link>
          </Navbar.Collapse>
        </Navbar>
        <ProductForm onSave={this.saveProduct} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddProductPage));
