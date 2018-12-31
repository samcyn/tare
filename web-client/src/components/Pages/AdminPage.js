/**
 * created by Samson Iyanda on 07/12/2018
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React from 'react';

import AdminLayout from '../Admin/AdminLayout/AdminLayout';
import WithAuth from '../Helpers/WithAuth';


const AdminPage = (props) => {
  return <AdminLayout { ...props }/>;
};

export default WithAuth(AdminPage);