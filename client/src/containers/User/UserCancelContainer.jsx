import React, { useEffect } from 'react'
import UserCancelForm from '../../components/user/UserCancelForm'
import { useState } from 'react'
import * as orders from '../../apis/Services/Orders'
import { useNavigate } from 'react-router-dom'

const UserCancelContainer = ({ ordersNo }) => {
  const [order, setOrder] = useState({})
  const navigate = useNavigate()

  // 주문 정보 가져오기
  const getOrders = async (ordersNo) => {
    try {
      const response = await orders.getOrder(ordersNo)
      const data = response.data
      const order = data.order
  
      console.log(order);
  
      setOrder(order)
    } catch (e) {
      console.error(`주문 조회중 에러 발생... ${e}`);
    }
  }

  // 환불처리
  const onCancel = async (ordersNo, cancelAccount, cancelName, cancelNumber, reason) =>{
    try {
        const response = await orders.payCancel(ordersNo, cancelAccount, cancelName, cancelNumber, reason)
        const data = response.data
        const status = response.status
        console.log(data);
        console.log(`환불 처리 결과.... ${status}`);

        navigate(`/cancelDone/${ordersNo}`)
    } catch (e) {
        console.error(`환불 처리 중 에러 발생... ${e}`);
    }
  }

  useEffect(()=>{
    getOrders(ordersNo)
  }, [])

  return (
    <>
      <UserCancelForm
        ordersNo={ordersNo}
        order={order}
        onCancel={onCancel}
      />
    </>
  )
}

export default UserCancelContainer