/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../../App.css';
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  state = {
    rowsChanges: {},
    product: {},
  };

  handleSave(id) {
    // var product = {};

    console.log(this.state.rowsChanges[id]);
    console.log(' : id : ' + id);
    console.log('rowchanges : ', this.state.rowsChanges);
    console.log('updated product : ', this.state.product);
    // console.log("Save row changes into db..." , product);
    // product.ProductDetail = this.refs.ProductDetail.value;
    // product.Manufacturer = this.refs.Manufacturer.value;
    this.props.onUpdate(this.state.product);
    //clear row changes...
    this.setState((prevState) => ({
      rowsChanges: {
        ...prevState.rowsChanges,
        [id]: {},
      },
    }));
  }

  handleTextFieldChange(id, change) {
    // id.preventDefault()
    console.log('inside handleTextFieldChange id :' + id);
    console.log(
      'inside handleTextFieldChange change value: ' +
        change.fieldName +
        ' ' +
        change.fieldValue +
        ' ' +
        change.row
    );
    this.setState((prevState) => ({
      rowsChanges: {
        ...prevState.rowsChanges,
        [id]: {
          ...prevState.rowsChanges[id],
          [change.fieldName]: change.fieldValue,
        },
      },
    }));
    this.setState((prevState) => ({
      product: {
        ...prevState.product,
        id: id,
        [change.row]: change.fieldValue,

        // [id]: {...prevState.product[id], [change.row]: change.fieldValue}
      },
    }));
  }

  onDelete(event) {
    event.preventDefault();
    console.log('***** ' + this.props.ProductDetail);
    console.log('***** ' + this.props.Manufacturer);
    console.log('***** ' + this.props.id);
    this.props.onDelete(this.props.id);
  }
  render() {
    const path = `/product/${this.props.ProductName}`;
    return (
      <TableRow>
        {/* <td><Link to={path}>{this.props.ProductName}</Link></td>
                <td>{this.props.ProductDetail}</td>
                <td>{this.props.Manufacturer}</td>
                <td>{this.props.Price}</td>
                <td>{this.props.Quantity}</td> 
                <td><a href="about:blank" onClick={this.onDelete}>Delete</a></td>    */}
        <Link to={path}>
          <TableCell style={{ paddingTop: '33px' }}>
            {this.props.ProductName}
          </TableCell>
        </Link>
        <EditableTableCell
          row='ProductDetail'
          fieldName={this.props.ProductDetail}
          onCellValueChange={this.handleTextFieldChange.bind(
            this,
            this.props.id
          )}
        />
        <EditableTableCell
          row='Manufacturer'
          fieldName={this.props.Manufacturer}
          onCellValueChange={this.handleTextFieldChange.bind(
            this,
            this.props.id
          )}
        />
        <EditableTableCell
          row='Price'
          fieldName={this.props.Price}
          onCellValueChange={this.handleTextFieldChange.bind(
            this,
            this.props.id
          )}
        />
        <EditableTableCell
          row='Quantity'
          fieldName={this.props.Quantity}
          onCellValueChange={this.handleTextFieldChange.bind(
            this,
            this.props.id
          )}
        />
        <TableCell component='th' scope='row'>
          <Button
            onClick={this.onDelete.bind(this)}
            variant='outlined'
            className={this.props.button}
          >
            Delete
          </Button>
          {/* <a href="about:blank" onClick={this.onDelete}>Delete</a> */}
        </TableCell>
        <TableCell component='th' scope='row'>
          <Button
            onClick={this.handleSave.bind(this, this.props.id)}
            variant='outlined'
            color='primary'
            className={this.props.button}
          >
            Save
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}
const EditableTableCell = ({ row, fieldName, onCellValueChange }) => {
  const handleTextFieldChange = (e) => {
    onCellValueChange({
      fieldValue: e.target.value,
      fieldName: fieldName,
      row: row,
    });
    console.log('ref : ' + row);
  };

  return (
    <TableCell>
      <TextField
        onChange={handleTextFieldChange}
        defaultValue={fieldName}
        margin='normal'
      />
    </TableCell>
  );
};

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});
export default withStyles(styles)(Product);
