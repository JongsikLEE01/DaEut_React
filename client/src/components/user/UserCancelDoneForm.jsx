import React from 'react'
import { Link } from 'react-router-dom';

const UserCancelDoneForm = ({ cancel }) => {
    return (
        <div className="container complete">
          <div className="form-container complete">
            <h2 className="text-center color_main">예약 취소</h2>
            <p className="text-center">예약 번호</p>
            <p className="text-center">{cancel.ordersNo}</p>
            <p className="text-center">환불 금액</p>
            <p className="text-center">{cancel.cancelAmount} 원</p>
            <p className="text-center">환불 계좌</p>
            <p className="text-center">{cancel.cancelAccount} {cancel.cancelNumber}</p>
            <hr className="completeHr" />
            <p className="text-center">회원님의 예약이 성공적으로 취소되었습니다.</p>
            <p className="text-center">취소 승인까지 1~2 영업일이 소요될 수 있습니다.</p>
    
            <div className="d-flex gap-5">
              <Link to={'/'} className="btn btn-primary sessuce color_main">메인화면</Link>
            </div>
          </div>
        </div>
      );
    }

export default UserCancelDoneForm