import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'

const ReadSlide = ({ fileList }) => {
  return (
    <>
	  <div className='reservation-image-box mb-5'>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
	  	  modules={[Autoplay, Pagination]}
        >
		  {fileList.map((file, index) => (
			<SwiperSlide key={index}>
				<img
				src={`/file/${file.fileNo}`}
				className="reservation-image-slide swiper-slide"
				// style={{ width: 'auto', maxWidth: '777px', height: 'auto', display: 'block' }}
				style={{ width: 'auto', maxWidth: '777px', height: 'auto', display: 'block' }}
				alt={`Slide ${index + 1}`}
				/>
			</SwiperSlide>
		  ))}
        </Swiper>
	  </div>

      <div className="reservation-menu">
        <li data-target="partner-intro">파트너 소개</li>
        <li data-target="reservation-status">예약 현황</li>
        <li data-target="refund-policy">환불 안내</li>
        <li data-target="review-box">이용 후기</li>
      </div>
    </>
  );
};

export default ReadSlide;
