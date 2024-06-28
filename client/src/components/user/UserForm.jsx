// UserForm.jsx
import React from 'react';
import './user.css';

const UserForm = ({ user, handleChange, handleSubmit, isUpdatePage }) => {
    return (
        <div className="form-section">
            <h3>내 정보 변경</h3>
            <br />
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="userId" value={user.userId} />
                <input type="hidden" name="userNo" value={user.userNo} />
                <div className="form-group mb-3">
                    <label htmlFor="userid">아이디</label>
                    <input type="text" className="form-control" id="userid" value={user.userId} disabled />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="userName">이름</label>
                    <input type="text" className="form-control" id="userName" name="userName" value={user.userName} onChange={handleChange} disabled={!isUpdatePage} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="userPhone">전화번호</label>
                    <input type="text" className="form-control" id="userPhone" name="userPhone" value={user.userPhone} onChange={handleChange} disabled={!isUpdatePage} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="userEmail">이메일</label>
                    <input type="text" className="form-control" id="userEmail" name="userEmail" value={user.userEmail} onChange={handleChange} disabled={!isUpdatePage} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="userAddress">주소</label>
                    <input type="text" className="form-control" id="userAddress" name="userAddress" value={user.userAddress} onChange={handleChange} disabled={!isUpdatePage} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="userBirth">생년월일</label>
                    <input type="date" className="form-control" id="userBirth" name="userBirth" value={user.userBirth} onChange={handleChange} disabled={!isUpdatePage} />
                </div>
                <div className="form-buttons">
                    <button type="button" className="btn btn-secondary cancel" onClick={() => window.history.back()}>뒤로가기</button>
                    {isUpdatePage && (
                        <>
                            <button type="submit" className="btn btn-danger cancel" name="action" value="delete">탈퇴하기</button>
                            <button type="submit" className="btn btn-primary sessuce color_main" name="action" value="update">정보 수정</button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default UserForm;
