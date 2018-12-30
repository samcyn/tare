import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'; 

import Logo from '../../../Global/Logo/Logo';


const AdminLayoutHeader = ({ user, sideBarController }) => (
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
        user &&
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>{ user.name }</strong>
              </a>
              <a className="button is-light">
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
  sideBarController: PropTypes.func,
}


export default AdminLayoutHeader;
