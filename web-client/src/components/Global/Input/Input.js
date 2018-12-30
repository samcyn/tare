/**
 * created by Samson Iyanda on 27/12/2018
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */


import React from 'react';
import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';


const Input = ({type, name, label, placeholder}) => {
  return (
    <div className="field">
      { label && <label className="label">{label}</label> }
      <div className="control">
        <Field className="input" type={ type } name={ name } placeholder={ placeholder } autoComplete="off" />
      </div>
      <ErrorMessage name={name} render={(msg) => <p className="help is-danger">{msg}</p> }/>
    </div>
  );
}


Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
}

export default Input;