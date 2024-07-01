import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../tip/css/TipRead.css';

const PostDetail = () => {
  const { boardNo } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [replyList, setReplyList] = useState([]);
  const [newReply, setNewReply] = useState('');

  useEffect(() => {
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
    <div className="container">
      {board && (
        <div className="main">
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h2>{board.boardTitle}</h2>
            <span style={{ fontSize: '0.8em' }}>{formatDate(board.boardRegDate)}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <input type="text" id="userId" value={board.userId} placeholder="userId" disabled />
            <div className="d-flex gap-2" style={{ fontSize: '0.8em' }}>
              <span><i className="fa-regular fa-eye"></i> {board.boardViews}</span>
              <span>추천수: {board.boardLike}</span>
              <span>댓글수: {board.replyCount}</span>
            </div>
          </div>
          <hr className="my-2" />
          <div className="text-center my-5">
            {fileList.map((file) => (
              <img key={file.fileNo} src={`/file/img/${file.fileNo}`} alt="파일 이미지" className="img-fluid" />
            ))}
          </div>
          <div className="col-15">
            <div className="w-100 input-readonly" style={{ whiteSpace: 'pre-wrap' }}>{board.boardContent}</div>
          </div>
          <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '6rem' }}>
            <div className="like-button-wrapper like-button" id="like-button" data-board-no={board.boardNo} onClick={handleLike}>
              <i className="fas fa-thumbs-up" aria-hidden="true"></i>
              <span>추천</span>
            </div>
          </div>
          <hr className="separator" />
        </div>
      )}
      <div className="d-flex justify-content-end gap-2 mt-2">
        <a href="/tip/boards" className="boardList">목록</a>
        <a href={`/tip/tipUpdate?no=${boardNo}`} className="boardUpdate">수정</a>
        <button type="button" onClick={handleDelete} className="boardDelete">삭제</button>
      </div>
      <div id="reply-input" className="reply-input-container">
        <h3 className="reply-input-title">댓글</h3>
        <div className="input-group reply-input">
          <input type="text" id="reply-content" className="form-control" placeholder="댓글을 입력하세요." value={newReply} onChange={handleNewReplyChange} />
          <button className="btn btn-primary" type="button" onClick={handleReplySubmit}>등록</button>
        </div>
      </div>
      {replyList.length > 0 && (
        <div id="reply-list">
          {renderReplies(replyList)}
        </div>
      )}
    </div>
  );
};

export default PostDetail;
