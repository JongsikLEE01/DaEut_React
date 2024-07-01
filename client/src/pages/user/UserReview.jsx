import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';
import '../../components/user/user.css';
import axios from 'axios';

const UserReview = () => {
    const [payments, setPayments] = useState([]);
    const [review, setReview] = useState({
        paymentNo: '',
        reviewTitle: '',
        reviewRating: 5,
        reviewContent: '',
        serviceNo: '',
        partnerNo: ''
    });

    useEffect(() => {
        // 하드코딩된 결제 데이터
        const hardcodedPayments = [
            {
                paymentNo: '1',
                status: 'PAID',
                title: '서비스 1',
                serviceNo: '101',
                partnerNo: '1001'
            }
        ];
        setPayments(hardcodedPayments);
        if (hardcodedPayments.length > 0) {
            setReview(prevReview => ({
                ...prevReview,
                paymentNo: hardcodedPayments[0].paymentNo,
                serviceNo: hardcodedPayments[0].serviceNo,
                partnerNo: hardcodedPayments[0].partnerNo
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview({
            ...review,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 여기에 리뷰 제출 로직 추가 (API 요청 등)
        console.log('Review submitted:', review);
        alert('리뷰가 성공적으로 등록되었습니다.');
    };

    const previewThumbnail = (event) => {
        // 파일 업로드 미리보기 로직 추가
    };

    return (
        <UserLayout>
            <div className="col-md-9 col-lg-10 form-section">
                <h3>별점 및 리뷰 작성</h3>
                <hr className="completeHr" />
                {payments.length === 0 ? (
                    <p>결제 정보가 없습니다.</p>
                ) : (
                    <div className="grid review-form">
                        <h4>서비스 품질 리뷰</h4>
                        <form onSubmit={handleSubmit} enctype="multipart/form-data">
                            <div className="item item-1 align-items-center mb-3">
                                <label htmlFor="paymentNo" className="col-form-label col-sm-3">주문 선택</label>
                                <select
                                    className="form-control col-lg-2"
                                    id="paymentNo"
                                    name="paymentNo"
                                    value={review.paymentNo}
                                    onChange={handleChange}
                                >
                                    {payments.map(payment => (
                                        payment.status === 'PAID' && (
                                            <option
                                                key={payment.paymentNo}
                                                value={payment.paymentNo}
                                                data-serviceNo={payment.serviceNo}
                                                data-partnerNo={payment.partnerNo}
                                            >
                                                {payment.title}
                                            </option>
                                        )
                                    ))}
                                </select>
                            </div>
                            <hr />
                            <div className="item item-2 align-center mb-4">
                                <label htmlFor="reviewTitle" className="col-form-label col-sm-3">리뷰 제목</label>
                                <input
                                    type="text"
                                    className="form-control col-lg-2"
                                    id="reviewTitle"
                                    name="reviewTitle"
                                    placeholder="리뷰 제목을 입력하세요"
                                    value={review.reviewTitle}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="item item-3 align-center mb-4">
                                <label htmlFor="reviewRating" className="col-form-label col-sm-3">별점 평가</label>
                                <select
                                    className="form-control col-lg-2"
                                    id="reviewRating"
                                    name="reviewRating"
                                    value={review.reviewRating}
                                    onChange={handleChange}
                                >
                                    <option value="5">★★★★★ (5)</option>
                                    <option value="4">★★★★☆ (4)</option>
                                    <option value="3">★★★☆☆ (3)</option>
                                    <option value="2">★★☆☆☆ (2)</option>
                                    <option value="1">★☆☆☆☆ (1)</option>
                                </select>
                            </div>
                            <div className="item item-4 align-center mb-4">
                                <label htmlFor="reviewContent" className="col-form-label col-sm-3">상세 리뷰</label>
                                <textarea
                                    className="form-control col-lg-2"
                                    id="reviewContent"
                                    name="reviewContent"
                                    rows="4"
                                    placeholder="다른 고객님께 도움이 되도록 서비스에 대한 솔직한 리뷰를 남겨주세요."
                                    value={review.reviewContent}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <hr className="completeHr" />
                            <div className="item item-5 align-center mb-3">
                                <label htmlFor="file-upload" className="col-form-label col-sm-3">첨부파일</label>
                                <input type="file" name="file" multiple onChange={previewThumbnail} required />
                                <div className="file-upload" id="image-thumbnail-container"></div>
                                <small className="form-text text-muted">사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 10장까지 첨부 가능합니다.</small>
                            </div>
                            <input type="hidden" id="serviceNo" name="serviceNo" value={review.serviceNo} />
                            <input type="hidden" id="partnerNo" name="partnerNo" value={review.partnerNo} />
                            <div className="form-buttons">
                                <button type="submit" className="btn btn-primary">등록하기</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </UserLayout>
    );
};

export default UserReview;
