import React, { Component } from 'react';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBContainer,
} from 'mdbreact';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class NavbarPage extends Component {
  state = {
    collapseID: '',
  };

  toggleCollapse = (collapseID) => () => {
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : '',
    }));
  };

  render() {
    return (
      <Router>
        <MDBNavbar className='navbar navbar-dark bg-dark'>
          <MDBContainer>
            <MDBNavbarBrand>MDBNavbar</MDBNavbarBrand>
            <MDBNavbarToggler
              tag='button'
              className='aqua-gradient'
              onClick={this.toggleCollapse('navbarCollapse13')}
            >
              <span className='white-text'>
                <FontAwesomeIcon title='View Details' icon={faBars} />
              </span>
            </MDBNavbarToggler>
            <MDBCollapse
              id='navbarCollapse13'
              isOpen={this.state.collapseID}
              navbar
            >
              <MDBNavbarNav left>
                <MDBNavItem>
                  <MDBNavLink to='/'>About</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to='/login'>Hello, Sign in</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to='/register'>Sign up</MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      </Router>
    );
  }
}

export default NavbarPage;
