import React from 'react'
import PartnerReview from '../components/PartnerReview'
import { useParams  } from 'react-router-dom'

const PartnerReview = () => {
  const {partnerNo} = useParams()
  return (
    <>
    <PartnerReview partnerNo ={partnerNo}/>
    </>
  )
}

export default PartnerReview