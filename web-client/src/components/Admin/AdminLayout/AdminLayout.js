/**
 * created by Samson Iyanda on 07/12/2018
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */
import React, { Component } from 'react';
import { Switch, Route, NavLink, Link } from "react-router-dom";
import SimpleLineIcon from 'react-simple-line-icons';


import AdminDashboard from '../AdminDashboard/AdminDashboard';
import AdminEventsManagement from '../AdminEventsManagement/AdminEventsManagement';
import AdminUsersManagement from '../AdminUsersManagement/AdminUsersManagement';
import AdminCategoriesManagement from '../AdminCategoriesManagement/AdminCategoriesManagement';
import Logo from '../../Global/Logo/Logo';

import './AdminLayout.css';

const AdminHeader = ({ sideBarController }) => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link className="navbar-item is-hidden-desktop" to="/admin">
        <Logo color="black"/>
      </Link>
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

const AdminFooter = () => (
  <footer className="footer">
    <div className="content has-text-centered">
      <p>
        made with &hearts; by <a href="https://github.com/samcyn" className="has-text-info">@samcyn</a>. Copyright &copy; { new Date().getFullYear() }
      </p>
    </div>
  </footer>
);

const AdminSideBar = ({ match }) => (
  <aside className="dashboard__aside">
    <div className="dashboard-aside__header">
      <Logo size={30} color="white"/>
    </div>
    <ul className="dashboard-aside__menu">
      <li className="dashboard-aside__divider is-flex justify-content-center align-items-center">
         welcome username
      </li>
      <li className="dashboard-aside__list">
        <NavLink to={match.url} exact={true} className="dashboard-aside__links" activeClassName="dashboard-aside--active">
          <SimpleLineIcon name="speech" size="small"/> 
          <span>Dashboard</span>
        </NavLink>
      </li>
      <li className="dashboard-aside__list">
        <NavLink to={`${match.url}/users`} className="dashboard-aside__links" activeClassName="dashboard-aside--active">
          <SimpleLineIcon name="user" size="small"/> 
          <span>Users</span>
        </NavLink>
      </li>
      <li className="dashboard-aside__list">
        <NavLink to={`${match.url}/events`} className="dashboard-aside__links" activeClassName="dashboard-aside--active">
          <SimpleLineIcon name="event" size="small"/> 
          <span>Events</span>
        </NavLink>
      </li>
      <li className="dashboard-aside__list">
        <NavLink to={`${match.url}/categories`} className="dashboard-aside__links" activeClassName="dashboard-aside--active">
          <SimpleLineIcon name="list" size="small"/>
          <span>Categories</span>
        </NavLink>
      </li>
    </ul>
  </aside>
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
        <AdminSideBar match={ match }/>
        {/*  M A I N C O N T E N T */}
        <section className="dashboard__main">
          {/* H E A D E R - R I G H T - H E R E */}
          <AdminHeader sideBarController={ this.toggleSideBarIsOpened } />
          <div className="dashboard__routes">
            <Switch>
              <Route exact path={ match.path } render={ (props) => <AdminDashboard { ...props } /> } />
              <Route exact path={ `${match.path}/users` } render={ (props) => <AdminUsersManagement { ...props } /> } />
              <Route exact path={ `${match.path}/events` } render={ (props) => <AdminEventsManagement { ...props } /> } />
              <Route exact path={ `${match.path}/categories` } render={ (props) => <AdminCategoriesManagement { ...props } /> } />
            </Switch>
          </div>
          {/* F O O T E R - R I G H T - H E R E */}
          <AdminFooter/>

          {/* B O D Y - C L I C K */}
          { isSideBarOpened && <div className="dashboard__overlay" onClick={ this.toggleSideBarIsOpened }></div> }
        </section>
      </div>
    );
  }
}

export default AdminLayout;