import React from 'react';
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination } from 'swiper';

const Slide = () => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
    >
      <SwiperSlide><img className='img' src={`${process.env.PUBLIC_URL}/img/slide01.png`} alt="" style={{ maxWidth: '100%', maxHeight: '600px' }} /></SwiperSlide>
      <SwiperSlide><img className='img' src={`${process.env.PUBLIC_URL}/img/slide02.png`} alt="" style={{ maxWidth: '100%', maxHeight: '600px' }} /></SwiperSlide>
      <SwiperSlide><img className='img' src={`${process.env.PUBLIC_URL}/img/slide03.png`} alt="" style={{ maxWidth: '100%', maxHeight: '600px' }} /></SwiperSlide>
    </Swiper>
  );
};

export default Slide;
