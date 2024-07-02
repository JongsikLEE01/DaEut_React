import React from 'react'
import PartnerList from '../components/partner/PartnerList'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import * as partners from '../../apis/partner/partner'


const PartnerContainer = ( {userNo}) => {
  const { userNo } = useParams();
  const [partnerData ,setPartnerData] = useState({})

  // 함수
  const getPartnerList = async () => {
    try {
      const response = await partners.partnerList(userNo);
      const data = await response.data;
      setPartnerData(data);
    } catch (error) {
      console.error('Error fetching partner data:', error);
    }
  }

  useEffect( () => {
    getPartnerList()
  },[userNo]);

  return (
    <PartnerList
    partnerData={partnerData}
    />
  );
};

export default PartnerContainer