import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as productActions from '../actions/productActions';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modified: false,
      redirect: '',
    };
    this.authenticate();
  }

  authenticate() {
    let authenticated = window.confirm(
      'Are you sure you want to view the Details ? '
    );
    if (!authenticated) {
      //history.replace('/');
      this.setState({ redirect: '/products' });
    } else {
      // console.log(
      //   'Authenticated, hence proceeding ahead and displaying the details.'
      // );
    }
  }
  back = () => {
    this.setState({ redirect: '/products' });
  };
  setModified() {
    this.setState({ modified: true });
  }
  componentDidMount() {
    // ProductApi.updateTopViewHit(this.props.match.params.ProductName);
    this.props.actions.onupdateTopViewHit(this.props.match.params.ProductName);
  }
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
          <Navbar.Brand href='/'>Product Inventory</Navbar.Brand>
          <Navbar.Collapse className='justify-content-end navbar-dark navbar-nav nav-link'>
            <Nav.Link onClick={this.back.bind(this)} href=''>
              Back
            </Nav.Link>
          </Navbar.Collapse>
        </Navbar>

        <h1>Product Details</h1>
        <br></br>
        <h3>Product Name : &nbsp;{this.props.match.params.ProductName}</h3>
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
)(withRouter(ProductDetail));
// export default withRouter(ProductDetail);
