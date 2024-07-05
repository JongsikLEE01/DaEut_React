import React from 'react'

const ReadInfo = () => {
  return (
    <>
      <div className="reservation-status section" id="reservation-status">
      </div>
      <div className="refund-policy section" id="refund-policy">
        <h4 className="reservation-intro3">환불 안내</h4>
        <hr className="section-underbar" />
      <p className="refund-legacy">
        <span style={{ color: 'red' }}>당일 취소 및 반복적인 예약 취소는 파트너 보호를 위해 이용에 제한을 받을 수 있습니다.</span>
        <br /><br />
        소비자 권리 보호 및 분쟁 해결 기준에 따라 결제 후 2시간 이내 취소 시 전액 환불이 가능합니다.(단, 이용시간 전까지만 가능합니다.)
        <br /><br />이용 8일 전 총 금액의 100% 환불이 가능합니다.
        <br /><br />
        <span style={{ color: 'red' }}>이용 7일 전부터 취소 시 환불이 불가능합니다.</span>
        <br /><br />
        </p>
      </div>
    </>
  )
}

export default ReadInfo