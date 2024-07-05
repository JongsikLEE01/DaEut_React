import React, { useContext, useEffect, useState } from 'react';
import UpdateForm from '../../components/partner/UpdateForm';
import * as partners from '../../apis/partner/partner';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { LoginContext } from '../../components/contexts/LoginContextProvider';

const PartnerUpdateContainer = () => {
  const { isLogin, logout } = useContext(LoginContext);
  const [partnerData, setPartnerData] = useState(null);
  const { userNo } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await partners.partnerMypage(userNo);
        setPartnerData(response.data);
      } catch (error) {
        console.error('Error fetching partner data:', error);
      }
    };

    fetchData();
  }, [isLogin, userNo, navigate]);

  const updatePartnerInfo = async (formData) => {
    try {
      const response = await partners.updatePartnerInfo(userNo, formData); // userNo를 함께 전달
      const status = response.status;
      if (status === 200) {
        Swal.fire('회원정보 수정 성공', '로그아웃 후, 다시 로그인해주세요.', 'success').then(() => {
          logout(true);
        });
      } else {
        Swal.fire('회원정보 수정 실패', '회원정보 수정에 실패하였습니다.', 'error');
      }
    } catch (error) {
      console.error(`회원정보 수정 중 에러가 발생하였습니다: ${error}`);
    }
  };

  const deletePartner = async () => {
    try {
      const response = await partners.deletePartner(userNo);
      const status = response.status;
      if (status === 200) {
        navigate('/partnerMypage');
      }
    } catch (error) {
      console.error('Error deleting partner:', error);
    }
  };

  return <UpdateForm partnerData={partnerData} updatePartnerInfo={updatePartnerInfo} deletePartner={deletePartner} />;
};

export default PartnerUpdateContainer;
