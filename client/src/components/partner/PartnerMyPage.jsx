import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Sidebar from '../../components/static/Sidebar'

const PartnerMypage = ({ partnerData }) => {

  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
      setIsOpen(!isOpen)
  }

  if (!partnerData) {
    return <div>Loading...</div>; // partnerData가 없을 때 로딩 상태 표시
  }

  const { userId, userName, userPhone, userEmail, userAddress, userBirth, introduce, userNo } = partnerData;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) month = `0${month}`;
    let day = date.getDate();
    if (day < 10) day = `0${day}`;
    return `${year}-${month}-${day}`;
  };

  return (
    
      <main className="container-fluid container">
        <div className="row">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} roles={{ isPartner: true }} />
          <div className="col-md-9 col-lg-10 form-section">
            <h3>내 정보 변경</h3>
            <form>
              <div className="form-group mb-3">
                <label htmlFor="userid">아이디</label>
                <input type="text" className="form-control" id="userid" value={userId} disabled />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="userName">이름</label>
                <input type="text" className="form-control" id="userName" value={userName} readOnly />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="userPhone">전화번호</label>
                <input type="text" className="form-control" id="userPhone" value={userPhone} readOnly />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="userEmail">이메일</label>
                <input type="text" className="form-control" id="userEmail" defaultValue={userEmail} readOnly name="userEmail" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="userAddress">주소</label>
                <input type="text" className="form-control" id="userAddress" defaultValue={userAddress} readOnly />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="userBirth">생년월일</label>
                <input type="date" className="form-control" id="userBirth" value={formatDate(userBirth)} readOnly />
              </div>
              <div className="form-group form-section p-1 f-warp text-start">
                <label htmlFor="description">소개 글</label>
                <textarea className="form-control w-75 input-readonly" id="description" rows="3" value={introduce} readOnly></textarea>
              </div>
              <div className="form-buttons">
                <Link to={`/partner/partnerUpdate/${userNo}`} className="btn btn-primary">정보 수정</Link>
              </div>
            </form>
          </div>
        </div>
  </main>
  );
};

export default PartnerMypage;
