import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LoginContext } from '../contexts/LoginContextProvider'
import * as Swal from '../../apis/alert'

const ReadHeader = ({ service, onChatRoom }) => {
  const { isLogin, userInfo } = useContext(LoginContext)

  const addChatRoom=()=>{
    const partnerNo = service.partnerNo
    if(partnerNo == userInfo.partnerNo){
      Swal.alert('채팅방 생성을 실패했어요', '채팅방 생성을 실패했어요, 자기 자신에게는 채팅 할 수 없어요', 'warning', )
    }else{
      onChatRoom(partnerNo, userInfo)
    }
  }

  useEffect(()=>{
    
  },[userInfo])

  return (
    <>
      <div className="header-area">
        {/* 서비스 이름 */}
        <h3 className="header-title">{service.serviceName}</h3>
  
      {/* 게시글 별점 */}
      <div className="review-star">
          {/* {averageRating != null && averageRating > 0 && (
            <>
              {[...Array(averageRating)].map((_, index) => (
                <i key={index} className="fa fa-star" aria-hidden="true"></i>
              ))}
            </>
          )} */}
      </div>
      {
        isLogin ? (
          <>
            {/* 문의 버튼 표시 */}
            <div className="reservation-chat reservation-updat reservation-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-dots-fill" viewBox="0 0 16 16">
                <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
              </svg>
              <button className="contact-link color_main" onClick={addChatRoom}>문의하기</button>
            </div>
        
            {/* 수정 버튼 표시 */}
            {service.partnerNo == userInfo.partnerNo && 
              (
                <div className="reservation-link">
                  <Link to={`/service/update/${service.serviceNo}`}>
                    <button className="reservation-update">수정하기</button>
                  </Link>
                </div>
              )
            }
          </>
        )
        :
        (
          <>
          </>
        )
      }
      
      </div>
      <div className="service-title-tag">
	  	  <span className="service-tag-name" style={{width: 'auto'}}>{service.serviceCategory}</span>
	    </div>
    </>
  )
}

export default ReadHeader
