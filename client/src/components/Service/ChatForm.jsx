import React, { useState, useEffect, useRef, useContext } from 'react'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import { LoginContext } from '../contexts/LoginContextProvider'
import useNotification from '../../hooks/useNotification'

const ChatForm = ({ chatRooms, roomNo, chatList, setChatList }) => {
  const [message, setMessage] = useState('')
  const [stompClient, setStompClient] = useState(null)
  const chatAreaRef = useRef(null)
  const { userInfo } = useContext(LoginContext)
  const pushNotification = useNotification();

  // 메세지 전송
  const sendMessage = () => {
    if (stompClient && stompClient.connected && message.trim()) {
      stompClient.send("/pub/sendMessage", {}, JSON.stringify({
        roomNo: roomNo,
        chatContent: message,
        userNo: userInfo.userNo,
        chatRegDate: getCurrentTime()
      }))
      setMessage('')
    }
  }

  // 현재 시간 가져오기
  function getCurrentTime() {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  // 돌아가기
  const onHistoryBack = () => {
    return window.history.back()
  }

  // 엔터키 전송
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  useEffect(() => {
    // 페이지가 로딩될 소켓 연결 함수 호출
    const socket = new SockJS('http://localhost:8080/chat')
    const client = Stomp.over(socket)

    client.connect({}, frame => {
      console.log('웹 소켓 연결... ' + frame)
      client.subscribe(`/sub/chat/${roomNo}`, message => {
        const newChat = JSON.parse(message.body)

        
        if(userInfo?.userNo != newChat?.userNo){
          console.log(newChat);
          // 푸쉬알림 전송
          pushNotification('새로운 메시지가 도착했어요!', {
            body: `${userInfo.userName} : ${newChat.chatContent}`
          }, roomNo)
        }
        
        // 새로운 메시지를 기존 채팅 리스트에 추가
        setChatList(prevChatList => [...prevChatList, newChat])
      })
    })
    setStompClient(client)

    return () => {
      client.disconnect(() => {
        console.log('소켓 연결 해제...')
      })
    }
  }, [])

  // 채팅 메시지가 추가될 때마다 스크롤을 자동으로 아래로 이동
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight
    }
  }, [chatList])

  return (
    <div className="chatbox">
      <div className="chat-header">
        <div className="chat-partner-info">
          <span className="partner-name-chat">{chatRooms?.title}</span>
        </div>
      </div>
      <div className="chat-box" id="messages">
        <div id="chatArea" className="chatArea" ref={chatAreaRef}>
          {chatList && chatList.map((chat, chatKey) => (
            <div key={chatKey} className={`message ${chat.userNo === userInfo?.userNo ? 'my-message' : 'other-message'}`}>
              <span className="message-content">{chat.chatContent}</span>
              <span className="message-date">{chat.chatRegDate.split(' ')[1].slice(0, 5)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="input-box">
        <input
          type="text"
          name="chatcontent"
          id="message"
          placeholder="부적절한 메세지는 삭제 처리됩니다."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button type="button" className="sendchat" id="send" onClick={sendMessage}>전송</button>
      </div>
      <div className="button-box">
        <button className="goback" onClick={onHistoryBack}>돌아가기</button>
      </div>
    </div>
  )
}

export default ChatForm
