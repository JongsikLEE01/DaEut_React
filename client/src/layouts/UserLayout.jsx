import React, { useState } from 'react';
import Header from '../components/static/Header';
import Footer from '../components/static/Footer';
import Sidebar from '../components/static/Sidebar';
import '../components/user/user.css';

const UserLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
      <div className="layout">
        <Header />
        <button className="btn btn-primary toggle-btn menu mt-2 ml-2 myBtn d-md-none" id="toggle-btn" onClick={toggleSidebar}>메뉴</button>
        <div className="container-fluid">
          <div className="row">
              <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
              <main className={`col-md-9 col-lg-10 form-section ${sidebarOpen ? 'sidebar-open' : ''}`}>
                  {children}
              </main>
          </div>
        </div>
        <Footer />
      </div>
    );
};

export default UserLayout;
