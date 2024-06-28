import React, { useEffect, useState } from 'react';
import UserLayout from '../../layouts/UserLayout';
import UserForm from '../../components/user/UserForm';
import '../../components/user/user.css';

const UserMyPage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // 하드코딩된 사용자 데이터
        const hardcodedUser = {
            userId: 'testuser',
            userPassword: 'password123',
            userName: '테스트 유저',
            userEmail: 'testuser@example.com',
            userPhone: '010-1234-5678',
            userAddress: '서울시 강남구',
            userBirth: '1990-01-01'
        };
        setUser(hardcodedUser);
    }, []);

    return (
        <UserLayout>
            <div>
                {user && <UserForm user={user} isUpdatePage={false} />}
            </div>
        </UserLayout>
    );
};

export default UserMyPage;
