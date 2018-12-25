/**
 * created by Samson Iyanda on 24/12/2018
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React from 'react';
import PropTypes from 'prop-types'; 

const Modal = ({ children, modalIsActive, modalController }) => (
  <div className={ `modal ${ modalIsActive ? "is-active" : " "}`}>
    <div className="modal-background"></div>
    <div className="modal-content">
      {/* R E N D E R S - C H I L D R E N */}
      { children }
    </div>
    <button 
      className="modal-close is-large" 
      aria-label="close"
      onClick={(e) => modalController(e) }></button>
  </div>
);

// Specifies the default values for props:
Modal.defaultProps = {
  modalIsActive: false,
};

Modal.propTypes = {
  modalIsActive: PropTypes.bool,
  children: PropTypes.element.isRequired,
  modalController: PropTypes.func.isRequired,
}

export default Modal;