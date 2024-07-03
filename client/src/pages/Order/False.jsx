import React from 'react'
import FalseContainer from '../../containers/Order/FalseContainer'
import MainLayout from '../../layouts/MainLayout'
import { useParams } from 'react-router-dom'

const False = () => {
  const { ordersNo } = useParams()
  const { date } = useParams()
  const { time } = useParams()
  const { userAddress } = useParams()
  const { userPost } = useParams()
  const { errorMsg } = useParams()
  
  return (
    <MainLayout>
      <FalseContainer
        ordersNo={ordersNo}
        date={date}
        time={time}
        userAddress={userAddress}
        userPost={userPost}
        errorMsg={errorMsg}
      />
    </MainLayout>
  )
}

export default False