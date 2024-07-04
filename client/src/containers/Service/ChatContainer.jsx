import React, { useEffect, useState } from 'react'
import ChatForm from '../../components/Service/ChatForm'
import * as Services from '../../apis/Services/Services'

const ChatContainer = ({ roomNo }) => {
  const [chatList, setChatList] = useState([])
  const [partner, setPartner] = useState(null)
  const [user, setUser] = useState(null)
  const [chatRooms, setChatRooms] = useState(null)

  // 채팅 조회
  const getChatList = async () => {
    try {
      const response = await Services.selectChatData(roomNo)
      const data = response.data
      setChatRooms(data.chatRooms)
      setChatList(data.chatList)
      setPartner(data.partner)
      setUser(data.user)
    } catch (e) {
      console.error(`채팅 조회 중 에러 발생... ${e}`)
    }
  }

  useEffect(() => {
    getChatList()

    
  }, [roomNo])

  return (
    <ChatForm 
      chatRooms={chatRooms}
      roomNo={roomNo} 
      chatList={chatList} 
      setChatList={setChatList}
      partner={partner}
      user={user}
    />
  )
}

export default ChatContainer
