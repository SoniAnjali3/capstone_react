import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import '../../App.css';
import NavbarPage from './NavbarPage';
//import { Dimensions } from 'react-native';
class Links extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: '',
    };
  }
  allProductPage = () => {
    this.setState({ redirect: '/products' });
  };
  render() {
    if (this.state.redirect) {
      // return <Redirect to='products' />
      return (
        <Redirect
          to={{
            pathname: '/products',
            state: { id: 'login', firstName: 'login' },
          }}
        />
      );
    }
    //if about navigation link is clicked then component corresponding to "/about" will be rendered.
    return (
      // <NavbarPage />
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='/'>Product Inventory</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link href='/'>About</Nav.Link>
          <Nav.Link onClick={this.allProductPage.bind(this)} href=''>
            View Products List
          </Nav.Link>
        </Nav>
        <Navbar.Collapse className='justify-content-end navbar-dark navbar-nav nav-link'>
          <Nav.Link href='login'>Hello, Sign in</Nav.Link>
          <Nav.Link href=''>/</Nav.Link>
          <Nav.Link href='register'>Sign up</Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default class AboutPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Links />
        <Carousel>
          <Carousel.Item>
            <img
              className='w-100'
              src={require('../img/0.jpg')}
              alt='First slide'
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='w-80'
              src={require('../img/productlaunch.jpg')}
              alt='Third slide'
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='w-80'
              src={require('../img/GST-electronic-products.jpg')}
              alt='Second slide'
            />
          </Carousel.Item>
        </Carousel>
      </React.Fragment>
    );
  }
}
