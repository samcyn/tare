/**
 * created by Samson Iyanda on 07/12/2018
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */
import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

// V I E W S - O R - S U B R O U T E S
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import AdminEventsManagement from '../AdminEventsManagement/AdminEventsManagement';
import AdminUsersManagement from '../AdminUsersManagement/AdminUsersManagement';
import AdminCategoriesManagement from '../AdminCategoriesManagement/AdminCategoriesManagement';

// A D M I N L A Y O U T - U T I L I T Y
import AdminLayoutHeader from './AdminLayoutUtility/AdminLayoutHeader';
import AdminLayoutSideBar from './AdminLayoutUtility/AdminLayoutSidebar';
import AdminLayoutFooter from './AdminLayoutUtility/AdminLayoutFooter';

import './AdminLayout.css';


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
    const { match, user } = this.props;
    const { isSideBarOpened } = this.state;
    return (
      <div className={ !isSideBarOpened ? "dashboard" : "dashboard dashboard--open" }>
        {/* S I D E B A R */}
        <AdminLayoutSideBar match={ match }/>
        {/*  M A I N C O N T E N T */}
        <section className="dashboard__main">
          {/* H E A D E R - R I G H T - H E R E */}
          <AdminLayoutHeader sideBarController={ this.toggleSideBarIsOpened } user = { user } />
          <div className="dashboard__routes">
            <Switch>
              <Route exact path={ match.path } render={ (props) => <AdminDashboard { ...props } /> } />
              <Route exact path={ `${match.path}/users` } render={ (props) => <AdminUsersManagement { ...props } /> } />
              <Route exact path={ `${match.path}/events` } render={ (props) => <AdminEventsManagement { ...props } /> } />
              <Route exact path={ `${match.path}/categories` } render={ (props) => <AdminCategoriesManagement { ...props } /> } />
              <Route component={ AdminDashboard }></Route>
            </Switch>
          </div>
          {/* F O O T E R - R I G H T - H E R E */}
          <AdminLayoutFooter/>

          {/* B O D Y - C L I C K */}
          { isSideBarOpened && <div className="dashboard__overlay" onClick={ this.toggleSideBarIsOpened }></div> }
        </section>
      </div>
    );
  }
}

export default AdminLayout;