import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const PartnerSideBar = ({ isOpen, toggleSidebar, partnerNo }) => {
    const location = useLocation();

    const getLinkProps = (path, baseClass) => {
        return location.pathname === path ? { className: baseClass } : {};
    };

    return (
        <nav className={`col-md-3 col-lg-2 sidebar ${isOpen ? 'active' : ''}`} id="sidebar">
            <button className="btn btn-danger d-md-none cancel" onClick={toggleSidebar}>닫기</button>
            <h5>마이페이지</h5>
            <br />
            <Link to="/partner/partnerMypage" {...getLinkProps('/partner/partnerMypage', 'active')}>내 정보 변경</Link>
            <Link to={`/partner/partnerReservation/${partnerNo}`} {...getLinkProps(`/partner/reservation/${partnerNo}`, '')}>내 예약 보기</Link>
            <Link to={`/partner/reviews/${partnerNo}`} {...getLinkProps(`/partner/reviews/${partnerNo}`, '')}>내 리뷰 보기</Link>
            <Link to="/partner/partnerChatRoom" {...getLinkProps('/partner/partnerChatRoom', '')}>채팅 내역</Link>
        </nav>
    );
};

export default PartnerSideBar;
