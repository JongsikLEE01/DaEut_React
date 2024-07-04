import React from 'react'
import PartnerReviewContainer from '../../containers/partner/PartnerReviewContainer'
import { useParams  } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import PartnerLayout from '../../layouts/PartnerLayout'

const PartnerReview = () => {
  const {partnerNo} = useParams()
  return (
    <PartnerLayout>
    <PartnerReviewContainer partnerNo ={partnerNo}/>
    </PartnerLayout>
  )
}

export default PartnerReview