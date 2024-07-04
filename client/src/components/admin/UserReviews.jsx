import React, { useEffect, useState } from 'react';
import * as Swal from '../../apis/alert';
import { deleteReview } from '../../apis/admin/admin'; // deleteReview 함수 import 필요

const UserReviews = ({ reviews, onDelete }) => {
    const [reviewsArray, setReviewsArray] = useState([]);

    // reviews 객체가 업데이트되면 배열로 변환하여 상태에 설정
    useEffect(() => {
        if (reviews && Object.keys(reviews).length > 0) {
            const reviewsList = Object.values(reviews);
            setReviewsArray(reviewsList);
        }
    }, [reviews]);

    // 리뷰 삭제 처리 함수
    const handleDeleteReview = async (reviewNo) => {
        try {
            // 삭제 요청 보내기
            const response = await deleteReview(reviewNo);
            console.log(response); // 성공적으로 삭제됐을 경우 서버에서 반환된 응답 확인

            // 삭제 성공 시 UI 업데이트를 위해 onDelete 콜백 호출
            onDelete(reviewNo);
            // UI에서 즉시 삭제 반영을 위해 reviewsArray에서 삭제된 리뷰 제거
            setReviewsArray(prevReviews => prevReviews.filter(review => review.reviewNo !== reviewNo));

            Swal.alert('리뷰 삭제', '리뷰가 성공적으로 삭제되었습니다.', 'success');
        } catch (error) {
            console.error('Error deleting review:', error);
            Swal.alert('리뷰 삭제 실패', '리뷰 삭제 중 오류가 발생했습니다.', 'error');
        }
    };

    return (
        <div className="reviews-container">
            {reviewsArray.map(review => (
                <div key={review.reviewNo} className="review-card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 review-date">
                                {new Date(review.reviewRegDate).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-10">
                                <span className="reservation-info">예약번호 : {review.ordersNo}</span>
                                <span className="ms-3 reservation-name">예약자명 : {review.userName}</span>
                            </div>
                            <div className="col-2 text-end rating">
                                <span className="star-rating">★</span>
                                <span>{review.reviewRating}</span>
                            </div>
                        </div>
                        <div className="review-content">
                            <textarea rows="5" cols="85" name="content" value={review.reviewContent} readOnly></textarea>
                        </div>
                        <div className="buttons mt-2">
                            <button type="button" className="btn btn-primary custom1 delBtn" onClick={() => handleDeleteReview(review.reviewNo)}>
                                리뷰 삭제
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserReviews;
