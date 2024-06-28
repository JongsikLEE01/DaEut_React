import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';

const Slide = () => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
      className='swiper'
    >
      <div className='swiper-wrapper'>
        <SwiperSlide className='swiper-slide '>
          <img className='mx-auto' src={`${process.env.PUBLIC_URL}/img/slide01.png`} alt="" style={{ maxWidth: '100%', maxHeight: '600px' }} />
        </SwiperSlide>
        <SwiperSlide>
          <img className='mx-auto' src={`${process.env.PUBLIC_URL}/img/slide02.png`} alt="" style={{ maxWidth: '100%', maxHeight: '600px' }} />
        </SwiperSlide>
        <SwiperSlide>
          <img className='mx-auto'  src={`${process.env.PUBLIC_URL}/img/slide03.png`} alt="" style={{ maxWidth: '100%', maxHeight: '600px' }} />
        </SwiperSlide>
      </div>
    </Swiper>
  )
}

export default Slide