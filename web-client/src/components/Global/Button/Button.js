/**
 * created by Samson Iyanda on 28/12/2018
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = ({className, children, onClick, style, ...rest}) => (
  <button 
    className={"button button--custom " + className} 
    style={{...style}}
    onClick={onclick}
    {...rest}
    >{ children }</button>
);


Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.string.isRequired,
  ]),
  onClick: PropTypes.func,
  style: PropTypes.object,
}


export default Button;