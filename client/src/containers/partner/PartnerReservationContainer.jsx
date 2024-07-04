import PartnerReservation from '../../components/partner/PartnerReservation'
import {useState, useEffect } from 'react'
import * as partners from '../../apis/partner/partner'
import { useParams } from 'react-router-dom'

const PartnerReservationContainer = () => {
  const {partnerNo} = useParams();
  // state
  const [orderList, setOrderList] = useState([])

  // 함수
  const getPartnerReservations = async () => {
    try {
      const response = await partners.getPartnerReservations(partnerNo);
      const data = await response.data;
      const orderList = await data.orderList
      console.log("orde1rList container"+data);
      console.dir(data)
      console.dir(orderList)
      setOrderList(orderList);
    } catch (error) {
      console.log('Error fetching reservation', error);
    }
    
  }

  useEffect ( () => {
    getPartnerReservations()
  },[]);

  return (
    <PartnerReservation
    orderList ={orderList}/>
  )
}

export default PartnerReservationContainer