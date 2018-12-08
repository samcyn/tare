import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFoundPage from "../components/pages/NotFoundPage";
import LoginPage from "../components/pages/LoginPage";
import AdminPage from "../components/pages/AdminPage";
import PortalPage from "../components/pages/PortalPage";
import LandingPage from "../components/pages/LandingPage";
import SignUpPage from "../components/pages/SignupPage";

const Routers = () => {
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route exact path="/" component={ LandingPage } />
          <Route path="/portal" component={ PortalPage } />
          <Route path="/admin" component={ AdminPage } />
          <Route path='/login' component={ LoginPage } />
          <Route Pagepath='/register' component={ SignUpPage } />
          <Route component={ NotFoundPage } />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default Routers;