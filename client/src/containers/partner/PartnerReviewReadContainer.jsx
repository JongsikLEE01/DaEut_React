import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as partners from '../../apis/partner/partner'
import PartnerReservationRead from '../../components/partner/PartnerReservationRead'

const PartnerReviewReadContainer = ( {ordersNo}) => {
  const {ordersNo} = useParams();
  const [reservationRead, serReservationRead] = useState({})

  // 함수
  const getpartnerReservationRead = async () => {
    try {
      const response = await partners.getpartnerReservationRead(ordersNo);
      const data = await response.data;
      serReservationRead(data);
    } catch (error) {
      console.log('Error', error);
    }
  }
  
  useEffect(()=> {
    getpartnerReservationRead
  },[]);


  return (
   <PartnerReservationRead
   reservationRead={reservationRead}/>
  )
}

export default PartnerReviewReadContainer