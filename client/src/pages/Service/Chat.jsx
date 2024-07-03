import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import ChatContainer from '../../containers/Service/ChatContainer'
import { useParams } from 'react-router-dom'

const Chat = () => {
  const { roomNo } = useParams()

  return (
      <MainLayout>
        <ChatContainer
          roomNo={roomNo}
        />
      </MainLayout>
    )
}

export default Chat