import React from 'react';
import ReservLabel from './ReservLabel';

const RefundInfo = ({ refundData }) => {
    if (!refundData) {
        return null; // refundData가 null인 경우 아무것도 렌더링하지 않습니다.
    }

    const { cancelDate, cancelAmount, cancelAccount, cancelNumber, cancelName, reason } = refundData;

    return (
        <div className="card">
            <div className="card-body">
                <div className="row info-row">
                    <ReservLabel htmlFor="cancelDate" className="col-3 label">환불 일자</ReservLabel>
                    <div className="col-9">
                        <span className="form-control">{cancelDate || 'N/A'}</span>
                    </div>
                </div>
                <div className="row info-row">
                    <ReservLabel htmlFor="cancelAmount" className="col-3 label">환불 금액</ReservLabel>
                    <div className="col-9">
                        <span className="form-control">{cancelAmount || 'N/A'}</span>
                    </div>
                </div>
                <div className="row info-row">
                    <ReservLabel htmlFor="cancelInfo" className="col-3 label">환불 정보</ReservLabel>
                    <div className="col-9 d-flex">
                        <span className="form-control me-2 flex-fill">{cancelAccount || 'N/A'}</span>
                        <span className="form-control me-2 flex-fill">{cancelNumber || 'N/A'}</span>
                        <span className="form-control flex-fill">{cancelName || 'N/A'}</span>
                    </div>
                </div>
                <div className="row info-row">
                    <ReservLabel htmlFor="reason" className="col-3 label">취소 사유</ReservLabel>
                    <div className="col-9">
                        <textarea name="reason" className="form-control" readOnly>{reason || 'N/A'}</textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RefundInfo;
