import React, { useEffect, useState } from 'react'
import ChatForm from '../../components/Service/ChatForm'
import * as Services from '../../apis/Services/Services'

const ChatContainer = ({ roomNo }) => {
  const [chatList, setChatList] = useState([])

  // 채팅 조회
  const getChatList = async () => {
    try {
      const response = await Services.selectChatData(roomNo)
      const data = response.data
      const chatList = data.chatList

      setChatList(chatList)
    } catch (e) {
      console.error(`채팅 조회 중 에러 발생... ${e}`)
    }
  }

  useEffect(() => {
    getChatList()
  }, [roomNo])

  return (
    <ChatForm 
      roomNo={roomNo} 
      chatList={chatList} 
      setChatList={setChatList}
    />
  )
}

export default ChatContainer