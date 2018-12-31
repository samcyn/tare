import React from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types'; 

import AuthService from '../../../Helpers/AuthService';

import Logo from '../../../Global/Logo/Logo';

const logOut = async (history) => {
  const auth = new AuthService();
  await auth.logout();
  history.push('/login');
}

const AdminLayoutHeader = ({ currentUser, sideBarController, history }) => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link className="navbar-item is-hidden-desktop" to="/admin">
        <Logo color="black" />
      </Link>
      <a
        role="button"
        className="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        onClick={sideBarController}>
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
      {
        currentUser &&
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>{ currentUser.name }</strong>
              </a>
              <a className="button is-light" onClick={ () => logOut(history) }>
                Log Out
              </a>
            </div>
          </div>
        </div>
      }
    </div>
  </nav>
);


AdminLayoutHeader.propTypes = {
  currentUser: PropTypes.object,
  sideBarController: PropTypes.func,
}


export default withRouter(AdminLayoutHeader);
