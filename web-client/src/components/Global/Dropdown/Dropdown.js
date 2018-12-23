import React, { Component } from 'react';
import SimpleLineIcon from 'react-simple-line-icons';
import PropTypes from 'prop-types'; 


class Dropdown extends Component{
  render () {
    const { dropDownIndex, dropDownActiveNumber, dropDownController } = this.props;
    return (
      <div className={ dropDownIndex === dropDownActiveNumber ? "dropdown is-active is-right" : "dropdown is-right" }>
        <div className="dropdown-trigger">
          <SimpleLineIcon name="options-vertical" color="crimson" onClick={() => dropDownController(dropDownIndex) }/>      
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <a href="#" className="dropdown-item">
              Edit User
            </a>
            <a href="#" className="dropdown-item">
              Delete User
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              With a divider
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  dropDownIndex: PropTypes.number.isRequired,
  dropDownActiveNumber: PropTypes.number,
  dropDownController: PropTypes.func.isRequired,
}
export default Dropdown;