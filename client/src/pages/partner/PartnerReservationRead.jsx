import React from 'react'
import { useParams } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import PartnerReservationReadContainer from '../../containers/partner/PartnerReservationReadContainer'

const PartnerReservationRead = () => {
    const {ordersNo} = useParams()
  return (
    <MainLayout>
        <PartnerReservationReadContainer ordersNo = {ordersNo}/>
    </MainLayout>
  )
}

export default PartnerReservationRead