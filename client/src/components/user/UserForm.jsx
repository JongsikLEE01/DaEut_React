import React from 'react';

const UserForm = ({ userDetails, handleInputChange, disabled }) => {
  return (
    <form>
      <div className="form-group mb-3">
        <label htmlFor="userid">아이디</label>
        <input type="text" className="form-control" id="userid" value={userDetails.userId} disabled />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="userName">이름</label>
        <input type="text" className="form-control" id="userName" value={userDetails.userName} onChange={handleInputChange} disabled={disabled} />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="userPhone">전화번호</label>
        <input type="text" className="form-control" id="userPhone" value={userDetails.userPhone} onChange={handleInputChange} disabled={disabled} />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="userEmail">이메일</label>
        <input type="text" className="form-control" id="userEmail" value={userDetails.userEmail} onChange={handleInputChange} disabled={disabled} />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="userAddress">주소</label>
        <input type="text" className="form-control" id="userAddress" value={userDetails.userAddress} onChange={handleInputChange} disabled={disabled} />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="userBirth">생년월일</label>
        <input type="date" className="form-control" id="userBirth" value={userDetails.userBirth} onChange={handleInputChange} disabled={disabled} />
      </div>
    </form>
  );
};

export default UserForm;
