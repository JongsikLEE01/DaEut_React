import React, { useState } from 'react';
import { submitPartnerRequest } from '../../apis/Users/User';
import UserPartnerForm from '../../components/user/UserPartnerForm';
import Swal from 'sweetalert2';

const UserPartnerContainer = () => {
  const [thumbnailPreview, setThumbnailPreview] = useState('/img/partner.png');

  const handleSubmit = (formData) => {
    submitPartnerRequest(formData)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: '파트너 신청이 완료되었습니다!',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(error => {
        console.error('파트너 신청 중 오류가 발생했습니다:', error);
        Swal.fire({
          icon: 'error',
          title: '파트너 신청 중 오류가 발생했습니다.',
          text: error.message,
          confirmButtonText: '확인'
        });
      });
  };

  return (
    <div className="container">
      <h3>파트너 신청</h3>
      <ul style={{ padding: 0, color: 'red' }}>
        파트너 신청 주의 사항
        <li style={{ listStyleType: 'none', color: 'black' }}>1. 파트너 임을 입증할 수 있는 파일을 등록해주세요.</li>
        <li style={{ listStyleType: 'none', color: 'black' }}>2. 파트너 신청을 여러번 할 경우 불이익이 따를 수 있습니다.</li>
        <li style={{ listStyleType: 'none', color: 'black' }}>3. 파트너 승인이 됐을 경우, 재로그인 시 파트너 화면으로 로그인 됩니다.</li>
      </ul>
      <div className="d-flex justify-content-center">
        <div className="col-md-3 mt-5" id="image-thumbnail-container">
          <img src={thumbnailPreview} alt="파트너 이미지" className="profile-img img-thumbnail" />
        </div>
        <div className="col-md-8">
          <UserPartnerForm onSubmit={handleSubmit} setThumbnailPreview={setThumbnailPreview} />
        </div>
      </div>
    </div>
  );
};

export default UserPartnerContainer;
