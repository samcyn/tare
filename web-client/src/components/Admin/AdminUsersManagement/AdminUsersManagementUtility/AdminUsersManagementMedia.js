/**
 * created by Samson Iyanda on 23/12/2018
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */
import React, { Component } from 'react';

import SimpleLineIcon from 'react-simple-line-icons';
import Dropdown from '../../../Global/Dropdown/Dropdown';

import PropTypes from 'prop-types'; 



class AdminUsersManagementMedia extends Component {
  render () {
    const { 
      img, 
      isAdmin, 
      index, 
      dropDownActiveNumber, 
      dropDownController, 
      modalController,
      deleteUserController, 
    } = this.props;
    return (
      <div className="media has-background-white">
        <div className="media__content is-flex align-items-center justify-content-space-between">
          <div className="media__index">
            <SimpleLineIcon name={ isAdmin ? "lock" : "lock-open" } color="crimson" />
          </div>
          <div className="media__details is-flex align-items-center">
            <div className="media__image">
              {/* A V A T A R */}
              <img src={img || "https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png"} alt="avatar" />
            </div>
            <div className="media__info">
              <h6 className="media__title">Title</h6>
              <p className="media__subtitle">{ isAdmin ? "admin" : "user" }</p>
            </div>
          </div>
          <div className="media__dropdown">
            <Dropdown 
              dropDownIndex={ index } 
              dropDownActiveNumber={ dropDownActiveNumber }
              dropDownController={ dropDownController }>
              <a href="#" className="dropdown-item" onClick={ modalController }>
                Edit User
              </a>
              <a href="#" className="dropdown-item" onClick= { deleteUserController }>
                  Delete User
              </a>
              <hr className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                  With a divider
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}


AdminUsersManagementMedia.propTypes = {
  img: PropTypes.string,
  isAdmin: PropTypes.bool,
  index: PropTypes.number.isRequired,
  dropDownActiveNumber: PropTypes.number,
  dropDownController: PropTypes.func.isRequired,
  modalController: PropTypes.func.isRequired,
  deleteUserController: PropTypes.func.isRequired,
}
export default AdminUsersManagementMedia;
