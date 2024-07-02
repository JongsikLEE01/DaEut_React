import React from 'react'
import PartnerReservation from '../containers/partner/PartnerReservationContainer'
import { useParams  } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'

const PartnerReservation = () => {
  const {partnerNo} = useParams()
  return (
    <MainLayout>
    <PartnerReservationContainer partnerNo = {partnerNo}/>
    </MainLayout>
  )
}

export default PartnerReservation