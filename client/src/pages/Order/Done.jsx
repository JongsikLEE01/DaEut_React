import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import DoneContainer from '../../containers/Order/DoneContainer'
import { useParams } from 'react-router-dom'

const Done = () => {
  const { ordersNo } = useParams()
  const { date } = useParams()
  const { time } = useParams()
  const { userAddress } = useParams()
  const { userPost } = useParams()
  
return (
    <MainLayout>
      <DoneContainer
        ordersNo={ordersNo}
        date={date}
        time={time}
        userAddress={userAddress}
        userPost={userPost}
      />
    </MainLayout>
  )
}

export default Done