import React from "react"
import UserLayout from "../../layouts/UserLayout"
import UserReviewContainer from "../../containers/User/UserReviewContainer"

const UserReview = () => {
  return (
    <>
      <UserLayout>
        <UserReviewContainer />
      </UserLayout>
    </>
  )
}

export default UserReview