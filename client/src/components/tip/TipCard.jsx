// components/TipCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const TipCard = ({ board, isLoggedIn }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    // 로그인 여부 확인 제거
    // if (!isLoggedIn) {
    //   alert('회원가입이 필요합니다. 게시글 조회는 회원가입 후 가능합니다.');
    //   window.location.href = '/auth/login';
    // }
    // 여기에 추가적인 동작이 필요한 경우 추가
  };

  return (
    <div className="card">
      <div className="card-content" style={{ position: 'relative' }}>
        <Link to={`/tip/boards/${board.boardNo}`}> {/* URL 파라미터 사용 */}
          <img src={`/file/img/${board.fileNo}`} alt="썸네일" style={{ width: '200px', height: '200px' }} />
        </Link>
        <p className="highlight-text">{board.boardTitle}</p>
      </div>
      <p className="card-stats">추천수: {board.boardLike}</p>
      <p className="card-stats">댓글수: {board.replyCount}</p>
    </div>
  );
};

export default TipCard;
