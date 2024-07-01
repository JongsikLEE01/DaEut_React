import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PartnerReview = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // 예시: API를 통해 리뷰 데이터를 가져옵니다.
    axios.get('/api/reviews') // API URL을 실제로 사용하는 API 엔드포인트로 변경하세요.
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, []);

  return (
    <div className="container-fluid container">
      <button className="btn btn-primary toggle-btn menu mt-2 ml-2 myBtn" id="toggle-btn" onClick={toggleSidebar}>메뉴</button>
      <div className="row">
        <nav className="col-md-3 col-lg-2 sidebar" id="sidebar">
          <button className="btn btn-danger d-block d-md-none cancel" onClick={toggleSidebar}>닫기</button>
          <h5>마이페이지</h5>
          <br />
          <a href="/partner/partnerMypage" className="active">내 정보 변경</a>
          <a href="/partner/partnerReservation">내 예약 보기</a>
          <a href="/partner/partnerReview" className="partnerReview">내 리뷰 보기</a>
          <a href="/partner/partnerChatRoom">채팅 내역</a>
        </nav>
        <div className="col-md-9 col-lg-10 form-section">
          <div>
            <h3>작성 리뷰</h3>
            <div className="container mt-2">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.reviewId} className="card mt-3 reservation-card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12 label">{new Date(review.reviewRegDate).toLocaleDateString()}</div>
                      </div>
                      <div className="row">
                        <div className="col-8">
                          <span>예약번호: {review.paymentNo}</span>
                          <span className="ms-3">예약자명: {review.userName}</span>
                        </div>
                        <div className="col-4 text-end">
                          <span className="star-rating">★</span>
                          <span>{review.reviewRating}</span>
                        </div>
                        <div>
                          <textarea rows="5" cols="85" name="content" readOnly value={review.reviewContent}></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>리뷰가 없습니다.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const toggleSidebar = () => {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('d-none');
};

export default PartnerReview;
