import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as partners from '../../apis/partner/partner'
import PartnerReview from '../../components/partner/PartnerReviewList'

const PartnerReviewContainer = ( ) => {
  const {partnerNo} = useParams();
  const [partnerReview, setPartnerReview] = useState({})

  // 함수
  const getPartnerReviews = async () => {
    try {
      const response = await partners.getPartnerReviews(partnerNo);
      const data = await response.data;
      setPartnerReview(data);
    } catch (error) {
      console.log('Error', error);
    }
  }

  useEffect(() =>{
    getPartnerReviews()
  },[partnerNo]);


  return (
   <PartnerReview
   partnerReview ={partnerReview}/>
  )
}

export default PartnerReviewContainer