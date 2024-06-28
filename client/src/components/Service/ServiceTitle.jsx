import React from 'react'
import { Link } from 'react-router-dom'

// const ServiceTitle = ({ isPartner, isUser, isAdmin }) => {
const ServiceTitle = () => {
  return (
    <div className="reservationTitles">
      <h3 className="reservation-title">생활 속 편리함</h3>
      <div className="reservation-container">
        <h2 className="reservation-subtitle">깔끔한 생활 도우미 예약 서비스</h2>
        {/* {isPartner && isUser && !isAdmin && ( */}
          <Link to="/reservation/reservationInsert" className="reservation-insert-link">
            <button className="sessuce">글쓰기</button>
          </Link>
        {/* )} */}
      </div>
    </div>
  );
};

export default ServiceTitle
