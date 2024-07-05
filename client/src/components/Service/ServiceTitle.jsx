import React from 'react'
import { Link } from 'react-router-dom'

const ServiceTitle = ({ userInfo }) => {
  // 글쓰기 권한 체크
  const hasWritePermission = () => {
    if (userInfo && userInfo.authList) {
      return userInfo.authList.includes('ROLE_PARTNER') || userInfo.authList.includes('ROLE_ADMIN')
    }
    return false
  }

  return (
    <div className="reservationTitles">
      <h3 className="reservation-title">생활 속 편리함</h3>
      <div className="reservation-container">
        <h2 className="reservation-subtitle">깔끔한 생활 도우미 예약 서비스</h2>
        {
          hasWritePermission() && (
            <Link to="/service/insert" className="reservation-insert-link">
              <button className="sessuce">글쓰기</button>
            </Link>
          )
        }
      </div>
    </div>
  )
}

export default ServiceTitle