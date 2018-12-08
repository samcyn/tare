/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";

import AdminEventsManagement from './AdminEventsManagement/AdminEventsManagement';
import AdminUsersManagement from './AdminUsersManagement/AdminUsersManagement';

import './AdminLayout.css';

const AdminLayout = () => (
  <div className="dashboard">
    {/* S I D E B A R */}
    <aside className="dashboard__aside">
    Sidebar
      <ul>
        <li>
          <NavLink to='/admin'>Users</NavLink>
        </li>
        <li>
          <NavLink to='/admin/events'>Events</NavLink>
        </li>
        <li>
          <NavLink to='/dashboard'>Categories</NavLink>
        </li>
        <li>
          <NavLink to='/dashboard'>Likes</NavLink>
        </li>
        <li>
          <NavLink to='/dashboard'>Dislikes</NavLink>
        </li>
      </ul>
    </aside>
    {/*  M A I N C O N T E N T */}
    <section className="dashboard__main">
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/admin" render={ (props) => <AdminUsersManagement { ...props } /> } />
            <Route path="/admin/events" render={ (props) => <AdminEventsManagement { ...props }/> } />
          </Switch>
        </Fragment>
      </Router>
    </section>
  </div>
);

export default AdminLayout;