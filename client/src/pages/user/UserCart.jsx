import React from 'react'
import UserLayout from '../../layouts/UserLayout'
import UserCartContainer from '../../containers/User/UserCartContainer'

const UserCart = () => {
  return (
    <>
      <UserLayout>
        <UserCartContainer />        
      </UserLayout>  
    </>
  )
}

export default UserCart