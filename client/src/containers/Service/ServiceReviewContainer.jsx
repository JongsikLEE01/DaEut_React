import React, { useState, useEffect } from 'react';
import Service from '../../apis/Services/Services';
import ReadReview from '../../components/Service/ReadReview';

const ReadReviewContainer = ({ serviceNo }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log('리뷰 서비스 번호:', serviceNo); // 서비스 번호 로그
        const response = await Service.select(serviceNo);
        console.log('서버 응답 데이터:', response.data); // 서버에서 받은 데이터 로그

        if (response.data && response.data.reviews) {
          setReviews(response.data.reviews); // 리뷰가 응답 데이터에 포함되어 있다고 가정합니다
        } else {
          console.warn('서버 응답 데이터에 리뷰 정보가 포함되어 있지 않습니다.');
          setReviews([]); // 리뷰 데이터가 없는 경우 빈 배열로 설정
        }
      } catch (error) {
        console.error('리뷰를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false); // 데이터 로딩 상태 변경
      }
    };

    fetchReviews();
  }, [serviceNo]);

  useEffect(() => {
    console.log('Current reviews state:', reviews); // 현재 리뷰 상태 로그
  }, [reviews]);

  return (
    <>
      {!loading ? (
        <ReadReview reviews={reviews} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ReadReviewContainer;
