import React, { useEffect, useState } from 'react';
import UserLayout from '../../layouts/UserLayout';
import '../../components/user/user.css';

const UserReservation = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // 하드코딩된 예약 데이터
        const hardcodedOrders = [
            {
                ordersNo: '12345',
                orderStatus: 'CONFIRMED',
                serviceAddress: '서울시 강남구 역삼동',
                regDate: '2024-06-01T14:00:00',
                serviceName: '청소 서비스',
                totalPrice: 50000,
                partnerName: '파트너1',
                userName: '테스트 유저'
            }
        ];
        setOrders(hardcodedOrders);
    }, []);

    const handleCancel = (ordersNo) => {
        // 예약 취소 로직 추가 (API 요청 등)
        console.log('Reservation cancelled:', ordersNo);
        alert('예약이 성공적으로 취소되었습니다.');
        setOrders(orders.filter(order => order.ordersNo !== ordersNo));
    };

    return (
        <UserLayout>
            <div className="col-md-9 col-lg-10 form-section">
                <h3>내 예약 보기</h3>
                {orders.map((order, index) => (
                    <div className="border border-1 m-3 mb-5 p-5 rounded-2" key={order.ordersNo}>
                        {index === 0 && <h4>{order.userName}님의 예약 내역</h4>}
                        <br />
                        <div className="form-group mb-3">
                            <label htmlFor="staticOrdersNo" className="col-sm-2 col-form-label">주문 번호</label>
                            <div className="col-sm-10">
                                <div id="staticOrdersNo" className="custom-text">{order.ordersNo}</div>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="staticOrderStatus" className="col-sm-2 col-form-label">주문 상태</label>
                            <div className="col-sm-10">
                                <span className="custom-text" style={{ color: getStatusColor(order.orderStatus) }}>
                                    {getStatusText(order.orderStatus)}
                                </span>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="staticLocation" className="col-sm-2 col-form-label">위치</label>
                            <div className="col-sm-10">
                                <div id="staticLocation" className="custom-text">{order.serviceAddress}</div>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="staticSchedule" className="col-sm-2 col-form-label">일정</label>
                            <div className="col-sm-10">
                                <div id="staticSchedule" className="custom-text">{formatDate(order.regDate)}</div>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="staticService" className="col-sm-2 col-form-label">서비스</label>
                            <div className="col-sm-10">
                                <div id="staticService" className="custom-text">{order.serviceName}</div>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="staticAmount" className="col-sm-2 col-form-label">결제 금액</label>
                            <div className="col-sm-10">
                                <div id="staticAmount" className="custom-text">{order.totalPrice}원</div>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="staticPartner" className="col-sm-2 col-form-label">파트너</label>
                            <div className="col-sm-10">
                                <div id="staticPartner" className="custom-text">{order.partnerName}</div>
                            </div>
                        </div>
                        {order.orderStatus === 'CONFIRMED' && (
                            <div className="form-buttons">
                                <button onClick={() => handleCancel(order.ordersNo)} className="btn btn-danger">예약 취소</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </UserLayout>
    );
};

const getStatusText = (status) => {
    switch (status) {
        case 'PENDING':
            return '보류';
        case 'PAID':
            return '결제 완료';
        case 'CONFIRMED':
            return '확정 완료';
        case 'CANCELLED':
            return '환불(결제 취소)';
        default:
            return status;
    }
};

const getStatusColor = (status) => {
    switch (status) {
        case 'PENDING':
            return 'green';
        case 'PAID':
            return 'orange';
        case 'CONFIRMED':
            return 'blue';
        case 'CANCELLED':
            return 'red';
        default:
            return 'black';
    }
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
};

export default UserReservation;
