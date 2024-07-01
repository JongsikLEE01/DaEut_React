import React from 'react';

const PartnerReservation = ({ orderList }) => {
  return (
    <div className="container-fluid container">
      <button className="btn btn-primary toggle-btn menu mt-2 myBtn d-md-none transitionNone" id="toggle-btn" onClick={toggleSidebar}>메뉴</button>

      <main className="container-fluid container">
        <div className="row">
          <nav className="col-md-3 col-lg-2 sidebar" id="sidebar">
            <button className="btn btn-danger d-block d-md-none cancel" onClick={toggleSidebar}>닫기</button>
            <h5>마이페이지</h5>
            <br />
            <a href="/partner/partnerMypage" className="active">내 정보 변경</a>
            <a href="/partner/partnerReservation" className="partnerReservation">내 예약 보기</a>
            <a href="/partner/partnerReview">내 리뷰 보기</a>
            <a href="/partner/partnerChatRoom">채팅 내역</a>
          </nav>
          <div className="col-md-9 col-lg-10 form-section">
            <h3>예약 관리</h3>
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
                    <td data-label="예약 시간">{new Date(order.payments.serviceDate).toLocaleString()}</td>
                    <td data-label="자세히보기">
                      <a href={`/partner/partnerReservationRead?ordersNo=${order.ordersNo}`} className="detail-button">자세히보기</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default PartnerReservation;
