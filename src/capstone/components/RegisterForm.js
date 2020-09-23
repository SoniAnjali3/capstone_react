import React from 'react';
import { withFormik, Field, Form } from 'formik';
import * as Yup from 'yup';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

const RegisterForm = ({ errors, touched, isSubmitting }) => (
  <div className='container'>
    <h1>Register Yourself</h1>
    <Form>
      <div className='form-group'>
        <Field
          type='text'
          name='EmailID'
          placeholder='EmailID'
          className='form-control'
        />
        {touched.EmailID && errors.EmailID && (
          <div style={{ color: 'red' }}>{errors.EmailID}</div>
        )}
      </div>
      <div>
        <Field
          type='text'
          name='Password'
          placeholder='Password'
          className='form-control'
        />
        {touched.Password && errors.Password && (
          <div style={{ color: 'red' }}>{errors.Password}</div>
        )}
      </div>
      <br></br>
      <div className='form-group'>
        <Field
          type='text'
          name='FirstName'
          placeholder='FirstName'
          className='form-control'
        />
        {touched.FirstName && errors.FirstName && (
          <div style={{ color: 'red' }}>{errors.FirstName}</div>
        )}
      </div>
      <div className='form-group'>
        <Field
          type='text'
          name='LastName'
          placeholder='LastName'
          className='form-control'
        />
        {touched.LastName && errors.LastName && (
          <div style={{ color: 'red' }}>{errors.LastName}</div>
        )}
      </div>
      <div className='form-group'>
        <Field
          type='text'
          name='Location'
          placeholder='Location'
          className='form-control'
        />
        {touched.Location && errors.Location && (
          <div style={{ color: 'red' }}>{errors.Location}</div>
        )}
      </div>
      <div className='form-group'>
        <Field
          type='text'
          name='MobileNumber'
          placeholder='MobileNumber'
          className='form-control'
        />
        {touched.MobileNumber && errors.MobileNumber && (
          <div style={{ color: 'red' }}>{errors.MobileNumber}</div>
        )}
      </div>
      <br></br>
      <button type='submit' disabled={isSubmitting} className='btn btn-primary'>
        Submit
      </button>
    </Form>
  </div>
);

const FormikRegisterForm = withFormik({
  mapPropsToValues({
    EmailID,
    Password,
    FirstName,
    LastName,
    Location,
    MobileNumber,
  }) {
    //initial value passed from App.js will be set in these parameters
    return {
      EmailID: EmailID || '',
      Password: Password || '',
      FirstName: FirstName || '',
      LastName: LastName || '',
      Location: Location || '',
      MobileNumber: MobileNumber || '',
    };
  },
  validationSchema: Yup.object().shape({
    EmailID: Yup.string()
      .email('Email is not valid')
      .required('EmailID is required'),
    Password: Yup.string().required('Password is required'),
    FirstName: Yup.string().required('Please neter First name'),
    LastName: Yup.string().required('Last Name is required'),
    Location: Yup.string().required('Please Enter your location'),
    MobileNumber: Yup.string()
      .min(10, 'number should be 10 digits long')
      .max(10, 'number should be 10 digits long')
      .required('enter contact number'),
  }),
  handleSubmit(values, { props, resetForm, setSubmitting, setErrors }) {
    //console.log(values);
    setTimeout(() => {
      resetForm();
      // alert(JSON.stringify(values));
      // console.log('values : ' + values);
      props.onRegister(values);
      setSubmitting(false);
    }, 2000);
  },
})(RegisterForm);

export default FormikRegisterForm;

// export default class RegisterForm  extends React.Component {
//     constructor(props) {
//         super(props);

//         this.onSubmit = this.onSubmit.bind(this);
//     }

//     onSubmit(event) {
//         event.preventDefault();
//         var user = {};
//         user.EmailID = this.refs.EmailID.value;
//         user.Password = this.refs.Password.value;
//         user.FirstName = this.refs.FirstName.value;
//         user.LastName = this.refs.LastName.value;
//         user.Location = this.refs.Location.value;
//         user.MobileNumber = this.refs.MobileNumber.value;
//         this.props.onRegister(user);
//     }

//     render() {
//         return(
//             <form>
//                 <h1>Register User</h1>
//                 EmailID: &nbsp;
//                 <input type="text" ref="EmailID"></input><br/><br/>
//                 Password: &nbsp;
//                 <input type="text" ref="Password"></input><br/><br/>
//                 FirstName:
//                 <input type="text" ref="FirstName"></input><br/><br/>
//                 LastName:
//                 <input type="text" ref="LastName"></input><br/><br/>
//                 Location:
//                 <input type="text" ref="Location"></input><br/><br/>
//                 MobileNumber:
//                 <input type="text" ref="MobileNumber"></input><br/><br/>
//                 <button type="submit" value="Save" onClick={this.onSubmit} />
//             </form>
//         );
//     }
// }
