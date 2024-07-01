import React from 'react'
import PartnerReservation from '../containers/partner/PartnerReservationContainer'
import { useParams  } from 'react-router-dom'

const PartnerReservation = () => {
  const {partnerNo} = useParams()
  return (
    <>
    <PartnerReservationContainer partnerNo = {partnerNo}/>
    </>
  )
}

export default PartnerReservation