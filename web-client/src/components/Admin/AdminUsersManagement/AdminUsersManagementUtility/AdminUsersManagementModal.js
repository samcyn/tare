/**
 * created by Samson Iyanda on 24/12/2018
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../Global/Modal/Modal';
import Card from '../../../Global/Card/Card';

const AdminUsersManagementModal = ({ modalIsActive, modalController, currentUser }) => (
  <Modal modalIsActive={ modalIsActive } modalController={ modalController }>
    <Card>
      { currentUser === null ?
        <form>
          <div className="field">
            <label className="label">Avatar</label>
            <div className="control">
              <input className="input" type="file" />
            </div>
          </div>
          <div className="field">
            <label className="label">User Name</label>
            <div className="control">
              <input className="input" type="text" placeholder="Users name"/>
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input" type="email" placeholder="User Email" />
            </div>
          </div>
          <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" placeholder="User Password" />
          </div>
        </div>
        </form>
        : 
        <form>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input className="input" type="text" placeholder="Users name" value={ currentUser.name }/>
            </div>
          </div>
        </form>
      }
    </Card>
  </Modal>
);
// S P E C I F I E S - T H E - D E F A U L T - P R O P S - V A L U E S :
AdminUsersManagementModal.defaultProps = {
  modalIsActive: false,
};

AdminUsersManagementModal.propTypes = {
  currentUser: PropTypes.object,
  modalIsActive: PropTypes.bool,
  modalController: PropTypes.func.isRequired,
}

export default AdminUsersManagementModal;