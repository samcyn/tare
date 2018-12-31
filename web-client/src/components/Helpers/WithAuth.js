/**
 * created by Samson Iyanda on 27/12/2018
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import AuthService from './AuthService';


const  WithAuth = (AuthComponent) => {
  const Auth = new AuthService();

  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: null,
      }
    }

    async componentDidMount() {
      if (Auth.loggedIn()) {
        try {
          const profile = await Auth.getProfile();
          if (profile) {
            this.setState({
              user: profile,
            });
          }
        }
        catch (err) {
          console.log(err);
        }
      }
    }
    
    render() {
      const location = this.props.location;
      // I F - U S E R - I S - N O T - L O G G E D - I N - R E D I R E C T - T O - S I G N U P - P A G E
      if (!Auth.loggedIn()) {
        return <Redirect to={{
          pathname: "/login",
          state: { from: location }
        }}/>
      }
      return (
        <AuthComponent currentUser={ this.state.user } {...this.props}/>
      )
    }
  }
}

export default WithAuth;