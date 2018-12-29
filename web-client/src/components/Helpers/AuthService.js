/**
 * created by Samson Iyanda on 27/12/2018
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import crypto from 'crypto-js';

import { AUTH_TIME, AUTH_TOKEN, AUTH_USER } from '../../utilities/constants';


let key = process.env.REACT_APP_KEY || "appkey";

export default class AuthService {

  constructor() {
    this.user = null;
    this.maxMins = 720;
    this.getProfile = this.getProfile.bind(this)
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }


  isTokenExpired() {
    try {
      let time = localStorage.getItem(AUTH_TIME);
      if (time) {
        const bytes = crypto.AES.decrypt(time.toString(), key),
          decrypted = parseInt(bytes.toString(crypto.enc.Utf8)),
          currentTime = new Date().getTime(),
          timegap = decrypted - currentTime;
        if (timegap > 0 && timegap < 600000) {
          return true;
        }

        return false;
      } 
      else { 
        return false;
      }
    }
    catch (err) {
      return false;
    }
  }

  setToken(res) {
    try {
      //Store the decrypted surrogate key in your session variable.
      let expiry = JSON.stringify((this.maxMins * 60 * 1000) + new Date().getTime()),
        encrypted = crypto.AES.encrypt(expiry, key);
      const token = res.data && res.data.login ? res.data.login.token : res.data.signup.token;
      const user = res.data && res.data.login ? res.data.login.user : res.data.signup.user;

      localStorage.setItem(AUTH_TIME, encrypted);
      localStorage.setItem(AUTH_TOKEN, token);
      localStorage.setItem(AUTH_USER, user);
    }
    catch (ex) {
      return ex;
    }
  }

  getToken() {
    return localStorage.getItem(AUTH_TOKEN);
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(AUTH_USER);
    localStorage.removeItem(AUTH_TIME);
  }

  getProfile() {
    let token = localStorage.getItem(AUTH_TOKEN),
      user = localStorage.getItem(AUTH_USER);
    if(user && token) {
      return {
        token,
        user
      };
    }
    else {
      return false;
    }
  }
}

