import React from 'react'
import { Link } from 'react-router-dom'

const FalseForm = ({ errorMsg }) => {
  return (
    <div className="container complete mt-5 mb-5">
      <div className="form-container complete">
        <h2 className="text-center color_main">예약 실패</h2>
        <hr className="completeHr" />
        <p className="text-center">회원님의 예약이 실패되었습니다</p>
        <p className="text-center">실패 사유</p>
        <p className="text-center">{errorMsg}</p>
        <div className="d-flex gap-5">
          <Link to="/service" className="btn btn-primary sessuce color_main">다시하기</Link>
          <Link to="/" className="btn btn-primary sessuce color_main">메인화면</Link>
        </div>
      </div>
    </div>
  )
}

export default FalseForm