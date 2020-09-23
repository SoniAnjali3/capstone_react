/* eslint-disable no-unused-vars */
import React from 'react';
import { Redirect } from 'react-router-dom';
import Product from './Product';
//import Table from "@material-ui/core/Table";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  Card,
  Button,
  Row,
  Col,
  Container,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as productActions from '../actions/productActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PageItem from 'react-bootstrap/PageItem';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import Pagination from 'react-js-pagination';
import {
  faTrashAlt,
  faStepBackward,
  faFastBackward,
  faStepForward,
  faFastForward,
  faEdit,
  faFolderOpen,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    // this.deleteProduct = this.deleteProduct.bind(this);
    //this.updateProduct = this.updateProduct.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      colName: '',
      redirect: '',
      productNames: '',
      currentPage: 1,
      usersPerPage: 6,
      nameToSearch: '',
      greaterthan: false,
      lessthan: false,
      between: false,
    };
  }
  search(event) {
    console.log('this.refs.sortText.value: ', this.refs.sortText.value);
    this.setState({ nameToSearch: this.refs.sortText.value });
  }
  handleCheckBox = (e) => {
    console.log('checkbox checked: ', e.target.value);
    this.setState((prevState) => ({ greaterthan: !prevState.greaterthan }));
    //this.setState((prevState) => ({ lessthan: !prevState.lessthan }));
  };
  handleCheckBoxlessthan = (e) => {
    this.setState((prevState) => ({ lessthan: !prevState.lessthan }));
  };
  handleCheckBoxbtw = (e) => {
    this.setState((prevState) => ({ between: !prevState.between }));
  };
  deleteProduct(id) {
    if (this.props.userid === 'login' || this.props.userid === '') {
      alert('Please signin to delete');
    } else {
      let authenticated = window.confirm(
        'Are you sure you want to delete this product ? '
      );
      if (!authenticated) {
      } else {
        console.log('dlete clicked : ', id);
        this.props.actions.onDelete(this.props.userid, id);
      }
    }
  }
  updateProduct(product) {
    // console.log('inside Product List, updateProduct, id : ', product.id);
    // ProductApi.updateProduct(product);
    if (this.props.userid === 'login' || this.props.userid === '') {
      alert('Please signin to update product');
    } else {
      this.setState({
        // redirect: `/editProduct/${product.ProductName}/${product.ProductDetail}/${product.Manufacturer}/${product.Price}/${product.Quantity}/${product.id}/${this.props.userid}/${this.props.userName}`,
        redirect: `/editProduct/${product.id}/${this.props.userid}/${this.props.userName}`,
      });

      // this.props.actions.onUpdate(product);
    }
  }
  openViewDetailPage(productNameSelected) {
    if (this.props.userid === 'login' || this.props.userid === '') {
      alert('Please signin to View product Details');
    } else {
      this.setState({
        redirect: `/product/${productNameSelected}/${this.props.userid}/${this.props.userName}`,
      });
      this.setState({ productNames: productNameSelected });
    }
  }

  changePage = (event) => {
    this.setState({
      [event.target.name]: parseInt(event.target.value),
    });
  };

  firstPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: 1,
      });
    }
  };

  prevPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
    }
  };

  lastPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.props.products.length / this.state.usersPerPage)
    ) {
      this.setState({
        currentPage: Math.ceil(
          this.props.products.length / this.state.usersPerPage
        ),
      });
    }
  };

  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.props.products.length / this.state.usersPerPage)
    ) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    let users;
    let currentUsers;
    let productNodes;

    if (this.state.nameToSearch === '') {
      users = this.props.products;
      if (this.state.greaterthan) {
        users = this.props.products.filter((x) => x.Price >= 1000);
        console.log(users);
      }
      if (this.state.lessthan) {
        users = this.props.products.filter((x) => x.Price < 500);
        console.log(users);
      }
      if (this.state.between) {
        users = this.props.products.filter(
          (x) => x.Price >= 500 && x.Price < 1000
        );
        console.log(users);
      }
    } else {
      for (var i = 0; i < this.props.products.length; i++) {
        if (this.props.products[i].ProductName === this.state.nameToSearch) {
          users = this.props.products[i];
          console.log('inside if : users : ', users);
          break;
        }
      }
    }
    //const users = this.props.products;
    const { currentPage, usersPerPage } = this.state;
    const lastIndex = currentPage * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;
    if (this.state.nameToSearch === '') {
      currentUsers = users.slice(firstIndex, lastIndex);
      productNodes =
        this.props.products &&
        currentUsers.map((product) => (
          <Col xs={12} lg={4} key={product.id}>
            <Card className='text-center'>
              <Card.Header style={{ fontWeight: '600', fontSize: '20px' }}>
                {product.ProductName}
              </Card.Header>
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>Price: {product.Price}</Card.Text>
                <span
                  title='View Details'
                  onClick={this.openViewDetailPage.bind(
                    this,
                    product.ProductName
                  )}
                >
                  <FontAwesomeIcon icon={faFolderOpen} />
                </span>
                &nbsp;
                <span
                  title='Edit'
                  onClick={this.updateProduct.bind(this, product)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </span>
                &nbsp;
                <span
                  title='Delete'
                  onClick={this.deleteProduct.bind(this, product.id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </span>
                &nbsp;
              </Card.Body>
              <Card.Footer className='text-muted'></Card.Footer>
            </Card>
            <br></br>
          </Col>
        ));
    } else {
      currentUsers = users;
      productNodes = (
        <Col xs={4} lg={4}>
          <Card className='text-center'>
            <Card.Header style={{ fontWeight: '600', fontSize: '20px' }}>
              {currentUsers.ProductName}
            </Card.Header>
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text>Price: {currentUsers.Price}</Card.Text>
              <span
                title='View Details'
                onClick={this.openViewDetailPage.bind(
                  this,
                  currentUsers.ProductName
                )}
              >
                <FontAwesomeIcon icon={faFolderOpen} />
              </span>
              &nbsp;
              <span
                title='Edit'
                onClick={this.updateProduct.bind(this, currentUsers)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </span>
              &nbsp;
              <span
                title='Delete'
                onClick={this.deleteProduct.bind(this, currentUsers.id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </span>
              &nbsp;
            </Card.Body>
            <Card.Footer className='text-muted'></Card.Footer>
          </Card>
          <br></br>
        </Col>
      );
    }

    const totalPages = users.length / usersPerPage;

    const pageNumCss = {
      width: '45px',
      border: '1px solid #17A2B8',
      color: '#17A2B8',
      textAlign: 'center',
      fontWeight: 'bold',
    };

    return (
      <div data-test='ProductsListComponent'>
        <Row>
          <Col sm={2} lg={2}>
            <br />

            <div>
              <input placeholder='Search' ref='sortText'></input>
              <span onClick={this.search}>
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
            <br />
            <div>
              <Card>
                <Card.Header>Sort By Price</Card.Header>
                <Card.Title>select</Card.Title>
                <Card.Body>
                  <Row>
                    <Col xs={2} lg={2}>
                      <input
                        type='checkbox'
                        value='greaterthan'
                        id='priceGreater'
                        onChange={this.handleCheckBox}
                        defaultChecked={this.state.greaterthan}
                      />
                    </Col>
                    <Col xs={10} lg={10}>
                      <label for='priceGreater' id='sortlabel'>
                        &gt; 1000
                      </label>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={2} lg={2}>
                      <input
                        type='checkbox'
                        value='lessthan'
                        id='lessThan'
                        onChange={this.handleCheckBoxlessthan}
                        defaultChecked={this.state.lessthan}
                      ></input>
                    </Col>
                    <Col xs={10} lg={10}>
                      <label for='lessThan' id='sortlabel'>
                        {' '}
                        &lt; 500
                      </label>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={2} lg={2}>
                      <input
                        type='checkbox'
                        value='between'
                        id='between'
                        onChange={this.handleCheckBoxbtw}
                        defaultChecked={this.state.between}
                      ></input>
                    </Col>
                    <Col xs={10} lg={10}>
                      <label for='between' id='sortlabel'>
                        {' '}
                        &#8805; 500 &lt; 1000
                      </label>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col sm={10} lg={10}>
            <div>
              <Container>
                <Row>{productNodes}</Row>
              </Container>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div style={{ float: 'right' }}>
              <InputGroup size='sm'>
                <InputGroup.Prepend>
                  <Button
                    type='button'
                    variant='outline-info'
                    disabled={currentPage === 1 ? true : false}
                    onClick={this.firstPage}
                  >
                    <FontAwesomeIcon icon={faFastBackward} /> First
                  </Button>
                  <Button
                    type='button'
                    variant='outline-info'
                    disabled={currentPage === 1 ? true : false}
                    onClick={this.prevPage}
                  >
                    <FontAwesomeIcon icon={faStepBackward} /> Prev
                  </Button>
                  <FormControl
                    style={pageNumCss}
                    name='currentPage'
                    value={currentPage}
                    onChange={this.changePage}
                  />
                  <Button
                    type='button'
                    variant='outline-info'
                    disabled={currentPage === totalPages ? true : false}
                    onClick={this.nextPage}
                  >
                    <FontAwesomeIcon icon={faStepForward} /> Next
                  </Button>
                  <Button
                    type='button'
                    variant='outline-info'
                    disabled={currentPage === totalPages ? true : false}
                    onClick={this.lastPage}
                  >
                    <FontAwesomeIcon icon={faFastForward} /> Last
                  </Button>
                </InputGroup.Prepend>
              </InputGroup>
            </div>

            <br />
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    products: state.products,
    userid: ownProps.userID,
    userName: ownProps.userName,
  };
}

//Redux gives store.dispatch referrence here
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
