import React from 'react'

// 날짜 형식을 yyyy-MM-dd로 변환하는 함수
const formatDateForInput = (dateTimeString) => {
  if (!dateTimeString) return '';

  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};


const UserForm = ({ userDetails, handleInputChange, disabled }) => {
  console.log('UserForm Details:', userDetails);
  return (
    <form>
      <div className="form-group mb-3">
        <label htmlFor="userId">아이디</label>
        <input type="text" className="form-control" id="userId" value={userDetails.userId || ''} disabled />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="userName">이름</label>
        <input type="text" className="form-control" id="userName" value={userDetails.userName || ''} onChange={handleInputChange} disabled={disabled} />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="userPhone">전화번호</label>
        <input type="text" className="form-control" id="userPhone" value={userDetails.userPhone || ''} onChange={handleInputChange} disabled={disabled} />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="userEmail">이메일</label>
        <input type="text" className="form-control" id="userEmail" value={userDetails.userEmail || ''} onChange={handleInputChange} disabled={disabled} />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="userAddress">주소</label>
        <input type="text" className="form-control" id="userAddress" value={userDetails.userAddress || ''} onChange={handleInputChange} disabled={disabled} />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="userBirth">생년월일</label>
        <input type="date" className="form-control" id="userBirth" value={formatDateForInput(userDetails.userBirth) || ''} onChange={handleInputChange} disabled={disabled} />
      </div>
    </form>
  );
};

export default UserForm;
