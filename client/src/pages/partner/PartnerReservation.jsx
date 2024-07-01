import React from 'react'
import PartnerReservation from '../components/PartnerReservation'
import { useParams  } from 'react-router-dom'

const PartnerReservation = () => {
  const {partnerNo} = useParams()
  return (
    <>
    <PartnerReservation partnerNo = {partnerNo}/>
    </>
  )
}

export default PartnerReservation