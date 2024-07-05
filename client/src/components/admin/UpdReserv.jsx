import React from 'react';
import { Link } from 'react-router-dom';

const UpdReserv = ({ reservationData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="row info-row">
        <label htmlFor="requester" className="col-3 label">요청자</label>
        <div className="col-9">
          <input type="text" name="userName" className="form-control" value={reservationData.user.userName} readOnly />
        </div>
      </div>
      <div className="row info-row">
        <label htmlFor="requester" className="col-3 label">예약 제목</label>
        <div className="col-9">
          <input type="text" name="title" className="form-control" value={reservationData.orders.title} readOnly />
        </div>
      </div>
      <div className="row info-row">
        <label htmlFor="request" className="col-3 label">예약번호</label>
        <div className="col-9">
          <input type="text" name="ordersNo" className="form-control" value={reservationData.orders.ordersNo} readOnly />
        </div>
      </div>
      <div className="row info-row">
        <label htmlFor="date" className="col-3 label">일시</label>
        <div className="col-9 d-flex align-items-center">
          <input type="date" name="serviceDay" className="form-control me-2" value={reservationData.serviceDay || ''} onChange={handleChange} />
          <input type="time" name="serviceTime" className="form-control" value={reservationData.serviceTime || ''} onChange={handleChange} />
        </div>
      </div>
      <div className="row info-row">
        <label htmlFor="amount" className="col-3 label">금액</label>
        <div className="col-9">
          <input type="number" name="totalPrice" className="form-control" value={reservationData.totalPrice || reservationData.orders.totalPrice} onChange={handleChange} />
        </div>
      </div>
      <div className="row info-row">
        <label htmlFor="address" className="col-3 label">사용자 주소</label>
        <div className="col-9">
          <input type="text" name="serviceAddress" className="form-control" value={reservationData.serviceAddress || reservationData.payments.serviceAddress} onChange={handleChange} />
        </div>
      </div>
      <div className="buttons mt-5">
        <button type="submit" className="btn btn-primary custom1 size">수정</button>
        <Link to="/admin/adminReservation" className="btn btn-primary custom2 size">목록</Link>
      </div>
    </form>
  );
};

export default UpdReserv;
