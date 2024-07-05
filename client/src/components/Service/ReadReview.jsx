import React, { useContext, useEffect } from 'react';
import { LoginContext } from '../contexts/LoginContextProvider';

const ReadReview = ({ reviews }) => {
  const { userInfo } = useContext(LoginContext);

  useEffect(() => {
    console.log('리뷰 받은 데이터:', reviews); // 받은 리뷰 데이터 로그
  }, [reviews]);

  return (
    <div className="review-box" id="review-box">
      <h4 className="review-title">이용 후기</h4>
      <hr className="section-underbar" />

      {reviews && reviews.map(review => (
        <div className="review-section" key={review.reviewNo}>
          {/* 리뷰 정보 표시 */}
          <div className="review-user-title">
            <p className="review-user-name">{review.userName}</p>
            {/* 유저 별점 */}
            <div className="review-star">
              {[...Array(review.reviewRating)].map((_, index) => (
                <i key={index} className="fa fa-star" aria-hidden="true" style={{ width: '15px', height: '15px' }}></i>
              ))}
            </div>
          </div>

          {/* 리뷰 이미지 */}
          <div className="review-image-box">
            {review.rFiles?.map(file => (
              <div key={file.fileNo} className="review-image-container">
                <img src={`/file/img/${file.fileNo}`} alt="리뷰 이미지" className="review-image" />
              </div>
            ))}
          </div>
          
          {/* 리뷰 내용 */}
          <p className="review-content" id="reviewContent">{review.reviewContent}</p>

          {/* 리뷰 작성일 및 삭제 버튼 */}
          <div className="review-actions">
            <p className="review-date">{review.reviewRegDate}</p>
            {userInfo.userNo === review.userNo && (
              <div className="review-buttons">
                <form action="/reservation/reviewDelete" method="post">
                  <input type="hidden" name="userNo" value={review.userNo} />
                  <input type="hidden" name="reviewNo" value={review.reviewNo} />
                  <button type="submit" className="review-delete">삭제</button>
                </form>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReadReview;
