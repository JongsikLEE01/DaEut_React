import React from 'react'
import 'swiper/css';

const ReadSlide = ({ fileList }) => {
  return (
    <>
    { fileList.map( (file) => (
      <div className="reservation-image-box mb-5">
		<img id="slide0" src={`/file/${file.fileNo}`}
			className="reservation-image-slide swiper-slide"
            style={{ width: '100%', maxWidth: '777px', height: 'auto', display: 'block' }} />
	  </div>
    ))}
	<div className="reservation-menu">
		<li data-target="partner-intro">파트너 소개</li>
		<li data-target="reservation-status">예약 현황</li>
		<li data-target="refund-policy">환불 안내</li>
		<li data-target="review-box">이용 후기</li>
	</div>
    </>
  )
}

export default ReadSlide