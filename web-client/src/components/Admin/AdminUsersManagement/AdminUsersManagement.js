/**
 * created by Samson Iyanda on 08/12/2018
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";

import AdminUsersManagementMedia from './AdminUsersManagementUtility/AdminUsersManagementMedia';
import AdminUsersManagementModal from './AdminUsersManagementUtility/AdminUsersManagementModal';
import Pagination from '../../Global/Pagination/Pagination';
import Loader from '../../Global/Loader/Loader';
import ErrorUI from '../../Global/Error/ErrorUI';

import './AdminUsersManagement.css';


const USER_QUERY = gql`
  query UserQuery($skip: Int, $first: Int, $orderBy: UserOrderByInput) {
    getUsers(skip: $skip, first: $first, orderBy: $orderBy){
      count
      users{
        id
        isAdmin
        name
        email
      }
    }
  }
`;

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
        <Query query={ USER_QUERY } variables={{ skip: 0, first: 10, orderBy: 'createdAt_DESC' }}>
          {
            ({ data, loading, error }) => {
              if(loading) {
                return (
                  <Loader 
                    size={64} 
                    height={250}
                  />
                );
              }
              if(error) {
                return (
                  <ErrorUI 
                    icon
                    iconName="ban"
                    iconFontSize={140}
                    height={350}
                    opacity={0.25}
                    error={ error }
                  />
                );
              }
              const { users } = data.getUsers;
              return (
                <div className="table">
                  <ul>
                    {
                      users.map((user, index) => (
                        <li key={user.id}>
                          <AdminUsersManagementMedia
                            isAdmin={ user.isAdmin }
                            title={ user.name }
                            index={ index }
                            dropDownActiveNumber={ dropDownActiveNumber }
                            dropDownController={ this.dropDownController }
                            modalController={ (e) => this.modalController(e, user) }
                            deleteUserController={ () => this.deleteUserController(user.id) } />
                        </li>
                      ))
                    }
                  </ul>
                  <br/>
                  {/* P A G I N A T I O N */}
                  <Pagination/>
                </div>
              );
            }
          }
        </Query>
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