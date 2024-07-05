import React from 'react';
import ReservLabel from './ReservLabel';

const ReservationForm = ({ reservationData }) => (
    
    <div className="card">
        <div className="card-body">
            <form>
                <div className="row info-row">
                    <ReservLabel htmlFor="requester" className="col-3 label">요청자</ReservLabel>
                    <div className="col-9">
                        <input type="text" name="userName" className="form-control" value={reservationData.user.userName} readOnly />
                    </div>
                </div>
                <div className="row info-row">
                    <ReservLabel htmlFor="requester" className="col-3 label">예약 제목</ReservLabel>
                    <div className="col-9">
                        <input type="text" name="title" className="form-control" value={reservationData.orders.title} readOnly />
                    </div>
                </div>
                <div className="row info-row">
                    <ReservLabel htmlFor="request" className="col-3 label">예약번호</ReservLabel>
                    <div className="col-9">
                        <input type="text" name="ordersNo" className="form-control" value={reservationData.orders.ordersNo} readOnly />
                    </div>
                </div>
                <div className="row info-row">
                    <ReservLabel htmlFor="date" className="col-3 label">일시</ReservLabel>
                    <div className="col-9">
                        <input type="text" name="serviceDate" className="form-control" value={reservationData.payments.serviceDate} readOnly />
                    </div>
                </div>
                <div className="row info-row">
                    <ReservLabel htmlFor="amount" className="col-3 label">금액</ReservLabel>
                    <div className="col-9">
                        <input type="text" name="totalPrice" className="form-control" value={reservationData.orders.totalPrice} readOnly />
                    </div>
                </div>
                <div className="row info-row">
                    <ReservLabel htmlFor="address" className="col-3 label">사용자 주소</ReservLabel>
                    <div className="col-9">
                        <input type="text" name="userAddress" className="form-control" value={reservationData.payments.serviceAddress} readOnly />
                    </div>
                </div>
                <div className="row info-row">
                    <ReservLabel htmlFor="phone" className="col-3 label">사용자 전화번호</ReservLabel>
                    <div className="col-9">
                        <input type="text" name="userPhone" className="form-control" value={reservationData.user.userPhone} readOnly />
                    </div>
                </div>
            </form>
        </div>
    </div>
);

export default ReservationForm;
