import React, { useState, useEffect, useRef } from 'react'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'

const ChatForm = ({ chatRooms, roomNo, chatList, partner, user }) => {
  const [message, setMessage] = useState('')
  const [stompClient, setStompClient] = useState(null)
  const chatAreaRef = useRef(null)

  const pushAlarm = (newChat) => {
    const notification = new Notification('새로운 메시지 도착가 도착했어요!', {
      body: `${partner.userName}: ${newChat.chatContent}`
    });

    notification.onclick = () => {
      // 알림 클릭 시 추가 동작을 정의할 수 있습니다.
      console.log('알림이 클릭되었습니다.');
    }
  }

  // 메세지 전송
  const sendMessage = () => {
    if (stompClient && stompClient.connected) {
      stompClient.send("/pub/sendMessage", {}, JSON.stringify({
        roomNo: roomNo,
        chatContent: message,
        userNo: 2,
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

  // 페이지가 로딩될 때 웹 소켓 연결
  useEffect(() => {
    // 소켓 연결 로직
    const socket = new SockJS('http://localhost:8080/chat')
    const client = Stomp.over(socket)

    client.connect({}, frame => {
      console.log('Connected: ' + frame)
      client.subscribe(`/sub/chat/${roomNo}`, message => {
        const newChat = JSON.parse(message.body)
        // 푸쉬알림 전송
        pushAlarm(newChat)
      })
    })
    setStompClient(client)

    return () => {
      client.disconnect(() => {
        console.log('소켓 연결 해제...')
      })
    }
  }, [roomNo])

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
            <span className="partner-name-chat">{chatRooms.title}</span>
          </div>
        </div>
        <div className="chat-box" id="messages">
          <div id="chatArea" className="chatArea" ref={chatAreaRef}>
            {chatList.map((chat) => (
              <div key={chat.chatNo} className={`message ${chat.userNo === 1 ? 'my-message' : 'other-message'}`}>
                {chat.userNo !== user.userNo && (
                  <span className="partner-name">{partner.userName}</span>
                )}
                {chat.userNo === partner.userNo && (
                  <span className="partner-name">{user.userName}</span>
                )}
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