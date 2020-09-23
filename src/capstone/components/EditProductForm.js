import React from 'react';
import { withFormik, Field, Form } from 'formik';
import * as Yup from 'yup';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

const EditProductForm = ({ values, errors, touched, isSubmitting }) => (
  <div>
    <h1>Edit Product</h1>
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

const FormikEditProductForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues(props) {
    console.log('editproductform : ', props.product.id);
    //initial value passed from App.js will be set in these parameters
    return {
      ProductName: props.product.ProductName || '',
      ProductDetail: props.product.ProductDetail || '',
      Manufacturer: props.product.Manufacturer || '',
      Price: props.product.Price || '',
      Quantity: props.product.Quantity || '',
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
})(EditProductForm);

export default FormikEditProductForm;
