import React from 'react'
import FalseContainer from '../../containers/Order/FalseContainer'
import MainLayout from '../../layouts/MainLayout'
import { useParams } from 'react-router-dom'

const False = () => {
  const { errorMsg } = useParams()
  
  return (
    <MainLayout>
      <FalseContainer
        errorMsg={errorMsg}
      />
    </MainLayout>
  )
}

export default False