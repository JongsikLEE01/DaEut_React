import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../components/contexts/LoginContextProvider';
import UserForm from '../../components/user/UserForm';
import { getUserInfo, updateUserInfo } from '../../apis/Users/user';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../../components/user/User.css'

const UserMypageUpdateContainer = () => {
  const { userInfo, setUserInfo } = useContext(LoginContext);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
        setFormValues(data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) {
      setFormValues(userInfo);
      setLoading(false);
    } else {
      fetchUserInfo();
    }
  }, [userInfo, setUserInfo]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUserInfo(formValues)
      .then(() => {
        Swal.fire('정보 수정', '정보가 성공적으로 수정되었습니다.', 'success');
        setUserInfo(formValues); // 업데이트된 정보를 컨텍스트에 반영
        navigate('/user/userMypage');
      })
      .catch(error => {
        console.error('Failed to update user info:', error);
        Swal.fire('오류', '정보 수정에 실패했습니다.', 'error');
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching user information</p>;
  }

  return (
    <div className="container-fluid container">
      <h3>내 정보 변경</h3>
      <br />
      <form onSubmit={handleSubmit}>
        <UserForm userDetails={formValues} handleInputChange={handleInputChange} disabled={false} />
        <div className="form-buttons">
          <a href="/user/userMypage" className="btn btn-secondary cancel">뒤로가기</a>
          <button type="submit" className="btn btn-primary sessuce color_main">정보 수정</button>
        </div>
      </form>
    </div>
  );
};

export default UserMypageUpdateContainer;
