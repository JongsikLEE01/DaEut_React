import React, { useEffect, useState } from 'react'
import FalseForm from '../../components/Order/FalseForm'
import * as Orders from '../../apis/Services/Orders'

const FalseContainer = ({ ordersNo, date, time, userAddress, userPost, errorMsg }) => {
  const [payments, setPayments] = useState(null)

  const getPayment = async (ordersNo, date, time, userAddress, userPost, errorMsg) => {
    // 결제실패 메세지 인코딩
    const encodedErrorMsg = encodeURIComponent(errorMsg)
    try {
      const response = await Orders.payFalse(ordersNo, date, time, userAddress, userPost, encodedErrorMsg)
      const data = response.data
      const payments = data.payments

      console.log(payments)

      setPayments(payments)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(()=>{
    getPayment(ordersNo, date, time, userAddress, userPost, errorMsg)
  },[])

  return (
    <FalseForm
      errorMsg={errorMsg}
    />
  )
}

export default FalseContainer