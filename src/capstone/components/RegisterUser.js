import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import RegisterForm from './RegisterForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../actions/userActions';

class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.registered = this.registered.bind(this);
  }

  registered(userDetails) {
    // ProductApi.registerUsers(userDetails);
    this.props.actions.addUser(userDetails);
    alert('You are registered successfully. Please login.');
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        <Navbar bg='dark' variant='dark'>
          <Navbar.Brand href=''>Product Inventory</Navbar.Brand>
          <Nav className='mr-auto'>
            <Nav.Link href='/'>About</Nav.Link>
          </Nav>
        </Navbar>

        <div className='container'>
          <RegisterForm onRegister={this.registered} />
          <br></br>
          <Link to='/login'>
            <label>Already Registered? Login</label>
          </Link>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RegisterUser));
