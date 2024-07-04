import React from 'react';
import { Link } from 'react-router-dom';
import './css/partner.css';

const PartnerReviewList = ({ reviews, parnterNo }) => {

  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('d-none');
  };

  return (
    <div className="container-fluid container">
        <div className="col-md-9 col-lg-10 form-section">
          <div>
            <h3>작성 리뷰</h3>
            <div className="container mt-2">
              <div class="card">
              {reviews && reviews.length > 0 ? (
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
                      </div>
                      <div className="row mt-2">
                        <div className="col-12">
                          <textarea rows="5" className="form-control" name="content" readOnly value={review.reviewContent}></textarea>
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

export default PartnerReviewList;
