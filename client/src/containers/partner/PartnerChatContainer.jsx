import React, { useContext, useEffect, useState } from 'react'
import PartnerChatList from '../../components/partner/PartnerChatList'
import * as partner from '../../apis/partner/partner'
import { LoginContext } from '../../components/contexts/LoginContextProvider'

const PartnerChatContainer = () => {
  const [chatRoomList, setchatRoomList] = useState([])
  const { userInfo } = useContext(LoginContext)


  const getChatList = async (partnerNo) => {
    const response = await partner.selectChatList(partnerNo)
    const chatRoomList = response.data 

    console.log(chatRoomList)

    setchatRoomList(chatRoomList)
  }

  useEffect(()=>{
    if(userInfo){
      const partnerNo = userInfo.partnerNo
  
      getChatList(partnerNo)
    }
  },[userInfo])

  return (
    <>
      <PartnerChatList
        chatRoomList={chatRoomList}
      />
    </>
  )
}

export default PartnerChatContainer