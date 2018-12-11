
import React from 'react';
import SimpleLineIcon from 'react-simple-line-icons';
import PropTypes from 'prop-types'; 

const AdminDashboardStats = ({ color, icon, title, subtitle }) => {
  return (
    <div className="stats is-flex align-items-center">
      <div className={`stats__balls 
        is-flex 
        align-items-center 
        justify-content-center ` + (color ? '' : "has-background-primary")}
        style={{ backgroundColor: color }}>
        <SimpleLineIcon name={ icon ? icon : 'home' } size="large"/>
      </div>
      <div className="stats__info">
        <h5 className="has-text-weight-bold is-size-4-mobile">{title}</h5>
        <p className="has-text-grey-dark is-size-7-mobile">{subtitle}</p>
      </div>
    </div>
  );
}

AdminDashboardStats.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
}

export default AdminDashboardStats;