import React from 'react'
import UserMypageContainer from '../../containers/User/UserMypageContainer'
import UserLayout from '../../layouts/UserLayout'

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