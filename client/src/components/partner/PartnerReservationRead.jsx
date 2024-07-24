import React, { useContext } from 'react';
import Sidebar from '../../components/static/Sidebar';
import { Link, useLocation } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContextProvider';

const PartnerReservationRead = ({ reservationRead }) => {
  
  const location = useLocation();
  const { userInfo } = useContext(LoginContext);

  const getLinkProps = (path, baseClass) => {
      return location.pathname.startsWith(path) ? { className: `${baseClass} active` } : { className: baseClass };
  };

  console.log('Received reservationRead:', reservationRead);

  const [isOpen, setIsOpen] = React.useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
    <main className="container-fluid container">
      <div className="row">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} roles={{ isPartner: true }} />
        <div className="col-md-9 col-lg-10 form-section">
          <h3>요청자 예약 보기</h3>
          <form>
            <div>
              <h4>{`${order.user.userName} 님의 예약 현황`}</h4>
            </div>
            <br />
            <div className="form-group mb-3">
              <label htmlFor="staticLocation" className="col-sm-2 col-form-label">위치</label>
              <div className="col-sm-10">
                <div id="staticLocation" className="custom-text">
                  {payments.serviceAddress}
                </div>
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="staticSchedule" className="col-sm-2 col-form-label">일정</label>
              <div className="col-sm-10">
                <div id="staticSchedule" className="custom-text">
                  {formatDate(payments.serviceDate)}
                </div>
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="staticService" className="col-sm-2 col-form-label">내역</label>
              <div className="col-sm-10">
                <div id="staticService" className="custom-text">
                  {services && services.length > 0 ? services[0].serviceName : '서비스 정보가 없습니다.'}
                </div>
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="staticAmount" className="col-sm-2 col-form-label">결제 금액</label>
              <div className="col-sm-10">
                <div id="staticAmount" className="custom-text">
                  {order.totalPrice}
                </div>
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="staticPartner" className="col-sm-2 col-form-label">요청자 명</label>
              <div className="col-sm-10">
                <div id="staticPartner" className="custom-text">
                  {order.user.userName}
                </div>
              </div>
            </div>

            <div className="form-buttons">
            <Link to="/partner/partnerChatRoom" {...getLinkProps('/partner/partnerChatRoom', 'partnerChatRoom')}  className="btn btn-primary">채팅 내역</Link>
                <Link 
                to={`/partner/reservation/${userInfo?.partnerNo}`} 
                {...getLinkProps('/partner/reservation', 'partnerReservation')} 
                className="btn btn-primary"
              >
                돌아가기
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default PartnerReservationRead;
