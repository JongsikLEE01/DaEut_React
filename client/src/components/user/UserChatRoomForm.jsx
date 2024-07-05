import React from 'react';
import { Link } from 'react-router-dom';

const UserChatRoomForm = ({ chatRooms }) => {
  return (
    <div className="container-fluid container">
      <div className="row">
        <div className="col-md-9 col-lg-10 form-section" id="chatRoomSection">
          <h3>채팅 내역</h3>
          <p>채팅 제목을 눌러서 채팅창으로 이동 할 수 있어요</p>
          <br />
          <table className="table table-sm table-hover">
            <thead className="table-light">
              <tr>
                <th>No.</th>
                <th>내 채팅방</th>
                <th>채팅 시작일</th>
              </tr>
            </thead>
            <tbody>
              {chatRooms.length === 0 ? (
                <tr>
                  <td colSpan="3">채팅 내역이 비어있어요</td>
                </tr>
              ) : (
                chatRooms.map((chatRoom, index) => (
                  <tr key={chatRoom.roomNo}>
                    <td>{index + 1}</td>
                    <td>
                      <Link
                        className="text-decoration-none color_main"
                        to={`/chat/${chatRoom.roomNo}`}
                      >
                        {chatRoom.title}
                      </Link>
                    </td>
                    <td>{new Date(chatRoom.regDate).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserChatRoomForm;
