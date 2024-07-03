import React, { useEffect, useState } from 'react'
import OrderForm from '../../components/Order/OrderForm'
import * as Orders from '../../apis/Services/Orders'

const OrderContainer = ({ ordersNo }) => {
  const [orders, setOrders] = useState({})
  const [orderItem, setOrderItem] = useState([])

  console.log(ordersNo)

  // 주문정보 가져오기
  const getOrders = async (ordersNo) => {
    try {
      const response = await Orders.getOrder(ordersNo)
      const data = response.data
      const order = data.order
      const orderItem = data.orderItems

      console.log(order)
      console.log(orderItem)
      setOrders(order)
      setOrderItem(orderItem)
    } catch (e) {
      console.error(e)
    }
  }
  
  useEffect(()=>{
    getOrders(ordersNo)
  }, [])
  
  return (
    <>
      <OrderForm
        orders={orders}
        orderItem={orderItem}
      />
    </>
  )
}

export default OrderContainer