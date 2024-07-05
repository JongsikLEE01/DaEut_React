import React, { useEffect, useState } from 'react'
import * as Services from '../../apis/Services/Services'
import * as Orders from '../../apis/Services/Orders'
import ServiceRead from '../../components/Service/ServiceRead'
import ReadHeader from '../../components/Service/ReadHeader'
import ReadSlide from '../../components/Service/ReadSlide'
import ReadPartnerInfo from '../../components/Service/ReadPartnerInfo'
import ReadInfo from '../../components/Service/ReadInfo'
import ReadReview from '../../components/Service/ReadReview'
import ReadContent from '../../components/Service/ReadContent'
import { useNavigate } from 'react-router-dom'
import * as Swal from '../../apis/alert'
import ServiceCalendar from '../../components/Service/ServiceCalendar'

const ServiceReadContainer = ({ serviceNo }) => {
  const navigate = useNavigate()
  
  const [service, setService] = useState({})
  const [fileList, setFileList] = useState([])
  const [partner, setPartner] = useState({})
  const [partnerInfo, setPartnerInfo] = useState({})
  const [pthumbnail, setPthumbnail] = useState({})
  
  // 서비스 조회
  const getService = async () => {
    try {
      const response = await Services.select(serviceNo)
      const data = response.data

      const serviceData = data.service     // 서버 응답에서 서비스 데이터를 가져옴
      const files = data.fileList          // 서버 응답에서 파일 목록을 가져옴
      const partner = data.pUsers          // 서버 응답에서 파트너를 가져옴
      const partnerInfo = data.partner     // 서버 응답에서 파트너 정보를 가져옴
      const pthumbnail = data.pthumbnail   // 서버 응답에서 파트너 정보를 가져옴

      setService(serviceData)
      setFileList(files)
      setPartner(partner)
      setPartnerInfo(partnerInfo)
      setPthumbnail(pthumbnail)
    } catch (e) {
      console.error('서비스 조회 중 에러 발생... ', e)
    }
  }

  // 장바구니 추가
  const onInsert = async (userNo, serviceNo) =>{
    try {
      const response = await Services.addCart(userNo, serviceNo)
      const status = await response.status
      console.log(`장바구니 추가 요청 결과 ${status}`);
      Swal.alert('장바구니에 담기', '축하드립니다! 서비스가 장바구니에 성공적으로 담겼어요.', 'success')
    } catch (e) {
      Swal.alert('장바구니에 담기', '장바구니에 담기지 못했어요, 이미 있는 담겨있는 서비스인지 확인해보세요', 'warning')
      console.error(e)
    }
  }

  // 바로 주문하기
  const onPayment = async (userNo, serviceNo, quantity) =>{
    try {
      const response = await Orders.addOrder(userNo, serviceNo, quantity)
      const data = response.data
      const ordersNo = data.ordersNo
      console.log(`주문 추가 요청 결과 ${ordersNo}`)
      
      navigate(`/order/${ordersNo}`)
    } catch (e) {
      console.error(e)
    }
  }

  // 채팅방 생성
  const onChatRoom = async (partnerNo, userInfo) =>{
    try {
      console.log('---'+partnerNo);
      const response = await Services.addChatRoom(partnerNo, userInfo)
      const data = response.data
      const chatRoom = data.chatRoom
      console.log(`생성된 채팅 방... ${chatRoom}`)

      navigate(`/user/userChatRoom`)
    } catch (e) {
      console.error(`채팅방 생성중 오류 발생... ${e}`)
    }
  }


  useEffect(() => {
    getService()
  }, [])

  return (
    <>
      <ReadHeader 
        service={service} 
        onChatRoom={onChatRoom}
      />
      <div class="detail-form">
        <ReadContent
          service={service}
          onInsert={onInsert}
          onPayment={onPayment}
        />
        <ServiceRead 
          service={service}
          fileList={fileList}
        />
        <div class="detail-content">
          <div className="reservation-service-content">
            <ReadSlide
              fileList={fileList}
            />
            <ReadPartnerInfo
              partner={partner}
              partnerInfo={partnerInfo}
              pthumbnail={pthumbnail}
            />
            <ServiceCalendar serviceNo={serviceNo} />
            <ReadInfo/>
          </div>
          <ReadReview />
        </div>
      </div>
    </>
  )
}

export default ServiceReadContainer
