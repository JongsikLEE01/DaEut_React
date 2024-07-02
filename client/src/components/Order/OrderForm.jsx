import React, { useState } from 'react'

const OrderForm = ({ orders }) => {
  const [serviceDate, setServiceDate] = useState('');
  const [serviceTime, setServiceTime] = useState('');
  const [userPost, setUserPost] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userAddressDetail, setUserAddressDetail] = useState('');
  const handlePayment = () => {
    // 여기서 결제 처리 로직을 추가할 수 있음
    // 예: validateForm(), 결제 처리 API 호출 등
    console.log('결제하기 버튼 클릭');
  };

  const handleCancel = () => {
    // 취소 처리 모달 열기 등의 로직 추가
    console.log('취소하기 버튼 클릭');
  };
  
  return (
    <>
      <div className="py-5 text-center">
        <h2 className="color_main size_4rem">결제 화면</h2>
        <p className="lead">{orders.title}</p>
      </div>

      <div className="row g-5 flex-row-reverse">
        <div className="col-md-5 col-lg-4 orders-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="color_main">주문 내역</span>
          </h4>
          <ul className="list-group mb-3">
            {/* {orders.orderItems.map((orderItem, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">{orderItem.service.serviceName}</h6>
                  <small className="text-body-secondary">{orderItem.service.serviceContent}</small>
                </div>
                <span className="text-body-secondary">&#8361; {orderItem.price.toLocaleString()} 원</span>
              </li>
            ))} */}
            <li className="list-group-item d-flex justify-content-between">
              <span>총 가격 (원)</span>
              {/* <strong id="paymentPrice">&#8361; {orders.totalPrice.toLocaleString()} 원</strong> */}
              <strong id="paymentPrice">&#8361; {132} 원</strong>
            </li>
          </ul>
        </div>
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3 color_sub2">예약 정보</h4>
          <form className="needs-validation" noValidate>
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="userName" className="form-label">이름</label>
                {/* <input type="text" className="form-control" id="userName" placeholder="이름" value={userName} onChange={(e) => setUserName(e.target.value)} required /> */}
                <input type="text" className="form-control" id="userName" placeholder="이름" value={'김조은'} required />
              </div>

              <div className="col-12">
                <label htmlFor="serviceDate" className="form-label">서비스 일정</label>
                <input type="date" className="form-control" id="serviceDate" placeholder="일정" value={serviceDate} onChange={(e) => setServiceDate(e.target.value)} required />
              </div>

              <div className="col-12">
                <label htmlFor="serviceTime" className="form-label">서비스 시간</label>
                <input type="time" className="form-control" id="serviceTime" placeholder="일정" value={serviceTime} onChange={(e) => setServiceTime(e.target.value)} required />
              </div>

              <div className="col-12">
                <label htmlFor="userEmail" className="form-label">이메일</label>
                {/* <input type="email" className="form-control" id="userEmail" placeholder="daeut@example.com" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} /> */}
                <input type="email" className="form-control" id="userEmail" placeholder="daeut@example.com" value={'ddd@dd.dd'}  />
              </div>

              <div className="col-md-12">
                <label htmlFor="userPhone" className="form-label">전화번호</label>
                {/* <input type="text" className="form-control" id="userPhone" placeholder="전화번호를 입력해주세요" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} required /> */}
                <input type="text" className="form-control" id="userPhone" placeholder="전화번호를 입력해주세요" value={123}  required />
              </div>

              <div className="col-12">
                <label htmlFor="userPost" className="form-label">우편번호</label>
                <div className="input-group">
                  <input type="text" className="form-control" id="userPost" placeholder="우편번호" value={userPost} onChange={(e) => setUserPost(e.target.value)} required />
                  {/* <button type="button" className="btn btn-secondary myBtn" onClick={daumPostcode}>우편번호 찾기</button> */}
                  <button type="button" className="btn btn-secondary myBtn">우편번호 찾기</button>
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="userAddress" className="form-label">주소</label>
                {/* <input type="text" className="form-control" id="userAddress" placeholder="주소를 입력해주세요" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} required /> */}
                <input type="text" className="form-control" id="userAddress" placeholder="주소를 입력해주세요" value={123} required />
              </div>

              <div className="col-12">
                <label htmlFor="userAddressDetail" className="form-label">상세주소</label>
                {/* <input type="text" className="form-control" id="userAddressDetail" placeholder="상세주소를 입력해주세요" value={userAddressDetail} onChange={(e) => setUserAddressDetail(e.target.value)} required /> */}
                <input type="text" className="form-control" id="userAddressDetail" placeholder="상세주소를 입력해주세요" required />
              </div>

              <div className="d-flex justify-content-end gap-5 mb-3 mt-4 btn-container">
                <input type="hidden" name="ordersNo" id="ordersNo" value={orders.ordersNo} />
                <input type="hidden" name="totalPrice" id="totalPrice" value={orders.totalPrice} />
                <input type="hidden" name="title" id="title" value={orders.title} />
                <button className="btn btn-primary btn-lg sessuce color_main" type="button" onClick={handlePayment}>결제하기</button>
                <button className="btn btn-danger btn-lg cancel" type="button" data-bs-toggle="modal" data-bs-target="#cancelPaymentModel">취소하기</button>
              </div>
              {/* 결제 취소 Modal */}
              <div className="modal fade" id="cancelPaymentModel" tabIndex="-1" aria-labelledby="cancelPaymentModelLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="cancelPaymentModelLabel text-center">예약 취소</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-center">
                      <p>정말 예약을 취소하시겠습니까?</p>
                      <p>예약을 취소할 경우 저장된 값은 모두 사라집니다.</p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary myBtn" data-bs-dismiss="modal">닫기</button>
                      <a href="/reservation/reservationRead" className="btn btn-danger cancel">취소하기</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default OrderForm