import React from 'react';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types'; 

const AdminDashboardAreaChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={350}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
      <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
    </AreaChart>
  </ResponsiveContainer>
);

AdminDashboardAreaChart.propTypes = {
  data: PropTypes.array.isRequired,
}
export default AdminDashboardAreaChart;
