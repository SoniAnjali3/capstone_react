import React from 'react';
import { withFormik, Field, Form } from 'formik';
import * as Yup from 'yup';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

const ProductForm = ({ errors, touched, isSubmitting }) => (
  <div>
    <h1>Add Product</h1>
    <Form>
      <div className='form-group'>
        <Field
          type='text'
          id='productName'
          name='ProductName'
          placeholder='ProductName'
          className='form-control'
        />
        {touched.ProductName && errors.ProductName && (
          <div style={{ color: 'red' }}>{errors.ProductName}</div>
        )}
      </div>
      <div className='form-group'>
        <Field
          type='text'
          id='productDetail'
          name='ProductDetail'
          placeholder='ProductDetail'
          className='form-control'
        />
        {touched.ProductDetail && errors.ProductDetail && (
          <div style={{ color: 'red' }}>{errors.ProductDetail}</div>
        )}
      </div>
      <div className='form-group'>
        <Field
          type='text'
          name='Manufacturer'
          placeholder='Manufacturer'
          className='form-control'
        />
        {touched.Manufacturer && errors.Manufacturer && (
          <div style={{ color: 'red' }}>{errors.Manufacturer}</div>
        )}
      </div>
      <div className='form-group'>
        <Field
          type='text'
          name='Price'
          placeholder='Price'
          className='form-control'
        />
        {touched.Price && errors.Price && (
          <div style={{ color: 'red' }}>{errors.Price}</div>
        )}
      </div>
      <div className='form-group'>
        <Field
          type='text'
          name='Quantity'
          placeholder='Quantity'
          className='form-control'
        />
        {touched.Quantity && errors.Quantity && (
          <div style={{ color: 'red' }}>{errors.Quantity}</div>
        )}
      </div>
      <br></br>
      <button type='submit' disabled={isSubmitting} className='btn btn-primary'>
        Submit
      </button>
    </Form>
  </div>
);

const FormikProductForm = withFormik({
  mapPropsToValues({
    ProductName,
    ProductDetail,
    Manufacturer,
    Price,
    Quantity,
  }) {
    //initial value passed from App.js will be set in these parameters
    return {
      ProductName: ProductName || '',
      ProductDetail: ProductDetail || '',
      Manufacturer: Manufacturer || '',
      Price: Price || '',
      Quantity: Quantity || '',
    };
  },
  validationSchema: Yup.object().shape({
    ProductName: Yup.string().required('ProductName is required'),
    ProductDetail: Yup.string().required('ProductDetail is required'),
    Manufacturer: Yup.string().required('Please neter Manufacturer'),
    Price: Yup.number().required('Price is required'),
    Quantity: Yup.number().required('Please Enter Quantity'),
  }),
  handleSubmit(values, { props, resetForm, setSubmitting, setErrors }) {
    //console.log(values);
    setTimeout(() => {
      resetForm();
      // alert(JSON.stringify(values));
      // console.log('values : ' + values);
      props.onSave(values);
      setSubmitting(false);
    }, 2000);
  },
})(ProductForm);

export default FormikProductForm;

// export default class ProductForm  extends React.Component {
//     constructor(props) {
//         super(props);

//         this.onSubmit = this.onSubmit.bind(this);
//     }

//     onSubmit(event) {
//         event.preventDefault();
//         var products = {};
//         products.ProductName = this.refs.ProductName.value;
//         products.ProductDetail = this.refs.ProductDetail.value;
//         products.Manufacturer = this.refs.Manufacturer.value;
//         products.Price = this.refs.Price.value;
//         products.Quantity = this.refs.Quantity.value;
//         this.props.onSave(products);
//     }

//     render() {
//         return(
//             <form>
//                 <h1>Add Product</h1>
//                 Product Name: &nbsp;
//                 <input type="text" id="ProductName" ref="ProductName"></input><br/><br/>
//                 Product Detail: &nbsp;
//                 <input type="text" id="ProductDetail" ref="ProductDetail"></input><br/><br/>
//                 Manufacturer: &nbsp;
//                 <input type="text" ref="Manufacturer"></input><br/><br/>
//                 Price: &nbsp;
//                 <input type="text" ref="Price"></input><br/><br/>
//                 Quantity: &nbsp;
//                 <input type="text" ref="Quantity"></input><br/><br/>
//                 <button type="submit" value="Save" onClick={this.onSubmit} />
//             </form>
//         );
//     }
// }
