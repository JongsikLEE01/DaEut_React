import React from 'react';

const UserReservationForm = ({ order, index }) => {
  return (
    <div className="border border-1 m-3 mb-5 p-5 rounded-2">
      {index === 0 && <h4>{order.userName}님의 예약 내역</h4>}
      <div className="form-group mb-3">
        <label>주문 번호</label>
        <div className="custom-text">{order.ordersNo}</div>
      </div>
      <div className="form-group mb-3">
        <label>주문 상태</label>
        <span className={`custom-text ${order.orderStatus.toLowerCase()}`}>
          {order.orderStatus}
        </span>
      </div>
      <div className="form-group mb-3">
        <label>위치</label>
        <div className="custom-text">{order.serviceAddress}</div>
      </div>
      <div className="form-group mb-3">
        <label>일정</label>
        <div className="custom-text">{new Date(order.regDate).toLocaleString('ko-KR')}</div>
      </div>
      <div className="form-group mb-3">
        <label>서비스</label>
        <div className="custom-text">{order.serviceName}</div>
      </div>
      <div className="form-group mb-3">
        <label>결제 금액</label>
        <div className="custom-text">{order.totalPrice}원</div>
      </div>
      <div className="form-group mb-3">
        <label>파트너</label>
        <div className="custom-text">{order.partnerName}</div>
      </div>
      {order.orderStatus === 'CONFIRMED' && (
        <div className="form-buttons">
          <button className="btn btn-danger">예약 취소</button>
        </div>
      )}
    </div>
  );
};

export default UserReservationForm;