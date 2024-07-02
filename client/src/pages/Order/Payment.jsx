import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import OrderContainer from '../../containers/Order/OrderContainer'
import { useParams } from 'react-router-dom'

const Order = () => {
  const { ordersNo } = useParams()
  return (
    <MainLayout>
      <OrderContainer
        ordersNo={ordersNo}
      />
    </MainLayout>
  )
}

export default Order