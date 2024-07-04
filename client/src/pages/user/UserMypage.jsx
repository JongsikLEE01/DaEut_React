import React from 'react'
import UserLayout from '../../layouts/UserLayout'
import UserMypageContainer from '../../containers/User/UserMypageContainer'

const UserMyPage = () => {
  return (
    <>
      <UserLayout>
        <UserMypageContainer />        
      </UserLayout>  
    </>
  )
}

export default UserMyPage