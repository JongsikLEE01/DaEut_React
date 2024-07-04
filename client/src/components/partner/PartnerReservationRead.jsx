import React from 'react';

const PartnerReservation = ({ reservationRead, order, payment, service }) => {
    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('d-none');
      };
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString('ko-KR', options);
    };

    return (
        <div>
            <button className="btn btn-primary toggle-btn menu mt-2 ml-2 myBtn" id="toggle-btn" onClick={toggleSidebar}>
                메뉴
            </button>

            <main className="container-fluid container">
                <div className="row">
                    <nav className="col-md-3 col-lg-2 sidebar" id="sidebar">
                        <button className="btn btn-danger d-block d-md-none cancel" onClick={toggleSidebar}>
                            닫기
                        </button>
                        <h5>마이페이지</h5>
                        <br />
                        <a href="/partner/partnerMypage" className="active">
                            내 정보 변경
                        </a>
                        <a href="/partner/partnerReservation" className="partnerReservation">
                            내 예약 보기
                        </a>
                        <a href="/partner/partnerReview">내 리뷰 보기</a>
                        <a href="/partner/partnerChatRoom">채팅 내역</a>
                    </nav>
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
                                        {payment.serviceAddress}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="staticSchedule" className="col-sm-2 col-form-label">
                                    일정
                                </label>
                                <div className="col-sm-10">
                                    <div id="staticSchedule" className="custom-text">
                                        {formatDate(payment.serviceDate)}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="staticService" className="col-sm-2 col-form-label">
                                    내역
                                </label>
                                <div className="col-sm-10">
                                    <div id="staticService" className="custom-text">
                                        {service.serviceName}
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

export default PartnerReservation;

