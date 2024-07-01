import React from 'react';
import '../../components/user/user.css'; // CSS 파일 가져오기

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <nav className={`col-md-3 col-lg-2 sidebar ${isOpen ? 'active' : ''}`} id="sidebar">
            <button className="btn btn-danger d-md-none cancel" onClick={toggleSidebar}>닫기</button>
            <h5>마이페이지</h5>
            <br />
            <a href="/user/userMypage" className="userMypage">내 정보 변경</a>
            <a href="/user/userReservation">내 예약 보기</a>
            <a href="/user/userReview">별점 및 리뷰 작성</a>
            <a href="/user/userChatRoom">채팅 내역</a>
            <a href="/user/userPartner">파트너 신청</a>
            <a href="/user/userCart">장바구니</a>
        </nav>
    );
};

export default Sidebar;
