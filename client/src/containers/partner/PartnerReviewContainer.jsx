import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as partners from '../../apis/partner/partner';
import PartnerReview from '../../components/partner/PartnerReviewList';

const PartnerReviewContainer = ( {partnerNo} ) => {
  const [partnerReview, setPartnerReview] = useState([]);
  const [isLoading, setLoading] = useState(false)

  // 함수
  const getPartnerReviews = async () => {
    try {
      setLoading(true)
      const response = await partners.PartnerReviews(partnerNo);
      const data = response.data;
      console.log(response.data);
      setPartnerReview(data);
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    getPartnerReviews();
  }, [partnerNo]);

  return (
    <PartnerReview reviews={partnerReview} 
    partnerNo={partnerNo}
    isLoading={isLoading}/>
  );
};

export default PartnerReviewContainer;
