import React, { useState, useEffect } from 'react';
import * as Services from '../../apis/Services/Services';
import ReadReview from '../../components/Service/ReadReview';

const ReadReviewContainer = ({ serviceNo }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log('리뷰 서비스 번호:', serviceNo); // 서비스 번호 로그
        const response = await Services.select(serviceNo);
        console.log('서버 응답 데이터:', response.data); // 서버에서 받은 데이터 로그

        if (response.status === 200) {
          const responseData = response.data;
          // 서버 응답 데이터에서 reviews를 추출하는 방식이 다를 수 있으므로 확인 필요
          const reviewsData = responseData.reviews || responseData; // reviews가 없는 경우 responseData를 사용
          
          if (Array.isArray(reviewsData)) {
            setReviews(reviewsData); // 리뷰가 응답 데이터에 포함되어 있다고 가정합니다
          } else {
            console.warn('서버 응답 데이터에 리뷰 정보가 포함되어 있지 않습니다.');
            setReviews([]); // 리뷰 데이터가 없는 경우 빈 배열로 설정
          }
        } else {
          console.error('서버에서 잘못된 응답을 받았습니다.');
          setReviews([]); // 서버에서 오류 응답을 받았을 경우 빈 배열로 설정
        }
      } catch (error) {
        console.error('리뷰를 불러오는 중 오류 발생:', error);
        setReviews([]); // 오류 발생 시 빈 배열로 설정
      } finally {
        setLoading(false); // 데이터 로딩 상태 변경
      }
    };

    fetchReviews();
  }, [serviceNo]);

  useEffect(() => {
    console.log('Current reviews state:', reviews); // 현재 리뷰 상태 로그
    reviews.forEach((review, index) => {
      console.log(`Review ${index}의 rfiles:`, review.rfiles); // 리뷰의 rfiles 속성 로그
    });
  }, [reviews]);

  return (
    <ReadReview reviews={reviews} /> // ReadReview 컴포넌트에 reviews prop 전달
  );
};

export default ReadReviewContainer;
