import React from 'react';
import { Link } from 'react-router-dom'; // React Router의 Link 임포트

const PartnerMypage = ({ user, partner }) => {
  return (
    <div className="container-fluid container">
      <button className="btn btn-primary toggle-btn menu mt-2 ml-2 myBtn" id="toggle-btn" onClick={toggleSidebar}>메뉴</button>
      <main className="container-fluid container">
        <div className="row">
          <nav className="col-md-3 col-lg-2 sidebar" id="sidebar">
            <button className="btn btn-danger d-block d-md-none cancel" onClick={toggleSidebar}>닫기</button>
            <h5>마이페이지</h5>
            <br />
            <Link to="/partner/partnerMypage" className="active partnerMypage">내 정보 변경</Link>
            <Link to="/partner/partnerReservation" className="partnerReservation">내 예약 보기</Link>
            <Link to="/partner/partnerReview">내 리뷰 보기</Link>
            <Link to="/partner/partnerChatRoom">채팅 내역</Link>
          </nav>
          <div className="col-md-9 col-lg-10 form-section">
            <h3>내 정보 변경</h3>
            <form>
              <input type="hidden" name="userId" value={user.userId} />
              <input type="hidden" name="userNo" value={user.userNo} />
              <input type="hidden" name="introduce" value={partner.introduce} />
              <div className="form-group mb-3">
                <label htmlFor="userid">아이디</label>
                <input type="text" className="form-control" id="userid" value={user.userId} disabled />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="userName">이름</label>
                <input type="text" className="form-control" id="userName" value={user.userName} readOnly />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="userPhone">전화번호</label>
                <input type="text" className="form-control" id="userPhone" value={user.userPhone} readOnly />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="userEmail">이메일</label>
                <input type="text" className="form-control" id="userEmail" defaultValue={user.userEmail} name="userEmail" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="userAddress">주소</label>
                <input type="text" className="form-control" id="userAddress" defaultValue={user.userAddress} readOnly />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="userBirth">생년월일</label>
                <input type="date" className="form-control" id="userBirth" value={formatDate(user.userBirth)} readOnly />
              </div>
              <div className="form-group form-section p-1 f-warp text-start">
                <label htmlFor="description">소개 글</label>
                <textarea className="form-control w-75 input-readonly" id="description" rows="3" value={partner.introduce} readOnly></textarea>
              </div>
              <div className="form-buttons">
                <Link to={`/partner/partnerMypageUpdate?userNo=${partner.userNo}`} className="btn btn-primary">정보 수정</Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

const toggleSidebar = () => {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('d-none');
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) month = `0${month}`;
  let day = date.getDate();
  if (day < 10) day = `0${day}`;
  return `${year}-${month}-${day}`;
};

export default PartnerMypage;
