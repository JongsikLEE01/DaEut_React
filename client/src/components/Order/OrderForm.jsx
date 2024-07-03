import React, { useContext, useEffect, useState } from 'react'
import DaumPostcode from "react-daum-postcode"
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom'
import * as Swal from '../../apis/alert'
import { LoginContext } from '../contexts/LoginContextProvider'

const OrderForm = ({ orders, orderItem }) => {
  const navigate = useNavigate()
  const [serviceDate, setServiceDate] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [serviceTime, setServiceTime] = useState('')
  const [userPost, setUserPost] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [userAddressDetail, setUserAddressDetail] = useState('')
  const [address, setAdderss] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { userInfo } = useContext(LoginContext)

  console.log(name);
  console.log(email);
  console.log(phone);

  const onCancel = () =>{
    Swal.confirm('정말 취소하시겠습니까?', '지금 결제를 취소 할 경우 현재 저장된 입력한 값이 모두 사라집니다.', 'warning',(result) => {
      // isConfirmed : 확인 버튼 클릭 여부
      if(result.isConfirmed){
        navigate("/service")
      }
    })
  }

  // 다음 주소 api
  const handlePostCode = (data) => {
    setUserPost(data.zonecode)
    setUserAddress(data.roadAddress)
    console.log(userPost);
    console.log(userAddress);

    setIsOpen(false)
  }

  // Modal 스타일
  const customStyles = {
    overlay: {
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
        left: "0",
        margin: "auto",
        width: "500px",
        height: "400px",
        padding: "0",
        overflow: "hidden",
    },
  }

  // Daem 모달 출력
  const onOpen = () =>{
    setIsOpen(!isOpen)
  }
  
  // 결제
  const onClickPayment = () => {
    if(!name || !email || !phone || !serviceDate || !serviceTime || !userPost || !userAddress || !userAddressDetail ){
      Swal.alert('모든 입력 값을 입력해주세요', '선택되지 않은 입력 값이 있어요. 선택해주세요.', 'warning')
      return
    }

    console.log(address);
    const { IMP } = window
    IMP.init(['imp48458232'])                                   // 결제 데이터 정의

    const data = {
      pg: 'kcp',                                                // PG사 (필수항목)
      pay_method: 'card',                                       // 결제수단 (필수항목)
      merchant_uid: `mid_${new Date().getTime()}`,              // 결제금액 (필수항목)
      name: orders.title,                                       // 주문명 (필수항목)
      amount: orders.totalPrice,                                // 금액 (필수항목)
      buyer_name: name,                                         // 구매자 이름
      buyer_tel: phone,                                         // 구매자 전화번호 (필수항목)
      buyer_email: email,                                       // 구매자 이메일
      buyer_addr: address,
      buyer_postalcode: userPost
    }
    IMP.request_pay(data, callback)
  }

  // 결제 성공 여부 체크
  const callback = (response) => {
    const {success, error_msg} = response;
    const errorMsg = error_msg
    if (success) {

      navigate(`/order/done/${orders.ordersNo}/${serviceDate}/${serviceTime}/${address}/${userPost}`)
    } else {
      navigate(`/order/false/${orders.ordersNo}/${serviceDate}/${serviceTime}/${address}/${userPost}/${errorMsg}`)
    }
  }

  // 결제 설정
  useEffect(()=>{
    setAdderss(`${userAddress} ${userAddressDetail}`)
    setName(userInfo.userName)
    setEmail(userInfo.userEmail)
    setPhone(userInfo.userPhone)

    const jquery = document.createElement("script")
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js"
    const iamport = document.createElement("script")
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js"
    document.head.appendChild(jquery)
    document.head.appendChild(iamport)
    return () => {
      document.head.removeChild(jquery)
      document.head.removeChild(iamport)
    }
  }, [userAddress, userAddressDetail, userInfo])

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
            {orderItem.map((item) => (
              <li key={orderItem.itemNo} className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">{item.service.serviceName}</h6>
                  <small className="text-body-secondary">{item.service.serviceContent}</small>
                </div>
                <span className="text-body-secondary">&#8361; {item.price.toLocaleString()} 원</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <span>총 가격 (원)</span>
              <strong id="paymentPrice">&#8361; {orders.totalPrice} 원</strong>
            </li>
          </ul>
        </div>
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3 color_sub2">예약 정보</h4>
          <div className="needs-validation">
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="userName" className="form-label">이름</label>
                {/* <input type="text" className="form-control" id="userName" placeholder="이름" value={userName} onChange={(e) => setUserName(e.target.value)} required /> */}
                <input type="text" className="form-control" id="userName" placeholder="이름" value={userInfo.userName} onChange={(e) => setName(e.target.value)} />
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
                <input type="email" className="form-control" id="userEmail" placeholder="daeut@example.com" value={userInfo.userEmail} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="col-md-12">
                <label htmlFor="userPhone" className="form-label">전화번호</label>
                {/* <input type="text" className="form-control" id="userPhone" placeholder="전화번호를 입력해주세요" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} required /> */}
                <input type="text" className="form-control" id="userPhone" placeholder="전화번호를 입력해주세요" value={userInfo.userPhone} onChange={(e) => setPhone(e.target.value)}  />
              </div>

              <div className="col-12">
                <label htmlFor="userPost" className="form-label">우편번호</label>
                <div className="input-group">
                  <input type="text" className="form-control" id="userPost" placeholder="우편번호" value={userPost} onChange={(e) => setUserPost(e.target.value)} required />
                  {/* <button type="button" className="btn btn-secondary myBtn" onClick={daumPostcode}>우편번호 찾기</button> */}
                  <button type="button" className="btn btn-secondary myBtn" onClick={onOpen}>우편번호 찾기</button>
                  <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                    <DaumPostcode onComplete={handlePostCode} height="100%" />
                  </Modal>
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="userAddress" className="form-label">주소</label>
                {/* <input type="text" className="form-control" id="userAddress" placeholder="주소를 입력해주세요" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} required /> */}
                <input type="text" className="form-control" id="userAddress" placeholder="주소를 입력해주세요" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} required />
              </div>

              <div className="col-12">
                <label htmlFor="userAddressDetail" className="form-label">상세주소</label>
                {/* <input type="text" className="form-control" id="userAddressDetail" placeholder="상세주소를 입력해주세요" value={userAddressDetail} onChange={(e) => setUserAddressDetail(e.target.value)} required /> */}
                <input type="text" className="form-control" id="userAddressDetail" placeholder="상세주소를 입력해주세요" value={userAddressDetail} onChange={(e) => setUserAddressDetail(e.target.value)} required />
              </div>

              <div className="d-flex justify-content-end gap-5 mb-3 mt-4 btn-container">
                <input type="hidden" name="ordersNo" id="ordersNo" value={orders.ordersNo} />
                <input type="hidden" name="totalPrice" id="totalPrice" value={orders.totalPrice} />
                <input type="hidden" name="title" id="title" value={orders.title} />
                <button className="btn btn-primary btn-lg sessuce color_main" type="button" onClick={onClickPayment}>결제하기</button>
                <button className="btn btn-danger btn-lg cancel" type="button" data-bs-toggle="modal" data-bs-target="#cancelPaymentModel" onClick={onCancel}>취소하기</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderForm