/**
 * created by Samson Iyanda on 08/12/2018
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */
import React, { Component } from 'react';
import AdminUsersManagementMedia from './AdminUsersManagementUtility/AdminUsersManagementMedia';

import './AdminUsersManagement.css';

class AdminUsersManagement extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dropDownActiveNumber: null,
    }
  }

  dropDownController = (which) => {
    // C L O S E - C U R R E N T - D R O P D O W N - I F - C L I C K E D - U P O N
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
  render () {
    const { dropDownActiveNumber } = this.state;
    return (
      <section>
        <div className="is-clearfix">
          <button className="button is-primary is-pulled-right"> Add User </button>
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
                dropDownController={this.dropDownController}/>
            </li>
            <li>
              <AdminUsersManagementMedia 
                index={2} 
                dropDownActiveNumber={dropDownActiveNumber}
                dropDownController={this.dropDownController}/>
            </li>
            <li>
              <AdminUsersManagementMedia 
                isAdmin index={3} 
                dropDownActiveNumber={dropDownActiveNumber}
                dropDownController={this.dropDownController}/>
            </li>
          </ul>
        </div>

      </section>
    );
  }
}

export default AdminUsersManagement;