import React from 'react';
import { withFormik, Field, Form } from 'formik';
import * as Yup from 'yup';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

const LoginForm = ({ errors, touched, isSubmitting }) => (
  <div>
    <h1>Login</h1>
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
      <div className='form-group'>
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
      <button type='submit' disabled={isSubmitting} className='btn btn-primary'>
        Submit
      </button>
    </Form>
  </div>
);

const FormikLoginForm = withFormik({
  mapPropsToValues({ EmailID, Password }) {
    //initial value passed from App.js will be set in these parameters
    return {
      EmailID: 'anjali@gmail.com' || '',
      Password: 'anjali' || '',
    };
  },
  validationSchema: Yup.object().shape({
    EmailID: Yup.string()
      .email('Email is not valid')
      .required('EmailID is required'),
    Password: Yup.string().required('Password is required'),
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
})(LoginForm);

export default FormikLoginForm;
// export default class LoginForm  extends React.Component {
//     constructor(props) {
//         super(props);

//         this.onSubmit = this.onSubmit.bind(this);
//     }

//     onSubmit(event) {
//         event.preventDefault();
//         var user = {};
//         user.EmailID = this.refs.EmailID.value;
//         user.Password = this.refs.Password.value;
//         this.props.onSave(user);
//     }

//     render() {
//         return(
//             <form>
//                 <h1>Login</h1>
//                 EmailID: &nbsp;
//                 <input type="text" ref="EmailID"></input><br/><br/>
//                 Password: &nbsp;
//                 <input type="text" ref="Password"></input><br/><br/>
//                 <button type="submit" value="Save" onClick={this.onSubmit} />
//             </form>
//         );
//     }
// }
