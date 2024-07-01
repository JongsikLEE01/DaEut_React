import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const UpdateForm = () => {
  const { userNo } = useParams();

  const [user, setUser] = useState({
    userNo: '',
    userId: '',
    partnerNo: '',
    userName: '',
    userPhone: '',
    userEmail: '',
    userAddress: '',
    userBirth: '',
  });

  const [partner, setPartner] = useState({
    userNo: '',
    introduce: '',
  });

  useEffect(() => {
    // 여기서 API 호출 등을 통해 사용자 정보를 가져옵니다.
    // 예시로 데이터를 설정합니다.
    setUser({
      userNo: userNo,
      userId: 'sampleId',
      partnerNo: 'partnerNo',
      userName: 'sampleName',
      userPhone: '010-1234-5678',
      userEmail: 'sample@example.com',
      userAddress: 'sample address',
      userBirth: '1990-01-01',
      introduce: 'Sample introduction',
    });
  }, [userNo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handlePartnerChange = (e) => {
    const { name, value } = e.target;
    setPartner((prevPartner) => ({
      ...prevPartner,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 사용자 정보 업데이트 API 호출
    console.log('User submitted', user);
    // 파트너 정보 업데이트 API 호출
    console.log('Partner submitted', partner);
  };

  const handleDelete = () => {
    if (window.confirm('정말로 탈퇴하시겠습니까?')) {
      // API 호출 등을 통해 탈퇴 처리를 합니다.
      console.log('User deleted');
    }
  };

  return (
    <div>
      <button className="btn btn-primary toggle-btn menu mt-2 ml-2 myBtn" id="toggle-btn" onClick={() => toggleSidebar()}>
        메뉴
      </button>
      <main className="container-fluid container">
        <div className="row">
          <nav className="col-md-3 col-lg-2 sidebar" id="sidebar">
            <button className="btn btn-danger d-block d-md-none cancel" onClick={() => toggleSidebar()}>닫기</button>
            <h5>마이페이지</h5>
            <br />
            <Link to="/partner/partnerMypage" className="active partnerMypage">내 정보 변경</Link>
            <Link to="/partner/partnerReservation">내 예약 보기</Link>
            <Link to="/partner/partnerReview">내 리뷰 보기</Link>
            <Link to="/partner/partnerChatRoom">채팅 내역</Link>
          </nav>
          <div className="col-md-9 col-lg-10 form-section">
            <h3>내 정보 변경</h3>
            <form id="form" onSubmit={handleSubmit}>
              <input type="hidden" name="userNo" value={user.userNo} />
              <input type="hidden" name="userId" value={user.userId} />
              <input type="hidden" name="partnerNo" value={partner.partnerNo} />
              <div className="form-group mb-3">
                <label htmlFor="userid">아이디</label>
                <input type="text" className="form-control" id="userid" placeholder={user.userId} disabled />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="userName">이름</label>
                <input type="text" className="form-control" id="userName" name="userName" value={user.userName} onChange={handleUserChange} />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="userPhone">전화번호</label>
                <input type="text" className="form-control" id="userPhone" name="userPhone" value={user.userPhone} onChange={handleUserChange} />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="userEmail">이메일</label>
                <input type="text" className="form-control" id="userEmail" name="userEmail" value={user.userEmail} onChange={handleUserChange} />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="userAddress">주소</label>
                <input type="text" className="form-control" id="userAddress" name="userAddress" value={user.userAddress} onChange={handleUserChange} />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="userBirth">생년월일</label>
                <input type="date" className="form-control" id="userBirth" name="userBirth" value={user.userBirth} onChange={handleUserChange} />
              </div>
              <div className="form-group form-section p-1 f-warp text-start">
                <label htmlFor="description">소개 글</label>
                <textarea className="form-control w-75" name="introduce" id="description" rows="3" value={partner.introduce} onChange={handlePartnerChange}></textarea>
              </div>
              <div className="form-buttons">
                <Link to="partnerMypage" className="btn btn-secondary cancel">뒤로가기</Link>
                <button type="button" className="btn btn-danger cancel" onClick={handleDelete}>탈퇴하기</button>
                <button type="submit" className="btn btn-primary sessuce color_main" name="action" value={partner.partnerNo}>정보 수정</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UpdateForm;