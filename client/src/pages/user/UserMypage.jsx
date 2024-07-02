import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../components/contexts/LoginContextProvider';
import UserLayout from '../../layouts/UserLayout';
import UserForm from '../../components/user/UserForm';

const UserMypage = () => {
  const { userInfo } = useContext(LoginContext);
  const [userDetails, setUserDetails] = useState({
    userId: '',
    userName: '',
    userPhone: '',
    userEmail: '',
    userAddress: '',
    userBirth: ''
  });

  useEffect(() => {
    if (userInfo) {
      setUserDetails(userInfo);
    }
  }, [userInfo]);

  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
  };

  return (
    <UserLayout toggleSidebar={toggleSidebar}>
      <h3>내 정보 변경</h3>
      <br />
      <UserForm userDetails={userDetails} disabled={true} />
      <div className="form-buttons">
        <Link to="/userMypageUpdate" className="btn btn-primary sessuce color_main">정보 수정</Link>
      </div>
    </UserLayout>
  );
};

export default UserMypage;
