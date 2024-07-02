import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ toggleSidebar }) => {
  return (
    <nav className="col-md-3 col-lg-2 sidebar" id="sidebar">
      <button className="btn btn-danger d-block d-md-none cancel" onClick={toggleSidebar}>닫기</button>
      <h5>마이페이지</h5>
      <br />
      <Link to="/user/userMypage" className="userMypage">내 정보 변경</Link>
      <Link to="/user/userReservation">내 예약 보기</Link>
      <Link to="/user/userReview">별점 및 리뷰 작성</Link>
      <Link to="/user/userChatRoom">채팅 내역</Link>
      <Link to="/user/userPartner">파트너 신청</Link>
      <Link to="/user/userCart">장바구니</Link>
    </nav>
  );
};

export default Sidebar;
