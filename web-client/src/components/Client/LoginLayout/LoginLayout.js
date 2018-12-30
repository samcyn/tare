/**
 * created by Samson Iyanda on 27/12/2018
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup'; 
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import AuthService from '../../Helpers/AuthService';


import Card from '../../Global/Card/Card';
import Input from '../../Global/Input/Input';
import Button from '../../Global/Button/Button';

import './LoginLayout.css';


const validationSchema = yup.object().shape({
  name: yup.string().min(3, 'Name must be 3 characters or longer').required('Name is required'),
  email: yup.string().email('Email not valid').required('Email is required'),
  password: yup.string().min(5, 'Password must be 5 characters or longer').required('Password is required')
});

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id 
        isAdmin
        email
        name
      }
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      user {
        id 
        isAdmin
        email
        name
      }
    }
  }
`;


class LoginLayout extends Component {
  
  handleSubmit = async (values, { resetForm, setErrors, setSubmitting }, mutation) => {
    // setTimeout(() => {
    //   if (values.email === 'andrew@test.io') {
    //     setErrors({ email: 'That email is already taken' })
    //   } else {
    //     resetForm();
    //   }
    //   setSubmitting(false);
    // }, 2000);
    const Auth = new AuthService();
    try {
      const result = await mutation({ variables: { ...values } });
      Auth.setToken(result);
      resetForm();
      setSubmitting(false);
    }
    catch (error) {
      console.log("ERRORS", { error });
      setSubmitting(false);
    }
  }

  render () {
    const { match } = this.props;
    // C H E C K - C U R RE N T - P A T H - A N D - D E C I D E - W H A T - T O - R E N D E R
    const registration = match.path === '/register';
  
    return (
      <section className="register is-flex justify-content-center align-items-center">
        <Card header headerTitle={ registration ? "Register" : "Login" }>
          <Mutation mutation={ registration ? SIGNUP_MUTATION : LOGIN_MUTATION }>
            {
              (mutation) => (
                <Formik
                  initialValues={{ email: '', password: '' }}
                  onSubmit={(values, formikBag) => this.handleSubmit(values, formikBag, mutation)}
                  validationSchema={validationSchema}
                >
                  {
                    ({ isSubmitting }) => (
                      <Form>
                        { registration && <Input
                          name="name"
                          type="text"
                          label="Name"
                          placeholder="Your Name" />}
                        <Input
                          name="email"
                          type="email"
                          label="Email"
                          placeholder="Your Email" />
                        <Input
                          name="password"
                          type="password"
                          label="Password"
                          placeholder="Your Password" />
                        <br />
                        <div className="field is-grouped">
                          <div className="control">
                            <Button
                              className={`is-primary${isSubmitting ? " is-loading" : ""}`}
                              type="submit"
                            >{ registration ? "Register" : "Login" }</Button>
                          </div>
                        </div>
                      </Form>
                    )
                  }
                </Formik>
              )
            }
          </Mutation>
        </Card>
      </section>
    );
  }
}

export default LoginLayout;