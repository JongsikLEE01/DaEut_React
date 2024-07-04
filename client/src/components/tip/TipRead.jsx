import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import styles from '../tip/css/TipRead.module.css';

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
  handleReplyReplySubmit,
  replyContent,
  setReplyContent,
  replyParentNo,
  setReplyParentNo,
  handleReplyEditSubmit,
  editingReply,
  setEditingReply,
  userInfo, // 추가: userInfo를 받아옵니다
}) => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 정의

  return (
    <div className={styles.container}>
      {board && (
        <div className={styles.main}>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h2>{board.boardTitle}</h2>
            <span style={{ fontSize: '0.8em' }}>{formatDate(board.boardRegDate)}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <input type="text" id="userId" value={board.userId} placeholder="userId" className={styles.input} disabled />
            <div className="d-flex gap-2" style={{ fontSize: '0.8em' }}>
            <span><FontAwesomeIcon icon={faEye} aria-hidden="true" /> {board.boardViews}</span>
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
          <div className={styles['col-15']}>
            <div className={styles['w-100']} style={{ whiteSpace: 'pre-wrap' }}>{board.boardContent}</div>
          </div>
          <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '6rem' }}>
            <div className={styles['like-button-wrapper']} id="like-button" data-board-no={board.boardNo} onClick={handleLike}>
              <FontAwesomeIcon icon={faThumbsUp} aria-hidden="true" />
              <span>추천</span>
            </div>
          </div>
          <hr className={styles.separator} />
        </div>
      )}
      <div className={`d-flex gap-2 mt-2 ${styles['button-container']}`}>
        <a href="/tip/boards" className={styles.boardList}>목록</a>
        {userInfo && userInfo.userId === board?.userId && (
          <>
            <a href={`/tip/tipUpdate?no=${board?.boardNo}`} className={styles.boardUpdate}>수정</a>
            <button type="button" onClick={handleDelete} className={styles.boardDelete}>삭제</button>
          </>
        )}
      </div>
      <div id="reply-input" className={styles['reply-input-container']}>
        <h3 className={styles['reply-input-title']}>댓글</h3>
        <form className={styles.inputGroup} onSubmit={handleReplySubmit}>
          <input type="text" id="reply-content" className={styles['form-control']} placeholder="댓글을 입력하세요." value={newReply} onChange={handleNewReplyChange} />
          <button className={styles['customSubmitButton']} type="submit">등록</button> {/* 커스텀 클래스 적용 */}
        </form>
      </div>
      <div className={`${styles['reply-container']} ${styles['reply-list']}`}>
        {replyList.length > 0 && (
          <div id="reply-list">
            {renderReplies(replyList)}
          </div>
        )}
      </div>
      {replyParentNo !== null && (
        <div className={styles['reply-reply-container']}>
          <h3 className={styles['reply-reply-title']}>답글</h3>
          <form className={styles['reply-reply-input']} onSubmit={handleReplyReplySubmit}>
            <textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} />
            <button type="submit">답글 등록</button>
            <button type="button" onClick={() => setReplyParentNo(null)}>취소</button>
          </form>
        </div>
      )}
      {editingReply !== null && (
        <div className={styles['reply-edit-container']}>
          <h3 className={styles['reply-edit-title']}>댓글 수정</h3>
          <form className={styles['reply-edit-input']} onSubmit={handleReplyEditSubmit}>
            <textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} />
            <button type="submit">저장</button>
            <button type="button" onClick={() => setEditingReply(null)}>취소</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TipRead;
