import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import OrderContainer from '../../containers/Order/OrderContainer'
import { useParams } from 'react-router-dom'

const Payment = () => {
  const { ordersNo } = useParams()
  
  return (
    <MainLayout>
      <OrderContainer
        ordersNo={ordersNo}
      />
    </MainLayout>
  )
}

export default Payment