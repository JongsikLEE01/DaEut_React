import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import TipRead from '../../components/tip/TipRead';
import Swal from 'sweetalert2';
import { LoginContext } from '../../components/contexts/LoginContextProvider';
import * as board from '../../apis/tips/board'; // API 모듈 임포트

const TipReadContainer = () => {
  const { boardNo } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(LoginContext); // 컨텍스트에서 userInfo 가져오기
  const [boardData, setBoardData] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [replyList, setReplyList] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [editingReply, setEditingReply] = useState(null);
  const [replyParentNo, setReplyParentNo] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    if (!boardNo) {
      console.error('Board number is null or undefined');
      return;
    }
    fetchBoardDetails();
  }, [boardNo]);

  const fetchBoardDetails = async () => {
    try {
      setIsLoading(true); // 로딩 시작
      const response = await axios.get(`/tip/boards/${boardNo}`);
      console.log('Response data:', response.data); // 응답 데이터 확인
      const { board, fileList, replyList } = response.data;
      setBoardData(board);
      setFileList(fileList);
      setReplyList(replyList);
    } catch (error) {
      console.error('Error fetching board details:', error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/tip/boards/${boardNo}`, {
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

  const handleNewReplyChange = (e) => setNewReply(e.target.value);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const userNo = userInfo?.userNo;
      if (!userNo) {
        console.error('User number not found');
        return;
      }
      const formData = new URLSearchParams();
      formData.append('boardNo', boardNo);
      formData.append('replyContent', newReply);
      formData.append('userNo', userNo);

      await axios.post('/tip/replies', formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      setNewReply('');
      updateReplies();
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const handleReplyReplySubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const userNo = userInfo?.userNo;
      if (!userNo) {
        console.error('User number not found');
        return;
      }
      const formData = new URLSearchParams();
      formData.append('boardNo', boardNo);
      formData.append('replyContent', replyContent);
      formData.append('userNo', userNo);

      await axios.post(`/tip/replies/${replyParentNo}`, formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      setReplyContent('');
      setReplyParentNo(null);
      updateReplies();
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

      await axios.put(`/tip/replies/${editingReply}`, formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      setReplyContent('');
      setEditingReply(null);
      updateReplies();
    } catch (error) {
      console.error('Error editing reply:', error);
    }
  };

  const handleReplyDelete = async (replyNo) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/tip/replies/${replyNo}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      updateReplies();
    } catch (error) {
      console.error('Error deleting reply:', error);
    }
  };

  const handleLike = async (event) => {
    const boardNo = event.currentTarget.getAttribute('data-board-no');
    const token = localStorage.getItem('token');
    const userNo = userInfo?.userNo;
    if (!userNo) {
      console.error('User number not found');
      return;
    }

    try {
      const response = await board.incrementBoardLike(boardNo, userNo);

      if (response.status !== 200) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const responseData = response.data;
      console.log('Like response:', responseData);

      if (responseData.success) {
        alert('추천이 완료되었습니다.');
        fetchBoardDetails(); // 최신 데이터로 갱신
      } else {
        alert(responseData.message);
      }

    } catch (error) {
      console.error('Error liking the board:', error);
      alert(`추천 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  const updateReplies = async () => {
    try {
      const response = await axios.get(`/reply/list?boardNo=${boardNo}`);
      setReplyList(response.data);
    } catch (error) {
      console.error('Error updating replies:', error);
    }
  };

  const renderReplies = (replies) => {
    const sortedReplies = replies.sort((a, b) => a.parentNo - b.parentNo);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return <p>Loading...</p>; // 로딩 중 메시지
  }

  return (
    <TipRead
      board={boardData}
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
