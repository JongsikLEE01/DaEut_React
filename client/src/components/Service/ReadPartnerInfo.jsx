import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ReadPartnerInfo = ({ partner, partnerInfo, pthumbnail }) => {
  const stars = Array.from({ length: partnerInfo.partnerGrade }, (_, index) => (
    <FontAwesomeIcon 
      key={index} 
      icon={faStar} 
      style={{ color: 'gold', marginRight: '5px' }} 
    />
  ));
  console.log(pthumbnail);

  return (
    <div className="partner-intro" id="partner-intro">
      <h4 className="reservation-intro">파트너 소개</h4>
      <hr className="section-underbar" />
      <div className="partner-info">
        {/* 파트너 사진 */}
        {/* <img src={`/file/img/${pthumbnail.fileNo}`} alt="파트너 사진" className="partner-photo" /> */}
        <img src={`/file/img/${1}`} alt="파트너 사진" className="partner-photo" />
        <div className="partner-intro-name">
          <h3 className="partner-introduction-name">{partner.userName}</h3>

          {/* 별점 표시 - partnerGrade */}
          {partnerInfo.partnerGrade && partnerInfo.partnerGrade > 0 && partnerInfo.partnerGrade <= 5 && (
            <div className="partner-grade">
              {stars}
            </div>
          )}
        </div>
        <p className="year-of-work">{partnerInfo.partnerCareer}</p>
        <p className="partner-selfintroduction">{partnerInfo.introduce}</p>
      </div>
    </div>
  )
}

export default ReadPartnerInfo