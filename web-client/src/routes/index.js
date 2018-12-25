import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFoundPage from "../components/Pages/NotFoundPage";
import LoginPage from "../components/Pages/LoginPage";
import AdminPage from "../components/Pages/AdminPage";
import PortalPage from "../components/Pages/PortalPage";
import LandingPage from "../components/Pages/LandingPage";
import SignUpPage from "../components/Pages/SignupPage";

const Routers = () => {
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route exact path="/" component={ LandingPage } />
          <Route path="/portal" component={ PortalPage } />
          <Route path="/admin" component={ AdminPage } />
          <Route path='/login' component={ LoginPage } />
          <Route path='/register' component={ SignUpPage } />
          <Route component={ NotFoundPage } />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default Routers;