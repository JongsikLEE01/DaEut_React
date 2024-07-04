import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as partners from '../../apis/partner/partner';
import PartnerReservationRead from '../../components/partner/PartnerReservationRead';

const PartnerReservationReadContainer = () => {
  const { ordersNo } = useParams();
  const [reservationRead, setReservationRead] = useState(null); // 초기값을 null로 설정

  // 함수
  const getPartnerReservationRead = async () => {
    try {
      const response = await partners.getpartnerReservationRead(ordersNo);
      const data = response.data; // await를 사용할 필요 없음
      setReservationRead(data);
    } catch (error) {
      console.log('Error', error);
    }
  };
  
  useEffect(() => {
    getPartnerReservationRead(); // 함수 호출 시 () 추가
  }, [ordersNo]);

  return (
    <PartnerReservationRead reservationRead={reservationRead} /> // props 전달 수정
  );
};

export default PartnerReservationReadContainer;
