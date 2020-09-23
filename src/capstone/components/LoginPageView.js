import React from 'react';
import { withRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import { Link, Redirect } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../actions/userActions';

class LoginPageView extends React.Component {
  constructor(props) {
    super(props);
    this.checkUserCredentials = this.checkUserCredentials.bind(this);
    this.state = {
      user: [],
      flag: '',
      redirect: '',
      loginUserId: '',
      loginUserName: '',
    };
  }
  componentDidMount() {
    // ProductApi.verifyUser(data => this.setState({user : data}));
    this.props.actions.loadUsers();
  }
  checkUserCredentials(userFromForm) {
    var flag = 0;
    let id;

    for (var i = 0; i < this.props.users.length; i++) {
      if (
        this.props.users[i].EmailID === userFromForm.EmailID &&
        this.props.users[i].Password === userFromForm.Password
      ) {
        id = this.props.users[i].id;
        this.setState({ loginUserName: this.props.users[i].FirstName });
        // console.log('logging in user id: ' + id);
        flag = 1;
        break;
      }
    }
    if (flag === 1) {
      this.props.actions.afterLogin(id);
      this.setState({ loginUserId: id });

      this.setState({ redirect: '/products' });
    } else alert('you are NOT authorized user');
  }

  render() {
    // console.log(this.state.redirect, " this.state.redirect")
    if (this.state.redirect) {
      // return <Redirect to='products' />
      return (
        <Redirect
          to={{
            pathname: '/products',
            state: {
              id: this.state.loginUserId,
              firstName: this.state.loginUserName,
            },
          }}
        />
      );
    }
    return (
      <div data-test='LoginPageViewComponent'>
        <Navbar bg='dark' variant='dark'>
          <Navbar.Brand href=''>Product Inventory</Navbar.Brand>
          <Nav className='mr-auto'>
            <Nav.Link href='/'>About</Nav.Link>
          </Nav>
        </Navbar>
        <div class='container'>
          <LoginPage onSave={this.checkUserCredentials} />
          &nbsp;&nbsp;&nbsp;
          <br></br>
          <br></br>
          <Link to='/register'>New User? Register here</Link>
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
)(withRouter(LoginPageView));
