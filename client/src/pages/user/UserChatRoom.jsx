import React, { useEffect, useState } from 'react';
import UserLayout from '../../layouts/UserLayout';
import '../../components/user/user.css';

const UserChatRoom = () => {
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        // 하드코딩된 채팅 데이터
        const hardcodedChatRooms = [
            {
                roomNo: '1',
                title: '채팅방 1',
                regDate: '2024-06-01T14:00:00'
            },
            {
                roomNo: '2',
                title: '채팅방 2',
                regDate: '2024-06-02T15:00:00'
            }
        ];
        setChatRooms(hardcodedChatRooms);
    }, []);

    const formatDate = (dateString) => {
        const options = { month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('ko-KR', options);
    };

    return (
        <UserLayout>
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
                                        <a
                                            className="text-decoration-none color_main"
                                            href={`/reservation/chat?roomNo=${chatRoom.roomNo}`}
                                        >
                                            {chatRoom.title}
                                        </a>
                                    </td>
                                    <td>{formatDate(chatRoom.regDate)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </UserLayout>
    );
};

export default UserChatRoom;
