import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar,
  Nav,
  Container,
  Card,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../actions/userActions';
import { Label } from 'reactstrap';

class UserDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    // this.checkUserCredentials = this.checkUserCredentials.bind(this);
    this.state = {
      redirect: '',
    };
  }
  componentDidMount() {
    // ProductApi.verifyUser(data => this.setState({user : data}));
    this.props.actions.getUserProfile(this.props.match.params.userID);
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
        <Container>
          <Card className='text-center'>
            <Card.Header style={{ fontWeight: '900', fontSize: '20px' }}>
              {' '}
              Hi, {this.props.match.params.userName}
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <img src={require('../img/user.png')} alt='user' />
                </Col>
                <Col xs={6}>
                  <Card.Title className='text-left'>
                    Please find your detail below:
                  </Card.Title>
                  <Card.Text className='text-left'>
                    <Label>EmailID:</Label>{' '}
                    <Label>{this.props.users.EmailID}</Label>
                    <br></br>
                    <Label>FirstName:</Label>{' '}
                    <Label>{this.props.users.FirstName}</Label>
                    <br></br>
                    <Label>LastName:</Label>{' '}
                    <Label>{this.props.users.LastName}</Label>
                    <br></br>
                    <Label>Location:</Label>{' '}
                    <Label>{this.props.users.Location}</Label>
                    <br />
                    <Label>MobileNumber:</Label>{' '}
                    <Label>{this.props.users.MobileNumber}</Label>
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className='text-muted'>User Profile</Card.Footer>
          </Card>
        </Container>
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
)(withRouter(UserDetailsPage));
