import React from 'react'
import FalseForm from '../../components/Order/FalseForm'

const FalseContainer = ({ errorMsg }) => {
  
  return (
    <FalseForm
      errorMsg={errorMsg}
    />
  )
}

export default FalseContainer