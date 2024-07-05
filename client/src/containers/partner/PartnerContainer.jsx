import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as partnersApi from '../../apis/partner/partner';
import PartnerMypage from '../../components/partner/PartnerMyPage';

const PartnerContainer = () => {
  const { userNo } = useParams();
  const [partnerData, setPartnerData] = useState(null); // 초기 상태를 null로 설정

  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        const response = await partnersApi.partnerMypage(userNo);
        const data = response.data; // API 응답에서 데이터 추출
        console.log('파트너 정보:', data);
        setPartnerData(data); // 데이터 설정
      } catch (error) {
        console.error('파트너 정보를 불러오는 중 에러 발생:', error);
      }
    };

    fetchPartnerData(); // useEffect 내부에서 호출

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userNo]); // userNo가 변경될 때마다 호출

  return <PartnerMypage partnerData={partnerData} />; // PartnerMypage 컴포넌트에 partnerData 전달
};

export default PartnerContainer;
