import React, { useState } from 'react'
import DoneForm from '../../components/Order/DoneForm'
import * as Orders from '../../apis/Services/Orders'

const DoneContainer = ({ ordersNo }) => {
  const [payments, setPayments] = useState({})

  const onPayDone = async (ordersNo, date, time, userAddress, userPost) => {
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

  return (
    <DoneForm
      ordersNo={ordersNo}
      onPayDone={onPayDone}
      payments={payments}
    />
  )
}

export default DoneContainer