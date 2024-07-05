import React, { useState } from 'react';
import { submitUserReview } from '../../apis/Users/User';
import Swal from 'sweetalert2';

const UserReviewForm = ({ payments, initialReview }) => {
  const [formState, setFormState] = useState(initialReview);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });

    if (name === 'paymentNo') {
      const selectedPayment = payments.find(payment => payment.paymentNo === value);
      if (selectedPayment) {
        setFormState({
          ...formState,
          paymentNo: value,
          serviceNo: selectedPayment.serviceNo,
          partnerNo: selectedPayment.partnerNo,
        });
      }
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFormState({ ...formState, files });

    // 썸네일 미리보기 설정
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => setThumbnailPreview(e.target.result);
      reader.readAsDataURL(files[0]);  // 첫 번째 파일을 썸네일로 사용
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      'review', 
      new Blob([JSON.stringify(formState)], { 
        type: 'application/json' }));
    
    if (formState.files) {
      for (let i = 0; i < formState.files.length; i++) {
        formData.append('files', formState.files[i]);
      }
    }

    try {
      await submitUserReview(formData);
      Swal.fire({
        icon: 'success',
        title: '리뷰가 성공적으로 제출되었습니다!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '리뷰 제출 중 오류가 발생했습니다.',
        text: error.message,
        confirmButtonText: '확인'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="item item-1 align-items-center mb-3">
        <label htmlFor="paymentNo" className="col-form-label col-sm-3">주문 선택</label>
        <select
          className="form-control col-lg-2"
          id="paymentNo"
          name="paymentNo"
          value={formState.paymentNo || ''}
          onChange={handleChange}
        >
          {payments.map((payment) => (
            <option
              key={payment.paymentNo}
              value={payment.paymentNo}
              data-serviceno={payment.serviceNo}
              data-partnerno={payment.partnerNo}
            >
              {payment.title}
            </option>
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
          value={formState.reviewTitle || ''}
          onChange={handleChange}
        />
      </div>
      <div className="item item-3 align-center mb-4">
        <label htmlFor="reviewRating" className="col-form-label col-sm-3">별점 평가</label>
        <select
          className="form-control col-lg-2"
          id="reviewRating"
          name="reviewRating"
          value={formState.reviewRating || ''}
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
          value={formState.reviewContent || ''}
          onChange={handleChange}
        ></textarea>
      </div>
      <hr className="completeHr" />
      <div className="item item-5 align-center mb-3">
        <label htmlFor="file-upload" className="col-form-label col-sm-3">첨부파일</label>
        <input type="file" name="files" multiple onChange={handleFileChange} />
        <div className="file-upload" id="image-thumbnail-container">
          {thumbnailPreview && <img src={thumbnailPreview} alt="Thumbnail Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
        </div>
        <small className="form-text text-muted">사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 10장까지 첨부 가능합니다.</small>
      </div>
      <input type="hidden" id="serviceNo" name="serviceNo" value={formState.serviceNo || ''} />
      <input type="hidden" id="partnerNo" name="partnerNo" value={formState.partnerNo || ''} />
      <div className="form-buttons">
        <button type="submit" className="btn btn-primary">등록하기</button>
      </div>
    </form>
  );
};

export default UserReviewForm;
