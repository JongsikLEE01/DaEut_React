import React, { useState } from 'react'

const ReadContent = ({ service, onInsert, onPayment }) => {
  
  // 장바구니 추가
  const onSubmit=()=>{
    // 유저번호 가져오기 수정 필요
    const userNo = 1
    const serviceNo = service.serviceNo
    let check = window.confirm(`장바구니에 추가하시겠습니까? `)
    if(!check) return

    onInsert(userNo, serviceNo)
  }

  // 바로 주문
  const onPay=()=>{
    // 유저 번호 수정 필요
    const userNo = 1
    const serviceNo = [service.serviceNo]
    const quantity = [1]
    let check = window.confirm(`바로 주문하시겠습니까?`)
    if(!check) return

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

              {/* <td>
                <button className="reservation-calender">바로 예약하기</button>
              </td>

              <td>
                <button className="reservation-paybutton">장바구니 담기</button>
              </td> */}

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
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default ReadContent
