import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/static/Sidebar'

const UpdateForm = ({ partnerData, updatePartnerInfo, deletePartner }) => {

  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
      setIsOpen(!isOpen)
  } 

  const [formData, setFormData] = useState({
    userName: '',
    userPhone: '',
    userEmail: '',
    userAddress: '',
    userBirth: '',
    introduce: ''
  });

  useEffect(() => {
    if (partnerData) {
      setFormData({
        userName: partnerData.userName || '',
        userPhone: partnerData.userPhone || '',
        userEmail: partnerData.userEmail || '',
        userAddress: partnerData.userAddress || '',
        userBirth: partnerData.userBirth || '',
        introduce: partnerData.introduce || ''
      });
    }
  }, [partnerData]);

  useEffect(() => {
    console.log('formData:', formData);
  }, [formData]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) month = `0${month}`;
    let day = date.getDate();
    if (day < 10) day = `0${day}`;
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePartnerInfo(formData);
      alert('정보 수정이 완료되었습니다.');
    } catch (error) {
      console.error('정보 수정 중 오류 발생:', error);
      alert('정보 수정 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async () => {
    try {
      await deletePartner();
      alert('계정이 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('파트너 삭제 중 오류 발생:', error);
      alert('파트너 삭제 중 오류가 발생했습니다.');
    }
  };

  if (!partnerData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <main className="container-fluid container">
        <div className="row">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} roles={{ isPartner: true }} />
          <div className="col-md-9 col-lg-10 form-section">
            <h3>내 정보 변경</h3>
            <form id="form" onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="userName">이름</label>
                <input type="text" className="form-control" id="userName" name="userName" value={formData.userName} onChange={handleInputChange} />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="userPhone">전화번호</label>
                <input type="text" className="form-control" id="userPhone" name="userPhone" value={formData.userPhone} onChange={handleInputChange} />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="userEmail">이메일</label>
                <input type="text" className="form-control" id="userEmail" name="userEmail" value={formData.userEmail} onChange={handleInputChange} />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="userAddress">주소</label>
                <input type="text" className="form-control" id="userAddress" name="userAddress" value={formData.userAddress} onChange={handleInputChange} />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="userBirth">생년월일</label>
                <input type="date" className="form-control" id="userBirth" name="userBirth" value={formData.userBirth ? formatDate(formData.userBirth) : ''} onChange={handleInputChange} />
              </div>
              <div className="form-group form-section p-1 f-warp text-start">
                <label htmlFor="introduce">소개 글</label>
                <textarea className="form-control w-75" id="introduce" name="introduce" rows="3" value={formData.introduce} onChange={handleInputChange}></textarea>
              </div>
              <div className="form-buttons">
                <Link to="/partnerMypage" className="btn btn-secondary cancel">뒤로가기</Link>
                <button type="button" className="btn btn-danger cancel" onClick={handleDelete}>탈퇴하기</button>
                <button type="submit" className="btn btn-primary sessuce color_main" name="action">정보 수정</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UpdateForm;
