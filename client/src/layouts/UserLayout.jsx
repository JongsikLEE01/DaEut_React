import React from 'react';
import Header from '../components/static/Header';
import Footer from '../components/static/Footer';
import Sidebar from '../components/user/Sidebar';

const UserLayout = ({ children, toggleSidebar }) => {
  return (
    <div className="container-fluid">
      <Header />
      <button className="btn btn-primary toggle-btn menu mt-2 ml-2 myBtn" id="toggle-btn" onClick={toggleSidebar}>
        메뉴
      </button>
      <div className="row">
        <Sidebar toggleSidebar={toggleSidebar} />
        <div className="col-md-9 col-lg-10 form-section">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
