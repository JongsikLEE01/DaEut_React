import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {formatDate} from '../../apis/format'

const DoneForm = ({ ordersNo, payments }) => {
  useEffect(() => {
    if (payments) {
      console.log(payments)
    }
  }, [payments])

  if (!payments) {
    return <div>Loading...</div>
  }
    
  return (
    <div className="container complete mt-5 mb-5">
      <div className="form-container complete">
        <h2 className="text-center color_main">예약 성공</h2>
        <p className="text-center">예약 번호</p>
        <p className="text-center">{ordersNo}</p>
        <p className="text-center">예약 시간</p>
        <p className="text-center">{formatDate(payments.serviceDate)}</p>
        <p className="text-center"></p>
        <hr className="completeHr" />
        <p className="text-center">회원님의 예약이 성공적으로 끝났습니다</p>
        <p className="text-center">깨끗한 집을 만들러갈게요!</p>
        <div className="d-flex gap-5">
          <Link to="/user/userReservation" className="btn btn-primary sessuce color_main">결제내역</Link>
          <Link to="/" className="btn btn-primary sessuce color_main">메인화면</Link>
        </div>
      </div>
    </div>
  )
}

export default DoneForm