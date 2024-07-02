import React from 'react';
import Sidebar from '../components/user/Sidebar';

const UserLayout = ({ children, toggleSidebar }) => {
  return (
    <div className="container-fluid">
      <button className="btn btn-primary toggle-btn menu mt-2 ml-2 myBtn" id="toggle-btn" onClick={toggleSidebar}>
        메뉴
      </button>
      <div className="row">
        <Sidebar toggleSidebar={toggleSidebar} />
        <div className="col-md-9 col-lg-10 form-section">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
