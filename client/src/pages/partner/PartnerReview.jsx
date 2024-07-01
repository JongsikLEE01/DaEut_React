import React from 'react'
import PartnerReviewContainer from '../containers/partner/PartnerReviewContainer'
import { useParams  } from 'react-router-dom'

const PartnerReview = () => {
  const {partnerNo} = useParams()
  return (
    <>
    <PartnerReviewContainer partnerNo ={partnerNo}/>
    </>
  )
}

export default PartnerReview