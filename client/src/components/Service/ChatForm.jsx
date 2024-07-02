import React, { useState, useEffect, useRef } from 'react'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import { Stomp } from "@stomp/stompjs";
import { useLocation } from 'react-router-dom'

const ChatForm = () => {

  return (
    <div className="container">
      <div className="chatbox">
        <div className="chat-header">
          <div className="chat-partner-info">
            <span className="partner-name-chat">{roomNo}</span>
          </div>
        </div>
        <div className="chat-box" id="messages">
          <div id="chatArea" className="chatArea" ref={chatAreaRef}>
            {chatList.map((chat, index) => (
              <div key={index} className={`message ${chat.userNo === userNo ? 'my-message' : 'other-message'}`}>
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
          <button className="goback" onClick={() => window.history.back()}>돌아가기</button>
        </div>
      </div>
    </div>
  )
}

export default ChatForm
