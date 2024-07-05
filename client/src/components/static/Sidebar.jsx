import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/Sidebar.css';
import { LoginContext } from '../contexts/LoginContextProvider';

const Sidebar = ({ isOpen, toggleSidebar, roles }) => {
    const location = useLocation();

    const { userInfo } = useContext(LoginContext);

    const getLinkProps = (path, baseClass) => {
        return location.pathname === path ? { className: `${baseClass} active` } : { className: baseClass };
    };

    return (
        <>
            {isOpen ? 
                <button className="btn btn-danger d-block d-md-none close-btn" onClick={toggleSidebar}>닫기</button>
                :
                <button id="toggle-btn" className="btn btn-primary toggle-btn menu mt-2 myBtn d-md-none" onClick={toggleSidebar}>메뉴</button>
            }
            <nav className={`col-md-3 col-lg-2 sidebar ${isOpen ? 'active' : ''}`} id="sidebar">
                {roles.isAdmin ? (
                    <>
                        <h5>관리</h5>
                        <br />
                        <Link to="/admin/adminUser" {...getLinkProps('/admin/adminUser', 'userManage')}>회원 관리</Link>
                        <Link to="/admin/adminPartner" {...getLinkProps('/admin/adminPartner', 'partnerManage')}>파트너 관리</Link>
                        <Link to="/admin/adminReservation" {...getLinkProps('/admin/adminReservation', 'reservationManage')}>예약 관리</Link>
                    </>
                ) : roles.isPartner ? (
                    <>
                        <h5>마이페이지</h5>
                        <br />
                        <Link to={`/partnerMypage/${userInfo.userNo}`} {...getLinkProps('/partner/partnerMypage', 'partnerMypage')}>내 정보 변경</Link>
                        <Link to={`/partner/reservation/${userInfo.partnerNo}`} {...getLinkProps('/partner/reservation', 'partnerReservation')}>내 예약 보기</Link>
                        <Link to={`/partner/reviews/${userInfo.partnerNo}`} {...getLinkProps('/partner/review', 'partnerReview')}>내 리뷰 보기</Link>
                        <Link to="/partner/partnerChatRoom" {...getLinkProps('/partner/partnerChatRoom', 'partnerChatRoom')}>채팅 내역</Link>
                    </>
                ) : (
                    <>
                        <h5>마이페이지</h5>
                        <br />
                        <Link to="/user/userMypage" {...getLinkProps('/user/userMypage', 'userMypage')}>내 정보 변경</Link>
                        <Link to="/user/userReservation" {...getLinkProps('/user/userReservation', 'userReservation')}>내 예약 보기</Link>
                        <Link to="/user/userReview" {...getLinkProps('/user/userReview', 'userReview')}>별점 및 리뷰 작성</Link>
                        <Link to="/user/userChatRoom" {...getLinkProps('/user/userChatRoom', 'userChatRoom')}>채팅 내역</Link>
                        <Link to="/user/userPartner" {...getLinkProps('/user/userPartner', 'userPartner')}>파트너 신청</Link>
                        <Link to="/user/userCart" {...getLinkProps('/user/userCart', 'userCart')}>장바구니</Link>
                    </>
                )}
            </nav>
        </>
    );
};

export default Sidebar;
