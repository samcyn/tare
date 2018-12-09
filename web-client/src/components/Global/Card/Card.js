import React from 'react';
import PropTypes from 'prop-types'; 

const Card = ({ header, headerTitle, fullheight, children, style }) => (
  <div className="card" style={{
    height: fullheight ? '100%' : 'auto', 
    ...style,
    }}>
    {
      header && <header className="card-header">
        <p className="card-header-title">
          { headerTitle }
        </p>
      </header>
    }
    <div className="card-content">
      { children }
    </div>
  </div>
);

// Specifies the default values for props:
Card.defaultProps = {
  header: false,
};

Card.propTypes = {
  header: PropTypes.bool,
  headerTitle: PropTypes.string,
  children: PropTypes.element.isRequired,
}

export default Card;
