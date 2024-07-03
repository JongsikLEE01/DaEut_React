import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../components/contexts/LoginContextProvider';
import UserForm from '../../components/user/UserForm';
import { getUserInfo } from '../../apis/Users/User';
import { formatDate } from '../../apis/format';
import '../../components/user/User.css'

const UserMypageContainer = () => {
  const { userInfo, setUserInfo } = useContext(LoginContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserInfo = async () => {
    try {
      const response = await getUserInfo();
      const data = response.data;

      // 생년월일 변환
      if (data.userBirth) {
        data.userBirth = formatDate(data.userBirth);
      }
      setUserInfo(data);
      console.log("Fetched data: ", data);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (loading) {
    return (
        <p>Loading...</p>
    );
  }

  if (error) {
    return (
        <p>Error fetching user information</p>
    );
  }

  return (
    <>
      {userInfo ? (
        <>
          <h3>내 정보 변경</h3>
          <br />
          <UserForm userDetails={userInfo} disabled={true} />
          <div className="form-buttons">
            <a href="/user/userMypageUpdate" className="btn btn-primary sessuce color_main">정보 수정</a>
          </div>
        </>
      ) : (
        <p>No user information available</p>
      )}
    </>
  );
};

export default UserMypageContainer;
