import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import TipRead from '../../components/tip/TipRead';
import Swal from 'sweetalert2';
import { LoginContext } from '../../components/contexts/LoginContextProvider';
import * as board from '../../apis/tips/board';
import styles from '../../components/tip/css/TipRead.module.css';

const TipReadContainer = () => {
  const { boardNo } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(LoginContext);
  const [boardData, setBoardData] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [replyList, setReplyList] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [editingReply, setEditingReply] = useState(null);
  const [replyParentNo, setReplyParentNo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!boardNo) {
      console.error('Board number is null or undefined');
      return;
    }
    fetchBoardDetails();
  }, [boardNo]);

  const fetchBoardDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/tip/boards/${boardNo}`);
      const { board, fileList, replyList } = response.data;
      setBoardData(board);
      setFileList(fileList);
      setReplyList(replyList);
    } catch (error) {
      console.error('Error fetching board details:', error);
    } finally {
      setIsLoading(false);
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
      const userNo = userInfo?.userNo;
      if (!userNo) {
        console.error('User number not found');
        return;
      }
      const formData = {
        replyNo: editingReply,
        replyContent: replyContent,
        userNo: userNo,
        parentNo: replyList.find(reply => reply.replyNo === editingReply)?.parentNo || 0 // 부모 번호 포함
      };

      const response = await axios.put(`/reply/${editingReply}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      const updatedReply = response.data;

      // setReplyList를 통해 즉시 상태 업데이트
      setReplyList((prevReplies) => 
        prevReplies.map((reply) => 
          reply.replyNo === editingReply ? { ...reply, replyContent: replyContent, replyRegDate: new Date().toISOString() } : reply
        )
      );

      setReplyContent('');
      setEditingReply(null);
    } catch (error) {
      console.error('Error editing reply:', error);
    }
  };

  const handleReplyDeleteConfirm = (replyNo) => {
    Swal.fire({
      title: '댓글을 삭제하시겠습니까?',
      text: '삭제하면 되돌릴 수 없습니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        handleReplyDelete(replyNo);
      }
    });
  };

  const handleReplyDelete = async (replyNo) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/reply/${replyNo}`, {
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
      if (responseData.success) {
        alert('추천이 완료되었습니다.');
        fetchBoardDetails();
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
    const renderReply = (reply, level = 0) => (
      <div key={reply.replyNo} className={`${reply.parentNo ? styles.answer : styles.reply}`} style={{ marginLeft: `${level * 20}px` }}>
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
            <div className={styles['comment-actions']}>
              <span className={styles.date}>{new Date(reply.replyRegDate).toLocaleDateString()}</span>
              <button type="button" onClick={() => { setReplyParentNo(reply.replyNo); setReplyContent(''); }}>답글달기</button>
              <button type="button" onClick={() => { setEditingReply(reply.replyNo); setReplyContent(reply.replyContent); }}>수정</button>
              <button type="button" onClick={() => handleReplyDeleteConfirm(reply.replyNo)}>삭제</button>
            </div>
          </>
        )}
      </div>
    );

    const sortedReplies = replies.sort((a, b) => a.parentNo - b.parentNo);
    const replyElements = [];
    const parentReplies = sortedReplies.filter(reply => reply.parentNo === 0);
    const childReplies = sortedReplies.filter(reply => reply.parentNo !== 0);

    const renderNestedReplies = (parentReply, level) => {
      replyElements.push(renderReply(parentReply, level));
      const children = childReplies.filter(reply => reply.parentNo === parentReply.replyNo);
      children.forEach(childReply => {
        renderNestedReplies(childReply, level + 1);
      });
    };

    parentReplies.forEach(parentReply => {
      renderNestedReplies(parentReply, 0);
    });

    return replyElements;
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
      userInfo={userInfo}
    />
  );
};

export default TipReadContainer;
