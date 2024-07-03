import React, { useContext, useEffect, useState } from 'react';
import UpdateForm from '../../components/partner/UpdateForm';
import * as partners from '../../apis/partner/partner';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { LoginContext } from '../../components/contexts/LoginContextProvider';

const PartnerUpdateContainer = ({ userNo }) => {
  const { isLogin, roles, logout } = useContext(LoginContext);
  const [userInfo, setUserInfo] = useState(null);
  const [partnerData, setPartnerData] = useState(null); // 추가: 파트너 데이터 상태

  const navigate = useNavigate();

  const getUserInfo = async () => {
    if (!isLogin || !roles.isUser) {
      navigate("/login");
      return;
    }

    try {
      // 여기서 auth.info()는 정의되지 않았습니다. 필요한 API 호출을 여기에 추가해야 합니다.
      // const response = await auth.info();
      // setUserInfo(response.data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const getPartnerList = async () => {
    try {
      const response = await partners.partnerList(userNo);
      const data = await response.data;
      setPartnerData(data); // 파트너 데이터 업데이트
    } catch (error) {
      console.error('Error fetching partner data:', error);
    }
  }

  const updatePartnerInfo = async (form) => {
    try {
      const response = await partners.updatePartnerInfo(form);
      // data = response.data; // 이 부분은 form 데이터를 업데이트 하는 것으로 사용
      const status = response.status;
      console.log(`data : ${response.data}`);
      console.log(`status : ${status}`);

      if (status === 200) {
        console.log(`회원정보 수정 성공!`);
        Swal.fire("회원수정 성공", "로그아웃 후, 다시 로그인해주세요.", "success").then(() => { logout(true) });
      } else {
        console.log(`회원정보 수정 실패!`);
        Swal.fire("회원수정 실패", "회원수정에 실패하였습니다.", "error");
      }
    } catch (error) {
      console.error(`회원정보 수정 중 에러가 발생하였습니다: ${error}`);
    }
  }

  const deletePartner = async (userNo) => {
    try {
      const response = await partners.deletePartner(userNo);
      const status = response.status;
      console.log(`탈퇴 요청 결과 : ${status}`);
      // 목록으로 이동
      navigate("/partnerList");
    } catch (error) {
      console.error('Error deleting partner:', error);
    }
  }
  
  useEffect(() => {
    if (!isLogin) {
      return;
    }
    getUserInfo();
    getPartnerList(); // 파트너 데이터 가져오기
  }, [isLogin])

  return (
    <UpdateForm
      userNo={userNo}
      userInfo={userInfo}
      updatePartnerInfo={updatePartnerInfo}
      deletePartner={deletePartner}
    />
  );
}

export default PartnerUpdateContainer;
