import React from 'react'
import { Link } from 'react-router-dom'

const ServiceCard = ({ service }) => {
  const { serviceCategory, serviceName, servicePrice, serviceNo, fileNo } = service

  // 썸네일 이미지 URL 설정
  const thumbnailUrl = fileNo ? `/file/img/${fileNo}` : '/img/no-img.png'

  return (
    <div className="col">
      <div className="card-reservation-thumbnail">
        <div className="thumbnail-reservation">
          {/* 서비스 카테고리 */}
          <div className="service-tag">
            <span className="reserve-service-tag">{serviceCategory}</span>
          </div>

          {/* 서비스 이미지 */}
          <Link to={`/service/${serviceNo}`}>
            <img src={thumbnailUrl} alt="썸네일" width="365px" height="245px" />
          </Link>
        </div>

        <div className="card-body">
          {/* 서비스 이름 */}
          <label className="partner-title">{serviceName}</label>
          {/* 서비스 가격 */}
          <p className="partner-name">{servicePrice}원</p>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard