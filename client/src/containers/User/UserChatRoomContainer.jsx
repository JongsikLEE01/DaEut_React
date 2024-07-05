import React, { useEffect, useState } from 'react';
import { getUserChatRooms } from '../../apis/Users/User';
import UserChatRoomForm from '../../components/user/UserChatRoomForm';

const UserChatRoomContainer = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await getUserChatRooms();
        setChatRooms(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatRooms();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading chat rooms</p>;
  }

  return <UserChatRoomForm chatRooms={chatRooms} />;
};

export default UserChatRoomContainer;
