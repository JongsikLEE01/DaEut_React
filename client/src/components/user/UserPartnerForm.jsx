import React, { useState } from 'react';

const UserPartnerForm = ({ onSubmit, setThumbnailPreview }) => {
  const [formData, setFormData] = useState({
    partnerCareer: '',
    introduce: '',
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profilePicture: file
    });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('partner', new Blob([JSON.stringify({
      partnerCareer: formData.partnerCareer,
      introduce: formData.introduce,
      userNo: formData.userNo // 필요한 경우
    })], { type: "application/json" }));
    
    if (formData.profilePicture) {
      formDataObj.append('profilePicture', formData.profilePicture);
    }
    
    onSubmit(formDataObj);
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className='paddingGive'>
      <div className="form-group form-section p-1 mt-5 text-start">
        <label htmlFor="partnerName">이름</label>
        <input type="text" className="form-control" id="partnerName" value="김유저" readOnly />
      </div>
      <div className="form-group form-section p-1 text-start">
        <label htmlFor="partnerAddress">주소</label>
        <input type="text" className="form-control" id="partnerAddress" value="서울특별시" readOnly />
      </div>
      <div className="form-group form-section p-1 text-start">
        <label htmlFor="contact">연락처</label>
        <input type="text" className="form-control" id="contact" value="010-1234-5678" readOnly />
      </div>
      <div className="form-group form-section p-1 text-start">
        <label htmlFor="experience">경력 사항</label>
        <input type="text" className="form-control" id="experience" name="partnerCareer" value={formData.partnerCareer} onChange={handleChange} placeholder="경력 사항을 입력해주세요" />
      </div>
      <div className="form-group form-section p-1 f-warp text-start">
        <label htmlFor="description">소개 글</label>
        <textarea className="form-control w-75" id="description" name="introduce" value={formData.introduce} onChange={handleChange} rows="3"></textarea>
      </div>
      <div className="form-group form-section p-1 f-warp text-start">
        <label htmlFor="file">프로필 사진</label>
        <input type="file" className="form-control" id="profilePicture" name="profilePicture" accept="image/*" onChange={handleFileChange} required />
      </div>
      <div className="buttons mb-5 d-flex gap-3 justify-content-end">
        <button type="submit" className="btn btn-primary sessuce color_main">신청하기</button>
      </div>
    </form>
  );
};

export default UserPartnerForm;
