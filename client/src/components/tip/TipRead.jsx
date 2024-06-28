import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../css/TipRead.css';

function TipRead() {
  const { boardNo } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState({});
  const [fileList, setFileList] = useState([]);
  const [replyList, setReplyList] = useState([]);
  const [replyContent, setReplyContent] = useState('');
  const [userNo, setUserNo] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetchBoard();
    fetchReplies();
  }, [boardNo]);

  async function fetchBoard() {
    try {
      const response = await axios.get(`/tip/boards/${boardNo}`);
      setBoard(response.data.board);
      setFileList(response.data.fileList);
      setUserNo(response.data.userNo);
      setUserId(response.data.userId);
    } catch (error) {
      console.error('Error fetching board:', error);
    }
  }

  async function fetchReplies() {
    try {
      const response = await axios.get(`/reply/list?boardNo=${boardNo}`);
      setReplyList(response.data);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  }

  async function handleDelete() {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/tip/boards/${boardNo}`);
        navigate('/tip/index');
      } catch (error) {
        console.error('Error deleting board:', error);
      }
    }
  }

  async function handleLike() {
    try {
      const response = await axios.put(`/tip/boards/${boardNo}/like`, null, {
        params: { userNo },
        headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="_csrf"]').getAttribute('content') },
      });
      alert(response.data.message);
      fetchBoard(); // to update like count
    } catch (error) {
      console.error('Error liking board:', error);
    }
  }

  async function handleReplySubmit() {
    try {
      await axios.post('/replies', { boardNo, replyContent, userNo });
      setReplyContent('');
      fetchReplies(); // to update reply list
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  }

  function insertAnswer(parentNo) {
    const replyBox = document.querySelector(`div[data-reply-no="${parentNo}"] .replies`);
    const editor = document.createElement('div');
    editor.classList.add('reply-box');
    editor.id = 'answer';
    editor.innerHTML = `
      <div class="inner">
        <textarea cols="60" rows="5" id="answer-content" style="border: 1px solid #8FA2CA;resize: none;" placeholder="답글 내용을 입력하세요."></textarea>
        <br>
        <button style="background-color: #8FA2CA; border: #8FA2CA; border-radius: 8px; height: 30px; color: white;" onclick="submitAnswer(${parentNo})">등록</button>
        <button style="background-color: white; border-color: #8FA2CA; border-radius: 8px; height: 30px; color: #8FA2CA; box-shadow: none; outline: none; border-width: 1px; border-style: solid;" onclick="cancelAnswer()">취소</button>
      </div>
    `;
    replyBox.appendChild(editor);
  }

  function submitAnswer(parentNo) {
    const content = document.getElementById('answer-content').value;
    const data = {
      boardNo,
      parentNo,
      userNo,
      userId,
      replyContent: content
    };

    axios.post('/replies', data, {
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="_csrf"]').getAttribute('content')
      }
    }).then(response => {
      if (response.data === 'SUCCESS') {
        alert('답글 등록 성공!!!');
        fetchReplies();
        document.getElementById('answer-content').value = '';
      }
    }).catch(error => {
      console.error('Error submitting answer:', error);
    });
  }

  function cancelAnswer() {
    const answerBox = document.getElementById('answer');
    if (answerBox) {
      answerBox.remove();
    }
  }

  function editReply(replyNo, content, userId) {
    const replyElement = document.querySelector(`div[data-reply-no="${replyNo}"]`);
    const repliesHtml = replyElement.querySelector('.replies').innerHTML;
    replyElement.innerHTML = `
      <textarea id="edit-content-${replyNo}" cols="60" rows="5" style="border: 1px solid #8FA2CA;resize: none;">${content}</textarea>
      <button style="background-color: #8FA2CA; border: #8FA2CA; border-radius: 8px; height: 30px; color: white;" onclick="submitEdit(${replyNo}, '${userId}')">수정</button>
      <button style="background-color: white; border-color: #8FA2CA; border-radius: 8px; height: 30px; color: #8FA2CA; box-shadow: none; outline: none; border-width: 1px; border-style: solid;" onclick="cancelEdit(${replyNo}, '${content}')">취소</button>
      <div class="replies">${repliesHtml}</div>
    `;
  }

  function submitEdit(replyNo, userId) {
    const editedContent = document.getElementById(`edit-content-${replyNo}`).value;
    const data = {
      replyNo,
      replyContent: editedContent,
      userId
    };

    axios.put('/reply', data, {
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="_csrf"]').getAttribute('content')
      }
    }).then(response => {
      if (response.data === 'SUCCESS') {
        alert('댓글 수정 성공!!!');
        fetchReplies();
      } else {
        alert('댓글 수정 실패: ' + response.data);
      }
    }).catch(error => {
      console.error('Error editing reply:', error);
    });
  }

  function cancelEdit(replyNo, content) {
    const replyElement = document.querySelector(`div[data-reply-no="${replyNo}"]`);
    const repliesHtml = replyElement.querySelector('.replies').innerHTML;
    replyElement.innerHTML = `
      <p><strong>${userId}</strong></p>
      <p>${content}</p>
      <div class="comment-actions">
        <span>${new Date().toLocaleDateString()}</span>
        <button type="button" onclick="insertAnswer(this, ${replyNo})">답글달기</button>
        <button type="button" onclick="editReply(${replyNo}, '${content}', '${userId}')">수정</button>
        <button type="button" onclick="deleteReply(${replyNo})">삭제</button>
      </div>
      <div class="replies">${repliesHtml}</div>
    `;
  }

  async function deleteReply(replyNo) {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/reply/${replyNo}`, {
          headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="_csrf"]').getAttribute('content')
          }
        });
        fetchReplies();
      } catch (error) {
        console.error('Error deleting reply:', error);
      }
    }
  }

  return (
    <div className="container">
      <form id="form">
        <input type="hidden" name="boardNo" value={board.boardNo} />
        <div className="main">
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h2>{board.boardTitle}</h2>
            <span style={{ fontSize: '0.8em' }}>{new Date(board.boardRegDate).toLocaleString()}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <input type="text" id="userId" value={board.userId} placeholder="userId" disabled />
            <div className="d-flex gap-2" style={{ fontSize: '0.8em' }}>
              <span><i className="fa-regular fa-eye"></i> {board.boardViews}</span>
              <span id="like-count">추천수: {board.boardLike}</span>
              <span id="reply-count">댓글수: {board.replyCount}</span>
            </div>
          </div>
          <hr className="my-2" />
          <div className="text-center my-5">
            {fileList.map((file, index) => (
              <img key={index} src={`/file/img/${file.fileNo}`} alt="파일 이미지" className="img-fluid" />
            ))}
          </div>
          <div className="col-15">
            <div className="w-100 input-readonly" style={{ whiteSpace: 'pre-wrap' }}>{board.boardContent}</div>
          </div>
          <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '6rem' }}>
            <div className="like-button-wrapper like-button" onClick={handleLike}>
              <i className="fa-solid fa-thumbs-up" aria-hidden="true"></i>
              <span>추천</span>
            </div>
          </div>
          <hr className="separator" />
        </div>
        <div className="d-flex justify-content-end gap-2 mt-2">
          <button type="button" onClick={() => navigate('/tip/index')} className="boardList">목록</button>
          <button type="button" onClick={() => navigate(`/tip/tipUpdate/${board.boardNo}`)} className="boardUpdate">수정</button>
          <button type="button" onClick={handleDelete} className="boardDelete">삭제</button>
        </div>
      </form>

      <div id="reply-input">
        <h3>댓글</h3>
        <div className="input-group mt-1 mb-3 reply-input">
          <input type="text" id="reply-content" className="form-control" placeholder="댓글을 입력하세요." value={replyContent} onChange={(e) => setReplyContent(e.target.value)} />
          <button className="btn btn-primary" type="button" onClick={handleReplySubmit}>등록</button>
        </div>
      </div>
      <div id="reply-list">
        {replyList.map((reply, index) => (
          <div key={index} className={reply.parentNo ? 'reply' : 'comment'} data-reply-no={reply.replyNo} data-parent-no={reply.parentNo}>
            <p><strong>{reply.userId}</strong></p>
            <p>{reply.replyContent}</p>
            <div className="comment-actions">
              <span>{new Date(reply.replyRegDate).toLocaleDateString()}</span>
              <button type="button" onClick={() => insertAnswer(reply.replyNo)}>답글달기</button>
              <button type="button" onClick={() => editReply(reply.replyNo, reply.replyContent, reply.userId)}>수정</button>
              <button type="button" onClick={() => deleteReply(reply.replyNo)}>삭제</button>
            </div>
            <div className="replies"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TipRead;
