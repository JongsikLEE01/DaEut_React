// src/containers/Tip/TipReadContainer.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import TipRead from '../../components/tip/TipRead';

const TipReadContainer = () => {
  const { boardNo } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [replyList, setReplyList] = useState([]);
  const [newReply, setNewReply] = useState('');

  useEffect(() => {
    if (!boardNo) {
      console.error('Board number is null or undefined');
      return;
    }
    
    const fetchBoardDetails = async () => {
      try {
        const boardResponse = await axios.get(`/tip/boards/${boardNo}`);
        setBoard(boardResponse.data.board);
        setFileList(boardResponse.data.fileList);
        setReplyList(boardResponse.data.replyList);
      } catch (error) {
        console.error('Error fetching board details:', error);
      }
    };

    fetchBoardDetails();
  }, [boardNo]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handleDelete = async () => {
    try {
      await axios.post('/tip/tipDelete', { boardNo });
      navigate('/tip/boards');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleNewReplyChange = (e) => {
    setNewReply(e.target.value);
  };

  const handleReplySubmit = async () => {
    try {
      const userId = document.getElementById('loggedInUserId').value;
      const userNo = document.getElementById('loggedInUserNo').value;
      await axios.post('/reply/insert', {
        boardNo,
        userId,
        userNo,
        replyContent: newReply,
      });
      setNewReply('');
      // Refresh reply list
      const updatedReplies = await axios.get(`/reply/list?boardNo=${boardNo}`);
      setReplyList(updatedReplies.data);
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.put(`/tip/boards/${boardNo}/like`);
      if (response.data.success) {
        setBoard((prevBoard) => ({
          ...prevBoard,
          boardLike: prevBoard.boardLike + 1,
        }));
      }
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  const renderReplies = (replyList) => {
    const sortedReplies = replyList.sort((a, b) => a.parentNo - b.parentNo);
    return sortedReplies.map((reply) => (
      <div key={reply.replyNo} className={reply.parentNo ? 'reply answer' : 'reply'}>
        <p><strong>{reply.userId}</strong></p>
        <p>{reply.replyContent}</p>
        <div className="comment-actions">
          <span>{new Date(reply.replyRegDate).toLocaleDateString()}</span>
          <button type="button" onClick={() => console.log('답글달기')}>답글달기</button>
          <button type="button" onClick={() => console.log('수정')}>수정</button>
          <button type="button" onClick={() => console.log('삭제')}>삭제</button>
        </div>
      </div>
    ));
  };

  return (
    <TipRead
      board={board}
      fileList={fileList}
      replyList={replyList}
      newReply={newReply}
      handleNewReplyChange={handleNewReplyChange}
      handleReplySubmit={handleReplySubmit}
      handleLike={handleLike}
      handleDelete={handleDelete}
      formatDate={formatDate}
      renderReplies={renderReplies}
    />
  );
};

export default TipReadContainer;
