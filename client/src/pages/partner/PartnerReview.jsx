import React from 'react'
import PartnerReviewContainer from '../../containers/partner/PartnerReviewContainer'
import { useParams  } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'

const PartnerReview = () => {
  const {partnerNo} = useParams()
  return (
    <MainLayout>
    <PartnerReviewContainer partnerNo ={partnerNo}/>
    </MainLayout>
  )
}

export default PartnerReview