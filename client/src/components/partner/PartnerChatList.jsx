import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/static/Sidebar'
import { Link } from 'react-router-dom';

const PartnerChatList = ({ chatRoomList }) => {
    const [isOpen, setIsOpen] = useState(true)

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

  return (
      <main className="container-fluid container">
        <div className="row">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} roles={{ isPartner: true }} />
          <div className="col-md-9 col-lg-10 form-section chatListTable">
            <h3>채팅 내역</h3>
            <table className="table table-sm table-hover">
              <thead className="table-light">
                <tr>
                  <th>No.</th>
                  <th>내 채팅방</th>
                  <th>채팅 시작일</th>
                </tr>
              </thead>
              <tbody>
                {
                  chatRoomList.length === 0 ? 
                  (
                    <tr>
                      <td colSpan="3">채팅 내역이 비어있어요</td>
                    </tr>
                  ) 
                  : 
                  (
                    chatRoomList.map((chatRoom, index) => (
                      <tr key={chatRoom.roomNo}>
                        <td>{index + 1}</td>
                        <td>
                          <Link className="text-decoration-none color_main" to={`/chat/${chatRoom.roomNo}`}>
                            {chatRoom.title}
                          </Link>
                        </td>
                        <td>{new Date(chatRoom.regDate).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })}</td>
                      </tr>
                    ))
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </main>

  );
};

export default PartnerChatList;
