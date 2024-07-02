import React, { useState } from 'react'
import OrderForm from '../../components/Order/OrderForm'
import * as Orders from '../../apis/Services/Orders'

const OrderContainer = ({ordersNo}) => {
  const [orders, setOrders] = useState({})
  const [orderItem, setOrderItem] = useState({})

  const getOrders = async (ordersNo) => {
    try {
      const response = await Orders.addPayment(ordersNo)
      const data = response.data
      const order = data.order
      const orderItem = data.orderItem

      setOrders(order)
      setOrderItem(orderItem)
    } catch (e) {
      console.error(e)
    }
  }
  
  return (
    <>
      <OrderForm
      orders={orders}
      />
    </>
  )
}

export default OrderContainer