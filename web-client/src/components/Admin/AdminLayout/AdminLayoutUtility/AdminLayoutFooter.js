import React from 'react';

const AdminLayoutFooter = () => (
  <footer className="dashboard__footer footer">
    <div className="content has-text-centered">
      <p>
        made with &hearts; by <a href="https://github.com/samcyn" className="has-text-info">@samcyn</a>. Copyright &copy; {new Date().getFullYear()}
      </p>
    </div>
  </footer>
);

export default AdminLayoutFooter