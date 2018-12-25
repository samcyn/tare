import React from 'react';
import SimpleLineIcon from 'react-simple-line-icons';
import PropTypes from 'prop-types';

const ErrorUI = ({background, color, height, opacity, icon, iconName, iconFontSize, error, style}) => {
  console.log("ERRORS...", {error})
  return (
    <div className="error-ui is-flex justify-content-center align-items-center has-text-centered"
      style={{backgroundColor: background, opacity, height: height + 'px', ...style}}>
      <div className="has-text-weight-bold">
        {icon && <SimpleLineIcon name={iconName} color={ color } style={{ fontSize: iconFontSize + 'px' }}/>}
        <br/>
        { error.networkError && <div><p style={{color}}>Network Error</p></div> }
      </div>
    </div>
  );
}

ErrorUI.propTypes = {
  background: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.number,
  opacity: PropTypes.number,
  icon: PropTypes.bool,
  iconFontSize: PropTypes.number,
  error: PropTypes.object.isRequired,
  style: PropTypes.object,
}

export default ErrorUI;