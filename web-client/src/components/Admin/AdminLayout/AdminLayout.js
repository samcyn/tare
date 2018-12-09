/**
 * created by Samson Iyanda on 07/12/2018
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */
import React, { Component } from 'react';
import { Switch, Route, Link } from "react-router-dom";

import AdminDashboard from '../AdminDashboard/AdminDashboard';
import AdminEventsManagement from '../AdminEventsManagement/AdminEventsManagement';
import AdminUsersManagement from '../AdminUsersManagement/AdminUsersManagement';
import AdminCategoriesManagement from '../AdminCategoriesManagement/AdminCategoriesManagement';

import './AdminLayout.css';

const AdminHeader = ({ sideBarController }) => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="" />
      </a>

      <a 
        role="button" 
        className="navbar-burger burger" 
        aria-label="menu" 
        aria-expanded="false" 
        data-target="navbarBasicExample"
        onClick={ sideBarController }>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        <a className="navbar-item">
          Home
          </a>

        <a className="navbar-item">
          Documentation
          </a>

        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">
            More
            </a>

          <div className="navbar-dropdown">
            <a className="navbar-item">
              About
              </a>
            <a className="navbar-item">
              Jobs
              </a>
            <a className="navbar-item">
              Contact
              </a>
            <hr className="navbar-divider" />
            <a className="navbar-item">
              Report an issue
              </a>
          </div>
        </div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <a className="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a className="button is-light">
              Log in
                </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
);


class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSideBarOpened: false,
    }
  }

  // O PE N - O R - C L O S E - S I D E B A R 
  toggleSideBarIsOpened = () => {
    this.setState({
      isSideBarOpened: !this.state.isSideBarOpened,
    });
  }

  render () {
    const { match } = this.props;
    const { isSideBarOpened } = this.state;
    return (
      <div className={ !isSideBarOpened ? "dashboard" : "dashboard dashboard--open" }>
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
              <Link to={ `${match.url}/events` }>Events</Link>
            </li>
            <li>
              <Link to={ `${match.url}/categories` }>Categories</Link>
            </li>
          </ul>
        </aside>
        {/*  M A I N C O N T E N T */}
        <section className="dashboard__main">
          <AdminHeader sideBarController={ this.toggleSideBarIsOpened } />
          <div className="dashboard__routes">
            <Switch>
              <Route exact path={ match.path } render={(props) => <AdminDashboard {...props} />} />
              <Route exact path={ `${match.path}/users` } render={(props) => <AdminUsersManagement {...props} />} />
              <Route exact path={ `${match.path}/events` } isExact render={(props) => <AdminEventsManagement {...props} />} />
              <Route exact path={ `${match.path}/categories` } isExact render={(props) => <AdminCategoriesManagement {...props} />} />
            </Switch>
          </div>
        </section>
      </div>
    );
  }
}

export default AdminLayout;