import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Swal from '../../apis/alert'

// const UserCancelForm = () => {
const UserCancelForm = ({ order, ordersNo, onCancel }) => {
    const navigate = useNavigate()
    const [cancelAccount, setCancelAccount] = useState('')
    const [cancelName, setCancelName] = useState('')
    const [cancelNumber, setCancelNumber] = useState('')
    const [reason, setReason] = useState('')

    const onSunmit = () => {
      if(!cancelName || !cancelAccount || !cancelNumber || !reason){
        Swal.alert('모든 입력 값을 입력해주세요', '선택되지 않은 입력 값이 있어요. 선택해주세요.', 'warning')
      return
      }
      // 취소 처리 로직 구현
      console.log('취소 요청', 
        {
            ordersNo: ordersNo,
            cancelAccount,
            cancelName,
            cancelNumber,
            reason
        })

      onCancel(ordersNo, cancelAccount, cancelName, cancelNumber, reason)
    }

    // 뒤로가기
    const onBack = () =>{
      Swal.confirm('정말 취소하시겠습니까?', '지금 결제를 취소 할 경우 현재 저장된 입력한 값이 모두 사라집니다.', 'warning',(result) => {
        // isConfirmed : 확인 버튼 클릭 여부
        if(result.isConfirmed){
          navigate("/service")
        }
      })
    }
    
  
    return (
      <div className="col-md-9 col-lg-10 form-section">
        <h3>예약 취소</h3>
        <br />
          <div className="mb-5">
            <label htmlFor="title">예약 내역</label>
            <span className="ms-5">{order.title}</span>
          </div>
          <div className="mb-5">
            <label htmlFor="ordersNo">예약 번호</label>
            <span className="ms-5">{ordersNo}</span>
          </div>
          <div className="form-group mb-5">
            <label htmlFor="cancelAccount">환불 은행</label>
            <select
              name="cancelAccount"
              id="cancelAccount"
              className="form-select w-25"
              value={cancelAccount}
              onChange={(e) => setCancelAccount(e.target.value)}
              required
            >
              <option value="">--선택--</option>
              <option value="SC제일은행">SC제일은행</option>
              <option value="경남은행">경남은행</option>
              <option value="광주은행">광주은행</option>
              <option value="국민은행">국민은행</option>
              <option value="기업은행">기업은행</option>
              <option value="농협중앙회">농협중앙회</option>
              <option value="대구은행">대구은행</option>
              <option value="부산은행">부산은행</option>
              <option value="산업은행">산업은행</option>
              <option value="상호신용금고">상호신용금고</option>
              <option value="새마을금고">새마을금고</option>
              <option value="수협중앙회">수협중앙회</option>
              <option value="신한은행">신한은행</option>
              <option value="신협중앙회">신협중앙회</option>
              <option value="외환은행">외환은행</option>
              <option value="우리은행">우리은행</option>
              <option value="우체국">우체국</option>
              <option value="전북은행">전북은행</option>
              <option value="제주은행">제주은행</option>
              <option value="하나은행">하나은행</option>
              <option value="한국씨티은행">한국씨티은행</option>
              <option value="카카오뱅크">카카오뱅크</option>
            </select>
  
            <label htmlFor="cancelName" className="ms-5">예금주</label>
            <input
              type="text"
              className="form-control"
              name="cancelName"
              id="cancelName"
              value={cancelName}
              onChange={(e) => setCancelName(e.target.value)}
              placeholder="예금주를 입력해주세요"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="cancelNumber">계좌 번호</label>
            <input
              type="text"
              className="form-control"
              name="cancelNumber"
              id="cancelNumber"
              value={cancelNumber}
              onChange={(e) => setCancelNumber(e.target.value)}
              placeholder="계좌번호를 입력해주세요('-' 제외)"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="reason" className="form-label">취소 사유</label>
            <textarea
              className="form-control"
              id="reason"
              name="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="3"
              placeholder="취소 사유를 입력해주세요"
              required
            ></textarea>
          </div>
            <button type="button" onClick={onSunmit} className="btn btn-primary sessuce color_main">환불하기</button>
            <button onClick={onBack} className="btn btn-primary cancel color_main mx-5">취소하기</button>
      </div>
    )
  }

export default UserCancelForm