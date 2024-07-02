import React, { useContext } from 'react';
import Sidebar from '../components/user/Sidebar';
import { LoginContext } from '../components/contexts/LoginContextProvider';
import Header from '../components/static/Header';
import Footer from '../components/static/Footer';

const UserLayout = ({ children }) => {
  const { userInfo } = useContext(LoginContext);

  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
  };

  return (
    <div className="container-fluid">
      <Header />
      <button className="btn btn-primary toggle-btn menu mt-2 ml-2 myBtn" id="toggle-btn" onClick={toggleSidebar}>
        메뉴
      </button>
      <div className="row">
        <Sidebar toggleSidebar={toggleSidebar} />
        <div className="col-md-9 col-lg-10 form-section">
          {userInfo ? children(userInfo) : <p>Loading...</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
