import React from 'react';

const UserDetails = () => {
    const user = {
        userId: 'testuser',
        userPassword: 'password123',
        userName: '테스트 유저',
        userEmail: 'testuser@example.com',
        userPhone: '010-1234-5678',
        userAddress: '서울시 강남구',
        userBirth: '1990-01-01'
    };

    return (
        <div className="form-section">
            <h3>내 정보</h3>
            <div className="form-group mb-3">
                <label>아이디</label>
                <p>{user.userId}</p>
            </div>
            <div className="form-group mb-3">
                <label>비밀번호</label>
                <p>{user.userPassword}</p>
            </div>
            <div className="form-group mb-3">
                <label>이름</label>
                <p>{user.userName}</p>
            </div>
            <div className="form-group mb-3">
                <label>이메일</label>
                <p>{user.userEmail}</p>
            </div>
            <div className="form-group mb-3">
                <label>전화번호</label>
                <p>{user.userPhone}</p>
            </div>
            <div className="form-group mb-3">
                <label>주소</label>
                <p>{user.userAddress}</p>
            </div>
            <div className="form-group mb-3">
                <label>생년월일</label>
                <p>{user.userBirth}</p>
            </div>
        </div>
    );
};

export default UserDetails;
