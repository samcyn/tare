import React from 'react';
import PropTypes from 'prop-types';

import './Loader.css';

const Loader = ({ height, backgroundColor, position, size, style }) => (
  <div className="loader is-flex justify-content-center align-items-center" style={{ 
      height: height + 'px', 
      backgroundColor,
      position,
      ...style 
    }}>
    <div className="loader__wrap" style={ { height: size + 'px', width: size + 'px' }}>
      <div className="loader__spinner"></div>
      <div className="loader__spinner"></div>
    </div>
  </div>
);

Loader.propTypes = {
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
  position: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.object
}

export default Loader;