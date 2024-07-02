import React, { useEffect, useState } from 'react'
import DoneForm from '../../components/Order/DoneForm'
import * as Orders from '../../apis/Services/Orders'

const DoneContainer = ({ ordersNo, date, time, userAddress, userPost }) => {
  const [payments, setPayments] = useState(null)

  const getPayment = async (ordersNo, date, time, userAddress, userPost) => {
    try {
      const response = await Orders.payDone(ordersNo, date, time, userAddress, userPost)
      const data = response.data
      const payments = data.payments

      console.log(payments);

      setPayments(payments)
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(()=>{
    getPayment(ordersNo, date, time, userAddress, userPost)
  },[])

  return (
    <DoneForm
      ordersNo={ordersNo}
      payments={payments}
    />
  )
}

export default DoneContainer