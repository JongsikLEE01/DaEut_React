import React from 'react'
import { Link } from 'react-router-dom'

const ReadHeader = ({ service }) => {

  // JSX로 변환된 HTML 부분
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
        
      {/* 문의하기 버튼 표시 */}
      <div className="reservation-chat reservation-updat reservation-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-dots-fill" viewBox="0 0 16 16">
          <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
        </svg>
        <form>
          <input type="hidden" name="partnerNo" />
          <input type="submit" className="contact-link color_main" value="문의하기" />
        </form>
      </div>
  
      {/* 수정 버튼 표시 */}
      <div className="reservation-link">
        <Link to={`/service/update/${service.serviceNo}`}>
          <button className="reservation-update">수정하기</button>
        </Link>
      </div>
      </div>
      <div className="service-title-tag">
	  	  <span className="service-tag-name" style={{width: 'auto'}}>{service.serviceCategory}</span>
	    </div>
    </>
  )
}

export default ReadHeader
