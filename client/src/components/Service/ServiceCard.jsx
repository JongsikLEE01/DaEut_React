import React from 'react';

const ServiceCard = ({ service }) => {
  const { serviceCategory, serviceName, userName, fileNo } = service;

  // 썸네일 이미지 URL
  const thumbnailUrl = fileNo ? `/file/img/${fileNo}` : '/img/no-img.jpg'; // public 폴더에 있는 no-img.jpg 파일 경로

  return (
    <div className="col">
      <div className="card-reservation-thumbnail">
        <div className="thumbnail-reservation">
          {/* 카테고리 */}
          <div className="service-tag">
            <span className="reserve-service-tag">{serviceCategory}</span>
          </div>

          {/* 이미지 */}
          <img src={thumbnailUrl} alt="썸네일" width="365px" height="245px" />
        </div>

        <div className="card-body">
          {/* 서비스 이름 */}
          <label className="partner-title">{serviceName}</label>
          {/* 유저(파트너) 이름 */}
          <p className="partner-name">{userName}</p>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;