import React from 'react'
import UserLayout from '../../layouts/UserLayout'
import UserCancelDoneContainer from '../../containers/User/UserCancelDoneContainer'
import { useParams } from 'react-router-dom'

const UserCancelDone = () => {
  const { ordersNo } = useParams()
  
  return (
    <UserLayout>
      <UserCancelDoneContainer
        ordersNo={ ordersNo }
      />     
    </UserLayout>  
  )
}

export default UserCancelDone