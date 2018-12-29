/**
 * created by Samson Iyanda on 07/12/2018
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React from 'react';
import { Redirect } from "react-router-dom";

import AdminLayout from '../Admin/AdminLayout/AdminLayout';
import WithAuth from '../Helpers/WithAuth';


const AdminPage = (props) => {
  // I F - U S E R - I S - N O T - L O G G E D - I N - R E D I R E C T - T O - S I G N U P - P A G E
  if (!props.user) {
    return <Redirect to="/register"/>
  }
  return <AdminLayout { ...props }/>;
};

export default WithAuth(AdminPage);