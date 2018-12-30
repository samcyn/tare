/**
 * created by Samson Iyanda on 27/12/2018
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React, { Component } from 'react';
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
              user: profile
            });
          }
        }
        catch (err) {
          console.log(err);
        }
      }
    }
    
    render() {
      return (
        <AuthComponent user={ this.state.user } {...this.props}/>
      )
    }
  }
}

export default WithAuth;