import React, { useEffect, useState , useContext } from 'react';
import { useParams } from 'react-router-dom';
import * as partners from '../../apis/partner/partner';
import PartnerReview from '../../components/partner/PartnerReviewList';
import { LoginContext   } from '../../components/contexts/LoginContextProvider'; // LoginContext만 import

const PartnerReviewContainer = ( {partnerNo} ) => {
  const { userInfo } = useContext(LoginContext); // 로그인 컨텍스트에서 userInfo 가져오기
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
    if (userInfo  && userInfo .partnerNo) {
      getPartnerReviews(userInfo .partnerNo); // userInfo에서 partnerNo를 가져와 사용
    }
  }, [userInfo ]);

  return (
    <PartnerReview reviews={partnerReview} 
    partnerNo={partnerNo}
    isLoading={isLoading}/>
  );
};

export default PartnerReviewContainer;
