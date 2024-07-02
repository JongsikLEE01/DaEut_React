import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import DoneContainer from '../../containers/Order/DoneContainer'
import { useParams } from 'react-router-dom'

const Done = () => {
  const { ordersNo } = useParams()
  
return (
    <MainLayout>
      <DoneContainer
        ordersNo={ordersNo}
      />
    </MainLayout>
  )
}

export default Done