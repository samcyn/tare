import React from 'react';
import SimpleLineIcon from 'react-simple-line-icons';

import PropTypes from 'prop-types'; 


const Pagination = ({ rounded }) => (
  <nav className={`pagination ${rounded ? "is-rounded" : " "} justify-content-space-between`} role="navigation" aria-label="pagination">
    <ul className="pagination-list">
      <li>
        <a className="pagination-link">
          <SimpleLineIcon name="lock"/>
        </a>
      </li>
      <li>
        <a className="pagination-link">
          <SimpleLineIcon name="lock" />
        </a>
      </li>
    </ul>
    <ul className="pagination-list justify-content-flex-end">
      <li>
        <a className="pagination-link is-current" aria-label="Goto page 1">1</a>
      </li>
      <li>
        <a className="pagination-link" aria-label="Goto page 2">2</a>
      </li>
      <li>
        <a className="pagination-link" aria-label="Goto page 3">3</a>
      </li>
    </ul>
  </nav>
);


Pagination.propTypes = {
  rounded: PropTypes.bool
}

export default Pagination;