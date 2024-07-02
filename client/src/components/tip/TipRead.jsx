import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../tip/css/TipRead.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const TipRead = ({
  board,
  fileList,
  replyList,
  newReply,
  handleNewReplyChange,
  handleReplySubmit,
  handleLike,
  handleDelete,
  formatDate,
  renderReplies,
}) => {
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
            <FontAwesomeIcon icon={faThumbsUp} aria-hidden="true" />
            <span>추천</span>
            </div>
          </div>
          <hr className="separator" />
        </div>
      )}
      <div className="d-flex justify-content-end gap-2 mt-2">
        <a href="/tip/boards" className="boardList">목록</a>
        <a href={`/tip/tipUpdate?no=${board?.boardNo}`} className="boardUpdate">수정</a>
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

export default TipRead;
