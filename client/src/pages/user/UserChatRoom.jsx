import React from 'react'
import UserLayout from '../../layouts/UserLayout'
import UserChatRoomContainer from '../../containers/User/UserChatRoomContainer'

const UserChatRoom = () => {
  return (
    <>
      <UserLayout>
        <UserChatRoomContainer />        
      </UserLayout>  
    </>
  )
}

export default UserChatRoom