import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserForm from '../../components/user/UserForm';
import UserLayout from '../../layouts/UserLayout';
import { LoginContext } from '../../components/contexts/LoginContextProvider';

const UserMypage = () => {
  const { userInfo } = useContext(LoginContext);

  return (
    <UserLayout>
      {(userInfo) => (
        <>
          <h3>내 정보 변경</h3>
          <br />
          <UserForm userDetails={userInfo} disabled={true} />
          <div className="form-buttons">
            <Link to="/userMypageUpdate" className="btn btn-primary sessuce color_main">정보 수정</Link>
          </div>
        </>
      )}
    </UserLayout>
  );
};

export default UserMypage;
