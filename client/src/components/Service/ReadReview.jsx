import React from 'react'

// const ReadReview = ({ reviews, rFiles, sessionUserNo, csrfToken }) => {
const ReadReview = () => {
    return (
      // <div className="review-box" id="review-box">
      //   <h4 className="review-title">이용 후기</h4>
      //   <hr className="section-underbar" />
  
      //   {reviews.map(review => (
      //     review && (
      //       <div className="review-section" key={review.reviewNo}>
      //         {/* 리뷰 정보 표시 */}
      //         <div className="review-user-title">
      //           <p className="review-user-name">{review.userName}</p>
      //           {/* 유저 별점 */}
      //           {review.reviewRating && (
      //             <div className="review-star">
      //               {[...Array(review.reviewRating)].map((_, index) => (
      //                 <i key={index} className="fa fa-star" aria-hidden="true" style={{ width: '15px', height: '15px' }}></i>
      //               ))}
      //             </div>
      //           )}
      //         </div>
  
      //         {/* 리뷰 이미지 */}
      //         <div className="review-image-box">
      //           {rFiles.map(file => (
      //             file && (
      //               <div key={file.fileNo} className="review-image-container">
      //                 <img src={`/file/img/${file.fileNo}`} alt="리뷰 이미지" className="review-image" />
      //               </div>
      //             )
      //           ))}
      //         </div>
  
      //         {/* 리뷰 내용 */}
      //         <p className="review-content" id="reviewContent">{review.reviewContent}</p>
  
      //         {/* 리뷰 작성일 및 삭제 버튼 */}
      //         <div className="review-actions">
      //           <p className="review-date">{review.reviewRegDate}</p>
      //           {sessionUserNo === review.userNo && (
      //             <div className="review-buttons">
      //               <form action="/reservation/reviewDelete" method="post">
      //                 <input type="hidden" name="userNo" value={review.userNo} />
      //                 <input type="hidden" name="reviewNo" value={review.reviewNo} />
      //                 <input type="hidden" name={csrfToken.parameterName} value={csrfToken.token} />
      //                 <button type="submit" className="review-delete">삭제</button>
      //               </form>
      //             </div>
      //           )}
      //         </div>
      //       </div>
      //     )
      //   ))}
      // </div>
    <>
      <div className="review-box" id="review-box">
       <h4 className="review-title">이용 후기</h4>
       <hr className="section-underbar" />
      </div>
    </>
  )
}

export default ReadReview
