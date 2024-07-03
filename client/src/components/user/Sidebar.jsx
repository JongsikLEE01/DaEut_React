import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import '../../components/user/user.css'; // CSS 파일 가져오기

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();

    const getLinkProps = (path, baseClass) => {
        return location.pathname === path ? { className: baseClass } : {};
    };

    return (
        <nav className={`col-md-3 col-lg-2 sidebar ${isOpen ? 'active' : ''}`} id="sidebar">
            <button className="btn btn-danger d-md-none cancel" onClick={toggleSidebar}>닫기</button>
            <h5>마이페이지</h5>
            <br />
            <Link to="/user/userMypage" {...getLinkProps('/user/userMypage', 'userMypage')}>내 정보 변경</Link>
            <Link to="/user/userReservation" {...getLinkProps('/user/userReservation', 'userReservation')}>내 예약 보기</Link>
            <Link to="/user/userReview" {...getLinkProps('/user/userReview', 'userReview')}>별점 및 리뷰 작성</Link>
            <Link to="/user/userChatRoom" {...getLinkProps('/user/userChatRoom', 'userChatRoom')}>채팅 내역</Link>
            <Link to="/user/userPartner" {...getLinkProps('/user/userPartner', 'userPartner')}>파트너 신청</Link>
            <Link to="/user/userCart" {...getLinkProps('/user/userCart', 'userCart')}>장바구니</Link>
        </nav>
    );
};

export default Sidebar;
