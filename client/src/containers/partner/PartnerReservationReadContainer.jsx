import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as partners from '../../apis/partner/partner';
import PartnerReservationRead from '../../components/partner/PartnerReservationRead';

const PartnerReservationReadContainer = () => {
  const { ordersNo } = useParams();
  const [reservationRead, setReservationRead] = useState(null);

  const getPartnerReservationRead = async () => {
    try {
      const response = await partners.getpartnerReservationRead(ordersNo);
      const data = response.data;
      console.log("API 응답:", response);

      // 모든 service_ 키를 찾아서 배열로 변환
      const services = Object.keys(data)
        .filter(key => key.startsWith('service_'))
        .map(key => data[key]);

      const reservationRead = {
        order: data.order,
        payments: data.payments,
        services: services
      };

      setReservationRead(reservationRead);
      console.log("설정된 reservationRead:", reservationRead);
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    getPartnerReservationRead();
  }, [ordersNo]);

  return (
    <PartnerReservationRead reservationRead={reservationRead} />
  );
};

export default PartnerReservationReadContainer;
