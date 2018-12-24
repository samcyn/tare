/**
 * created by Samson Iyanda on 08/12/2018
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */
import React, { Component } from 'react';

import AdminUsersManagementMedia from './AdminUsersManagementUtility/AdminUsersManagementMedia';
import AdminUsersManagementModal from './AdminUsersManagementUtility/AdminUsersManagementModal';
import Pagination from '../../Global/Pagination/Pagination';

import './AdminUsersManagement.css';

class AdminUsersManagement extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentUser: null,
      dropDownActiveNumber: null,
      modalIsActive: false,
    }
  }

  dropDownController = (which) => {
    // C L O S E - C U R R E N T - D R O P D O W N - I F - S T A T E - R E M A I N S - T H E - S A M E
    if (which === this.state.dropDownActiveNumber) {
      this.setState({
        dropDownActiveNumber: null,
      });
    }
    else {
      this.setState({
        dropDownActiveNumber: which,
      });
    } 
  }
  modalController = (e, currentUser) => {
    this.setState(prevState => {
      return {
        ...prevState,
        modalIsActive: !prevState.modalIsActive,
        currentUser: currentUser ? currentUser : null
      }
    });
  }
  deleteUserController = (userId) => {
    const confirm = window.confirm("Are you sure about this?");
    if (confirm) {
      console.log(`deleting user ${userId}...`);
    }
  }
  render () {
    const { dropDownActiveNumber, modalIsActive, currentUser } = this.state;
    return (
      <section>
        <div className="is-clearfix">
          <button className="button is-primary is-pulled-right"
            onClick={ (e) => this.modalController(e) }> Add User </button>
        </div>
        <br />
        <div className="filters is-clearfix">
          <div className="select is-primary">
            <select>
              <option>Sort By</option>
              <option>created</option>
              <option>name</option>
            </select>
          </div>
          <div className="is-pulled-right">
            <input className="input is-rounded is-primary" type="text" placeholder="search"></input>
          </div>
        </div>
        <br />
        {/* table */}
        <div className="table">
          <ul>
            <li>
              <AdminUsersManagementMedia 
                isAdmin={true} 
                index={1} 
                dropDownActiveNumber={ dropDownActiveNumber } 
                dropDownController={ this.dropDownController }
                modalController={ (e) => this.modalController(e, { name: 'Dele'}) }
                deleteUserController={ () => this.deleteUserController('User ID 1') }/>
            </li>
            <li>
              <AdminUsersManagementMedia 
                index={2} 
                dropDownActiveNumber={ dropDownActiveNumber }
                dropDownController={ this.dropDownController }
                modalController={ (e) => this.modalController(e, { name: 'Usman'}) }
                deleteUserController={ () => this.deleteUserController('User ID 2') }/>
            </li>
            <li>
              <AdminUsersManagementMedia 
                isAdmin index={3} 
                dropDownActiveNumber={ dropDownActiveNumber }
                dropDownController={ this.dropDownController }
                modalController={ (e) => this.modalController(e, { name: 'Rabiot'}) }
                deleteUserController={ () => this.deleteUserController('User ID 3') }/>
            </li>
          </ul>
          <br/>
          {/* P A G I N A T I O N */}
          <Pagination/>
        </div>
        
        {/* M O D A L */}
        <AdminUsersManagementModal 
          modalIsActive={ modalIsActive } 
          modalController={ this.modalController }
          currentUser= { currentUser }/>
      </section>
    );
  }
}

export default AdminUsersManagement;