import React from 'react';
import ProductsList from './ProductsList';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { loadProduct } from '../actions/productActions';
import configureStore from '../stores/configureStore';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as productActions from '../actions/productActions';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class AllProductsPage extends React.Component {
  constructor(props) {
    super(props);
    this.isBackButtonClicked = false;
    this.state = {
      products: [],
      userID: '',
      userName: '',
      showHide: true,
      colName: null,
    };
  }
  componentDidMount() {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', this.onBackButtonEvent);
    if (
      !this.props.location.state ||
      (this.props.location.state.id === 'login' &&
        this.props.location.state.firstName === 'login')
    ) {
      this.setState({ userID: 'login' });
      this.setState({ userName: 'login' });
      this.setState({ showHide: false });
      return;
    } else {
      // console.log('logged in user id is : ' + this.props.location.state.id);
      // console.log("logged in user First NAme is : " + this.props.location.state.firstName);

      this.setState({ userID: this.props.location.state.id });
      this.setState({ userName: this.props.location.state.firstName });
    }
  }
  onClickLogout() {
    // alert("$$$$$$$$$logout clicked");
    this.props.actions.logout(this.props.location.state.id);
  }
  onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!this.isBackButtonClicked) {
      if (window.confirm('Do you want to save your changes')) {
        this.isBackButtonClicked = true;
        this.onClickLogout();
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
  render() {
    const store = configureStore();
    store.dispatch(loadProduct());
    const pathAddProduct = `/addProduct/${this.state.userID}/${this.state.userName}`;
    const pathTopView = `/topview/${this.state.userID}/${this.state.userName}`;
    const pathUserDetail = `/userDetail/${this.state.userID}/${this.state.userName}`;
    let logoutButton;
    let profileButton;
    if (this.state.showHide) {
      profileButton = (
        <Nav.Link href={pathUserDetail}>
          <Navbar.Brand>Hi, {this.state.userName}</Navbar.Brand>
        </Nav.Link>
      );
      logoutButton = (
        <Nav.Link
          id='logoutid'
          className='dropdown-item'
          onClick={this.onClickLogout.bind(this)}
          href='/login'
        >
          Logout
        </Nav.Link>
      );
    } else {
      profileButton = (
        <Nav.Link href='login'>
          <Navbar.Brand>Login</Navbar.Brand>
        </Nav.Link>
      );
      logoutButton = (
        <Nav.Link id='logoutid' className='dropdown-item' href='/'>
          Back
        </Nav.Link>
      );
    }

    return (
      <React.Fragment>
        <Provider store={store}>
          <Navbar bg='dark' variant='dark'>
            <Navbar.Brand href=''>Product Inventory</Navbar.Brand>

            {/* <Nav className='mr-auto'>
              <Nav.Link href={pathAddProduct}>Add Products</Nav.Link>
              <Nav.Link href={pathTopView}>Top View Products</Nav.Link>
            </Nav> */}
            {/* <Nav className='mr-auto'></Nav> */}

            <Navbar.Collapse
              className='justify-content-end navbar-dark navbar-nav nav-link'
              id='basic-navbar-nav'
            >
              <NavDropdown title='' id='basic-nav-dropdown'>
                <NavDropdown.Item href={pathAddProduct}>
                  Add Products
                </NavDropdown.Item>
                <NavDropdown.Item href={pathTopView}>
                  Top View Products
                </NavDropdown.Item>
                {logoutButton}
              </NavDropdown>
              {profileButton}
            </Navbar.Collapse>
          </Navbar>
          <h2 data-test='h2Component'>Products List</h2>
          <div>
            <ProductsList
              userID={this.state.userID}
              userName={this.state.userName}
            ></ProductsList>
          </div>
        </Provider>
      </React.Fragment>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    products: state.products,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsPage);
