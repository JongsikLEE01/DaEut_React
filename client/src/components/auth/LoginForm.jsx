import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const navigate = useNavigate();

    const hardcodedUser = {
        userId: 'testuser',
        userPassword: 'password123'
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userId === hardcodedUser.userId && userPassword === hardcodedUser.userPassword) {
            localStorage.setItem('token', 'dummy-token'); // JWT 토큰 저장 예시
            navigate('/user/userMypage'); // 로그인 후 마이페이지로 리디렉션
        } else {
            alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="userId">아이디</label>
                <input
                    type="text"
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="userPassword">비밀번호</label>
                <input
                    type="password"
                    id="userPassword"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">로그인</button>
        </form>
    );
};

export default LoginForm;
