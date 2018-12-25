import React from 'react';
import { NavLink } from "react-router-dom";
import SimpleLineIcon from 'react-simple-line-icons';
import PropTypes from 'prop-types'; 


import Logo from '../../../Global/Logo/Logo';

const AdminLayoutSideBar = ({ match }) => (
  <aside className="dashboard__aside">
    <div className="dashboard-aside__header">
      <Logo size={30} color="white" />
    </div>
    <ul className="dashboard-aside__menu">
      <li className="dashboard-aside__divider is-flex justify-content-center align-items-center">
        welcome username
      </li>
      <li className="dashboard-aside__list">
        <NavLink to={match.url} exact={true} className="dashboard-aside__links" activeClassName="dashboard-aside--active">
          <SimpleLineIcon name="speech" size="small" />
          <span>Dashboard</span>
        </NavLink>
      </li>
      <li className="dashboard-aside__list">
        <NavLink to={`${match.url}/users`} className="dashboard-aside__links" activeClassName="dashboard-aside--active">
          <SimpleLineIcon name="user" size="small" />
          <span>Users</span>
        </NavLink>
      </li>
      <li className="dashboard-aside__list">
        <NavLink to={`${match.url}/events`} className="dashboard-aside__links" activeClassName="dashboard-aside--active">
          <SimpleLineIcon name="event" size="small" />
          <span>Events</span>
        </NavLink>
      </li>
      <li className="dashboard-aside__list">
        <NavLink to={`${match.url}/categories`} className="dashboard-aside__links" activeClassName="dashboard-aside--active">
          <SimpleLineIcon name="list" size="small" />
          <span>Categories</span>
        </NavLink>
      </li>
    </ul>
  </aside>
);

AdminLayoutSideBar.propTypes = {
  match: PropTypes.object
}


export default AdminLayoutSideBar;