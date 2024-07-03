import React, { useEffect, useState } from 'react'
import ChatForm from '../../components/Service/ChatForm'
import * as Services from '../../apis/Services/Services'

const ChatContainer = ({ roomNo }) => {
  const [chatList, setChatList] = useState([])
  const [partner, setPartner] = useState([])
  const [user, setUser] = useState([])
  const [chatRooms, setChatRooms] = useState([])

  // 채팅 조회
  const getChatList = async () => {
    try {
      const response = await Services.selectChatData(roomNo)
      const data = response.data
      const chatRooms = data.chatRooms
      const chatList = data.chatList
      const partner = data.partner
      const user = data.user

      setChatRooms(chatRooms)
      setChatList(chatList)
      setPartner(partner)
      setUser(user)
    } catch (e) {
      console.error(`채팅 조회 중 에러 발생... ${e}`)
    }
  }

  // 푸시 알림 허용 요청   
  if (Notification.permission !== 'granted') {
    try {
      // 크롬 에러 체크
      Notification.requestPermission().then((permission) => {
        if (permission !== 'granted')
          return
      })
    } catch (e) {
      // 사파리 에러 체크  
      if (e instanceof TypeError) {
        Notification.requestPermission((permission) => {
          if (permission !== 'granted')
            return
        })
      } else {
        console.error(e)
      }
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