/* eslint-disable eqeqeq */
import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Navbar, Nav, Button, Form, Col, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as productActions from '../actions/productActions';
import EditProductForm from './EditProductForm';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.editProduct = this.editProduct.bind(this);
    this.state = {
      redirect: '',
      product: [],
    };
    this.isBackButtonClicked = false;
  }
  editProduct(products) {
    //console.log('inside AddProductPage : ', product);
    if (
      this.props.match.params.userID == 'login' ||
      this.props.match.params.userID == ''
    ) {
      alert('Please signin to edit product');
    } else {
      products.id = this.props.match.params.id;
      this.props.actions.onUpdate(products);
      this.setState({ redirect: '/products' });
    }
  }
  componentDidMount() {
    this.props.actions.loadProductOfID(this.props.match.params.id);
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', this.onBackButtonEvent);
  }
  onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!this.isBackButtonClicked) {
      if (window.confirm('Do you want to save your changes')) {
        this.isBackButtonClicked = true;
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
        <br></br>
        <EditProductForm
          product={this.props.products}
          onSave={this.editProduct}
        ></EditProductForm>
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
)(withRouter(EditProduct));
