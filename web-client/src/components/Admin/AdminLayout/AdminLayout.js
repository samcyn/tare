/**
 * created by Samson Iyanda on 07/12/2018
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */
import React from 'react';
import { Switch, Route, Link } from "react-router-dom";

import AdminDashboard from '../AdminDashboard/AdminDashboard';
import AdminEventsManagement from '../AdminEventsManagement/AdminEventsManagement';
import AdminUsersManagement from '../AdminUsersManagement/AdminUsersManagement';
import AdminCategoriesManagement from '../AdminCategoriesManagement/AdminCategoriesManagement';

import './AdminLayout.css';

const AdminLayout = ({ match }) => (
  <div className="dashboard">
    {/* S I D E B A R */}
    <aside className="dashboard__aside">
    Sidebar
      <ul>
        <li>
          <Link to={ match.url }>Dashboard</Link>
        </li>
        <li>
          <Link to={ `${match.url}/users` }>Users</Link>
        </li>
        <li>
          <Link to={ `${ match.url }/events` }>Events</Link>
        </li>
        <li>
          <Link to={`${ match.url }/categories`}>Categories</Link>
        </li>
      </ul>
    </aside>
    {/*  M A I N C O N T E N T */}
    <section className="dashboard__main">
      <Switch>
        <Route exact path={ match.path } render={(props) => <AdminDashboard {...props} />} />
        <Route exact path={ `${match.path}/users` } render={ (props) => <AdminUsersManagement { ...props } /> } />
        <Route exact path={ `${match.path}/events` } isExact render={ (props) => <AdminEventsManagement { ...props }/> } />
        <Route exact path={`${match.path}/categories`} isExact render={(props) => <AdminCategoriesManagement {...props} />} />      
      </Switch>
    </section>
  </div>
);

export default AdminLayout;