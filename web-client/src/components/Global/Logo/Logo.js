/**
 * created by Samson Iyanda on 08/12/2018
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React from 'react';
import './Logo.css';

const Logo = ({ color, size }) => (
  <div className="logo">
    <div className="logo__tag" style={ { color, fontSize: size + 'px' }}>
      T<span className="logo__entity">&Aacute;</span>RE
    </div>
  </div>
);

export default Logo;