import PartnerReservation from '../../components/partner/PartnerReservation'
import {useState, useEffect } from 'react'
import * as partners from '../../apis/partner/partner'
import { useParams } from 'react-router-dom'

const PartnerReservationContainer = () => {
  const {partnerNo} = useParams();
  // state
  const [reservation, setReservation] = useState({})

  // 함수
  const getPartnerReservations = async () => {
    try {
      const response = await partners.getPartnerReservations(partnerNo);
      const data = await response.data;
      setReservation(data);
    } catch (error) {
      console.log('Error fetching review', error);
    }
    
  }

  useEffect ( () => {
    getPartnerReservations()
  },[]);

  return (
    <PartnerReservation
    reservation ={reservation}/>
  )
}

export default PartnerReservationContainer