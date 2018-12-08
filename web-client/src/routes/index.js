import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "../components/pages/NotFound";
import Login from "../components/pages/Login";
import Admin from "../components/pages/Admin";
import Portal from "../components/pages/Portal";
import LandingPage from "../components/pages/LandingPage";
import SignUp from "../components/pages/Signup";

const Routers = () => {
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route exact path="/" component={ LandingPage } />
          <Route path="/portal" component={ Portal } />
          <Route path="/admin" component={ Admin } />
          <Route path='/login' component={ Login } />
          <Route path='/register' component={ SignUp } />
          <Route component={ NotFound } />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default Routers;