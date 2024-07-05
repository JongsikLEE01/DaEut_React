import React from 'react'
import { useParams } from 'react-router-dom'
import UserCancelContainer from '../../containers/User/UserCancelContainer'
import UserLayout from '../../layouts/UserLayout'

const UserCancel = () => {
  const { ordersNo } = useParams()
  return (
    <UserLayout>
      <UserCancelContainer
        ordersNo={ordersNo}
      />     
    </UserLayout>  
  )
}

export default UserCancel