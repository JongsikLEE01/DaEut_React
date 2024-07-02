import React, { useState } from 'react'
import UpdateForm from '../../components/UpdateForm'
import * as partners from '../../apis/partner'
import { useNavigate } from 'react-router-dom'

const PartnerUpdateContainer = ( userNo ) => {
  // state
  const [partnerData,setPartnerData ] =useState({})

  // 함수
  const navigate = useNavigate();

  const getPartnerList = async () => {
    try {
      const response = await partners.partnerList(userNo);
      const data = await response.data;
      setPartnerData(data);
    } catch (error) {
      console.error('Error fetching partner data:', error);
    }
  }

  // 수정
  const updatePartnerInfo = async () => {
    
  }


  // 탈퇴
  const deletePartner = async (userNo) => {
    const response = await partners.deletePartner(userNo)
    const status = await response.status
    console.log(`탈퇴 요청 결과 : ${status}`)

    // 목록으로 이동
    navigate("/partnerList")
  }

  useEffect (()=>{
    getPartnerList()
  },[])

    return (
    <UpdateForm userNo={userNo}
    partnerData={partnerData}
    deletePartner={deletePartner}/>
  )
}

export default PartnerUpdateContainer