import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Redirect } from 'react-router-dom';
import { MDBContainer } from 'mdbreact';
import ProductApi from '../data/ProductApi';
import { Navbar, Nav } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as productActions from '../actions/productActions';

class TopViewProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: '',
      result: [],
      dataPie: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              '#F7464A',
              '#46BFBD',
              '#FDB45C',
              '#949FB1',
              '#4D5360',
              '#AC64AD',
            ],
            hoverBackgroundColor: [
              '#FF5A5E',
              '#5AD3D1',
              '#FFC870',
              '#A8B3C5',
              '#616774',
              '#DA92DB',
            ],
          },
        ],
      },
    };
  }

  componentDidMount() {
    ProductApi.getDataForChart((data) =>
      this.setState({
        // result : data
        dataPie: {
          labels: [
            data[0].ProductName,
            data[1].ProductName,
            data[2].ProductName,
            data[3].ProductName,
            data[4].ProductName,
          ],
          datasets: [
            {
              data: [
                data[0].numberOfHits,
                data[1].numberOfHits,
                data[2].numberOfHits,
                data[3].numberOfHits,
                data[4].numberOfHits,
              ],
            },
          ],
        },
      })
    );
    //console.log("result", result)
    // this.props.actions.topViewProducts();
    // this.setState({
    //     // result : data
    //     dataPie: {
    //       labels: [this.props.products[0].ProductName, this.props.products[1].ProductName,this.props.products[2].ProductName, this.props.products[3].ProductName, this.props.products[4].ProductName],
    //       datasets: [
    //         {
    //           data: [this.props.products[0].numberOfHits, this.props.products[1].numberOfHits,data[2].numberOfHits, this.props.products[3].numberOfHits, this.props.products[4].numberOfHits]
    //         }
    //       ]
    //     }
    //     });
    console.log(
      'first label this.state.dataPie.labels[0]: ',
      this.state.dataPie.labels
    );
    console.log(
      'whole datasets -> data : ' + this.state.dataPie.datasets[0].data
    );
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
      <React.Fragment>
        <Navbar bg='dark' variant='dark'>
          <Navbar.Brand href='/'>Product Inventory</Navbar.Brand>
          <Navbar.Collapse className='justify-content-end navbar-dark navbar-nav nav-link'>
            <Nav.Link onClick={this.back.bind(this)} href=''>
              Back
            </Nav.Link>
          </Navbar.Collapse>
        </Navbar>
        <MDBContainer>
          <h3 className='mt-5'>Pie chart</h3>
          <Pie data={this.state.dataPie} options={{ responsive: true }} />
        </MDBContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(TopViewProducts);
