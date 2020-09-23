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
import { Table } from 'react-bootstrap';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as productActions from '../actions/productActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import MaterialTable from 'material-table';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.openViewDetailPage = this.openViewDetailPage.bind(this);
    this.state = {
      colName: '',
      redirect: '',
      productNames: '',
      showLoading: false,
      columns: [
        { title: 'Product Name', field: 'ProductName' },
        { title: 'Product Detail', field: 'ProductDetail' },
        { title: 'Manufacturer', field: 'Manufacturer' },
        {
          title: 'Price',
          field: 'Price',
        },
        { title: 'Quantity', field: 'Quantity' },
      ],
      data: [],
    };
  }

  // onFilterValueChanged = ev => {
  //     if (ev.target.value) {
  //         console.log("this.data is " , this.props.products);
  //         this.props.actions.onFilter(ev.target.value);
  //     }else{
  //       this.props.actions.loadProduct();
  //     }
  //   };

  deleteProduct(id) {
    if (this.props.userid === 'login' || this.props.userid === '') {
      alert('Please signin to delete');
    } else {
      this.props.actions.onDelete(this.props.userid, id);
    }
  }
  updateProduct(product) {
    // console.log('inside Product List, updateProduct, id : ', product.id);
    // ProductApi.updateProduct(product);
    if (this.props.userid === 'login' || this.props.userid === '') {
      alert('Please signin to update product');
    } else {
      this.props.actions.onUpdate(product);
    }
  }
  openViewDetailPage(productNameSelected) {
    if (this.props.userid === 'login' || this.props.userid === '') {
      alert('Please signin to View product Details');
    } else {
      this.setState({ redirect: `/product/${productNameSelected}` });
      this.setState({ productNames: productNameSelected });
    }
  }
  render() {
    const path = `/product/${this.state.productNames}/${this.props.userid}/${this.props.userName}`;

    if (this.state.redirect) {
      return <Redirect to={path} />;
    }
    // console.log("product list ProductsList: " , this.props.products);
    // const productNodes = this.props.products && this.props.products.map((product) => (
    //         <Product key={product.id} ProductName={product.ProductName} ProductDetail={product.ProductDetail}
    //         Manufacturer={product.Manufacturer} Price={product.Price} Quantity={product.Quantity} id={product.id}
    //         onDelete={this.deleteProduct} onUpdate={this.updateProduct}>
    //         </Product>
    //     ));

    return (
      <div data-test='ProductsListComponent'>
        {/* <div>
                <label style={{float:"right", marginRight: "12px"}}><FontAwesomeIcon icon={faSearch} /></label>
                    <input style={{ border: "1px solid #dee2e6", marginBottom: "12px", marginRight: "12px", float:"right"}} value={this.state.birthPlace} onBlur={this.onFilterValueChanged} />
                    <br></br>
                    
                </div> */}

        <MaterialTable
          actions={[
            {
              icon: 'launch',
              tooltip: 'View Detail',
              position: 'row',
              isLoading: this.state.showLoading,
              onClick: (event, rowData) => {
                this.openViewDetailPage(rowData.ProductName);
              },
            },
          ]}
          title='Select a row to update/delete/View Product detail'
          columns={this.state.columns}
          data={this.props.products}
          isLoading={this.state.showLoading}
          options={{
            sorting: true,
            draggable: true,
            selection: true,
            actionsColumnIndex: -1,
          }}
          editable={{
            onRowSelect: (data) => {
              //  console.log('row select : ', data);
            },
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  let updateCount = 0;
                  if (oldData) {
                    this.setState((prevState) => {
                      updateCount = updateCount + 1;
                      const data = this.props.products;
                      data[data.indexOf(oldData)] = newData;
                      //  console.log('new data:', newData);
                      if (updateCount === 1) {
                        this.updateProduct(newData);
                      }
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  let count = 0;
                  this.setState((prevState) => {
                    count = count + 1;
                    const data = this.props.products;
                    data.splice(data.indexOf(oldData), 1);
                    if (count === 1) {
                      this.deleteProduct(oldData.id);
                    }
                    return { ...prevState, data };
                  });
                }, 100);
              }),
          }}
        />
        {/* <Paper className={this.props.root}>
                    <Table striped bordered>
                        <TableHead style={{backgroundColor: "rgba(0,0,0,0.2)"}}>
                            <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Product Detail</TableCell>
                                <TableCell>Manufacturer</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>&nbsp;</TableCell>
                                <TableCell>&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productNodes}
                        </TableBody>
                    </Table>
                </Paper> */}
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
