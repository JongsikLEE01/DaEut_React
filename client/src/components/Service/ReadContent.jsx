import React, { useContext, useState } from 'react'
import * as Swal from '../../apis/alert'
import { LoginContext } from '../contexts/LoginContextProvider'

const ReadContent = ({ service, onInsert, onPayment }) => {
  const { isLogin, userInfo } = useContext(LoginContext)

  // 로그인 확인
  const onCheckLogin =  () => {
    Swal.confirm('로그인이 필요한 서비스', '로그인이 필요한 서비스입니다. 로그인 후 다시 시도해주세요.', 'warning' )
  }


  // 장바구니 추가
  const onSubmit=()=>{
    const userNo = userInfo.userNo
    const serviceNo = service.serviceNo

    onInsert(userNo, serviceNo)
  }

  // 바로 주문
  const onPay=()=>{
    const userNo = userInfo.userNo
    const serviceNo = [service.serviceNo]
    const quantity = [1]

    onPayment(userNo, serviceNo, quantity)
  }

  return (
    <div className="box-form-right">
      <div className="partner-service-list">
        <table className="partner-service-table">

          <tbody>
            <tr>
              <td style={{ width: '65px' }}>가격 :</td>
              <td>{service.servicePrice}</td>
            </tr>
            <tr>
              <td style={{ width: '65px' }}>설명 :</td>
              <td>{service.serviceContent}</td>
            </tr>
          </tbody>

          <tfoot>
            <tr className="reservation-buttons">
              {
                isLogin ?
                <>
                  <td>
                    <button className="reservation-calender" id="couponBtn" onClick={onPay}>
                      바로 예약하기
                    </button>
                  </td>

                  <td>
                    <button className="reservation-calender" onClick={onSubmit}>
                      장바구니 담기
                    </button>
                  </td>
                </>
                :
                <>
                  <td>
                    <button className="reservation-calender" id="couponBtn" onClick={onCheckLogin}>
                      바로 예약하기
                    </button>
                  </td>

                  <td>
                    <button className="reservation-calender" onClick={onCheckLogin}>
                      장바구니 담기
                    </button>
                  </td>
                </>
              }
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default ReadContent
