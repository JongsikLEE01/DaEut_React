// 사용자 조회
import React from 'react';

const UserForm = ({ user }) => {
    return (
        <form >
            <div className="row info-row">
                <label htmlFor="id" className="col-3 label">아이디</label>
                <div className="col-9">
                    <input type="text" id="id" className="form-control" value={user?.userId} readOnly />
                </div>
            </div>
            <div className="row info-row">
                <label htmlFor="name" className="col-3 label">이름</label>
                <div className="col-9">
                    <input type="text" id="name" className="form-control" value={user?.userName} readOnly />
                </div>
            </div>
            <div className="row info-row">
                <label htmlFor="phone" className="col-3 label">전화번호</label>
                <div className="col-9">
                    <input type="text" id="phone" className="form-control" value={user?.userPhone} readOnly />
                </div>
            </div>
            <div className="row info-row">
                <label htmlFor="address" className="col-3 label">주소</label>
                <div className="col-9">
                    <input type="text" id="address" className="form-control" value={user?.userAddress} readOnly />
                </div>
            </div>
            <div className="row info-row">
                <label htmlFor="birth" className="col-3 label">생년월일</label>
                <div className="col-9">
                    <input type="date" id="birth" name="userBirth" className="form-control" value={user?.userBirth?.substring(0, 10)} readOnly />
                </div>
            </div>
        </form>
    );
};

export default UserForm;
