import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';
import UserForm from '../../components/user/UserForm';
import axios from 'axios';
import '../../components/user/user.css';

const UserMyPageUpdate = () => {
    const location = useLocation();
    const { user } = location.state;
    const [updatedUser, setUpdatedUser] = useState(user);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser({ ...updatedUser, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const action = e.nativeEvent.submitter.value;
        try {
            if (action === 'update') {
                await axios.put('http://localhost:8080/user/userMypageUpdateDone', updatedUser, {
                    params: { action: 'update' },
                });
                alert('정보가 성공적으로 업데이트되었습니다.');
            } else if (action === 'delete') {
                await axios.delete('http://localhost:8080/user/userMypageUpdateDone', {
                    data: updatedUser,
                    params: { action: 'delete' },
                });
                alert('계정이 성공적으로 삭제되었습니다.');
            }
            navigate('/user/userMypage');
        } catch (error) {
            console.error('Error updating user data:', error);
            alert('정보 업데이트에 실패했습니다.');
        }
    };

    return (
        <UserLayout>
            <div>
                <UserForm user={updatedUser} isUpdatePage={true} handleChange={handleChange} />
                <div className="form-buttons">
                    <button className="btn btn-primary" onClick={handleSubmit} value="update">정보 수정</button>
                    <button className="btn btn-danger" onClick={handleSubmit} value="delete">탈퇴하기</button>
                </div>
            </div>
        </UserLayout>
    );
};

export default UserMyPageUpdate;
