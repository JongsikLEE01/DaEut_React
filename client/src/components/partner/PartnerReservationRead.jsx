import React from 'react';

const PartnerReservationRead = ({ reservationRead }) => {
  console.log('Received reservationRead:', reservationRead);

  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('d-none');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  if (!reservationRead) {
    return <div>Loading...</div>;
  }

  const { order, payments, services } = reservationRead;

  return (
    <div>
      <button className="btn btn-primary toggle-btn menu mt-2 ml-2 myBtn" id="toggle-btn" onClick={toggleSidebar}>
        메뉴
      </button>

      <main className="container-fluid container">
        <div className="row">
          <div className="col-md-9 col-lg-10 form-section">
            <h3>요청자 예약 보기</h3>
            <form>
              <div>
                <h4>{`${order.user.userName} 님의 예약 현황`}</h4>
              </div>
              <br />
              <div className="form-group mb-3">
                <label htmlFor="staticLocation" className="col-sm-2 col-form-label">
                  위치
                </label>
                <div className="col-sm-10">
                  <div id="staticLocation" className="custom-text">
                    {payments.serviceAddress}
                  </div>
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="staticSchedule" className="col-sm-2 col-form-label">
                  일정
                </label>
                <div className="col-sm-10">
                  <div id="staticSchedule" className="custom-text">
                    {formatDate(payments.serviceDate)}
                  </div>
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="staticService" className="col-sm-2 col-form-label">
                  내역
                </label>
                <div className="col-sm-10">
                  <div id="staticService" className="custom-text">
                    {services.serviceName}
                  </div>
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="staticAmount" className="col-sm-2 col-form-label">
                  결제 금액
                </label>
                <div className="col-sm-10">
                  <div id="staticAmount" className="custom-text">
                    {order.totalPrice}
                  </div>
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="staticPartner" className="col-sm-2 col-form-label">
                  요청자 명
                </label>
                <div className="col-sm-10">
                  <div id="staticPartner" className="custom-text">
                    {order.user.userName}
                  </div>
                </div>
              </div>

              <div className="form-buttons">
                <a href="/reservation/chat" className="btn btn-primary">
                  문의 하기
                </a>
                <a href="/partner/partnerReservation" className="btn btn-primary mx-3">
                  돌아가기
                </a>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PartnerReservationRead;
