import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/static/Sidebar'

const PartnerReservation = ({ orderList }) => {
 
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
      setIsOpen(!isOpen)
  }

  const handleDetailClick = (ordersNo) => {
    window.location.href = `/partner/reservationRead/${ordersNo}`;
  };

  console.log("component- oderList  : " + orderList.ordersNo);

  return (
    <div className="container-fluid container">
      <button className="btn btn-primary toggle-btn menu mt-2 myBtn d-md-none transitionNone" id="toggle-btn" onClick={toggleSidebar}>메뉴</button>

      <main className="container-fluid container">
        <div className="row">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} roles={{ isPartner: true }} />
          <div className="col-md-9 col-lg-10 form-section">
            <h3>예약 관리</h3>
            {orderList && orderList.length > 0 ? (
              <table className="table table-sm table-hover">
                <thead className="table-light">
                  <tr>
                    <th width="30">No.</th>
                    <th width="50">사용자 명</th>
                    <th width="80">예약 상태</th>
                    <th width="100">예약 시간</th>
                    <th width="50"></th>
                  </tr>
                </thead>
                <tbody>
                  {orderList.map((order, index) => (
                    <tr key={order.ordersNo}>
                      <td data-label="No.">{index + 1}</td>
                      <td data-label="사용자 명">{order.user.userName}</td>
                      <td data-label="예약 상태">{order.orderStatus}</td>
                      <td data-label="예약 시간">{new Date(order.payment.serviceDate).toLocaleString()}</td>
                      <td data-label="자세히보기">
                      <button className="detail-button" onClick={() => handleDetailClick(order.ordersNo)}>자세히보기</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ marginTop: '70px' }}>예약이 없습니다.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PartnerReservation;
