import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import TipRead from '../../components/tip/TipRead';
import Swal from 'sweetalert2';

const TipReadContainer = () => {
  const { boardNo } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [replyList, setReplyList] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [editingReply, setEditingReply] = useState(null);
  const [replyParentNo, setReplyParentNo] = useState(null);

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
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/tip/boards/${boardNo}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      navigate('/tip/boards');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleDeleteConfirm = () => {
    Swal.fire({
      title: '게시글을 삭제하시겠습니까?',
      text: '삭제하면 되돌릴 수 없습니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      }
    });
  };

  const handleNewReplyChange = (e) => {
    setNewReply(e.target.value);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const userNo = 0;
      const formData = new URLSearchParams();
      formData.append('boardNo', boardNo);
      formData.append('replyContent', newReply);
      formData.append('userNo', userNo);

      await axios.post('http://localhost:8080/tip/replies', formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      setNewReply('');
      const updatedReplies = await axios.get(`/reply/list?boardNo=${boardNo}`);
      setReplyList(updatedReplies.data);
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const handleReplyReplySubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const userNo = 0;
      const formData = new URLSearchParams();
      formData.append('boardNo', boardNo);
      formData.append('replyContent', replyContent);
      formData.append('userNo', userNo);

      await axios.post(`http://localhost:8080/tip/replies/${replyParentNo}`, formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      setReplyContent('');
      setReplyParentNo(null);
      const updatedReplies = await axios.get(`/reply/list?boardNo=${boardNo}`);
      setReplyList(updatedReplies.data);
    } catch (error) {
      console.error('Error adding reply reply:', error);
    }
  };

  const handleReplyEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new URLSearchParams();
      formData.append('replyContent', replyContent);

      await axios.put(`http://localhost:8080/tip/replies/${editingReply}`, formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      setReplyContent('');
      setEditingReply(null);
      const updatedReplies = await axios.get(`/reply/list?boardNo=${boardNo}`);
      setReplyList(updatedReplies.data);
    } catch (error) {
      console.error('Error editing reply:', error);
    }
  };

  const handleReplyDelete = async (replyNo) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/tip/replies/${replyNo}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      const updatedReplies = await axios.get(`/reply/list?boardNo=${boardNo}`);
      setReplyList(updatedReplies.data);
    } catch (error) {
      console.error('Error deleting reply:', error);
    }
  };

  const handleLike = async (event) => {
    const boardNo = event.currentTarget.getAttribute('data-board-no');
    const token = localStorage.getItem('token');
    const userNo = 0;

    try {
      const response = await fetch(`/boards/${boardNo}/like?userNo=${userNo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${response.status} - ${errorData.message}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
      alert(`추천 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  const renderReplies = (replyList) => {
    const sortedReplies = replyList.sort((a, b) => a.parentNo - b.parentNo);
    return sortedReplies.map((reply) => (
      <div key={reply.replyNo} className={reply.parentNo ? 'reply answer' : 'reply'}>
        <p><strong>{reply.userId}</strong></p>
        {editingReply === reply.replyNo ? (
          <form onSubmit={handleReplyEditSubmit}>
            <textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} />
            <button type="submit">저장</button>
            <button type="button" onClick={() => setEditingReply(null)}>취소</button>
          </form>
        ) : (
          <>
            <p>{reply.replyContent}</p>
            <div className="comment-actions">
              <span>{new Date(reply.replyRegDate).toLocaleDateString()}</span>
              <button type="button" onClick={() => { setReplyParentNo(reply.replyNo); setReplyContent(''); }}>답글달기</button>
              <button type="button" onClick={() => { setEditingReply(reply.replyNo); setReplyContent(reply.replyContent); }}>수정</button>
              <button type="button" onClick={() => handleReplyDelete(reply.replyNo)}>삭제</button>
            </div>
          </>
        )}
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
      handleDelete={handleDeleteConfirm}
      formatDate={formatDate}
      renderReplies={renderReplies}
      handleReplyReplySubmit={handleReplyReplySubmit}
      replyContent={replyContent}
      setReplyContent={setReplyContent}
      replyParentNo={replyParentNo}
      setReplyParentNo={setReplyParentNo}
      editingReply={editingReply}
      setEditingReply={setEditingReply}
    />
  );
};

export default TipReadContainer;
