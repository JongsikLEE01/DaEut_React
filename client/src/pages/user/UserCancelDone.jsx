import React from 'react'
import UserLayout from '../../layouts/UserLayout'
import UserCancelDoneContainer from '../../containers/User/UserCancelDoneContainer'
import { useParams } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'

const UserCancelDone = () => {
  const { ordersNo } = useParams()
  
  return (
    <MainLayout>
      <UserCancelDoneContainer
        ordersNo={ ordersNo }
      />     
    </MainLayout>  
  )
}

export default UserCancelDone