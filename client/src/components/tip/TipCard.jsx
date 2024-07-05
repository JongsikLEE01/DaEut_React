import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../tip/css/TipIndex.module.css';

const TipCard = ({ board, isLoggedIn }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState('/img/no-img.png'); // 기본 이미지 설정

  useEffect(() => {
    // fileList에서 fileCode가 1인 파일을 찾아서 썸네일 URL 설정
    if (board.fileList && board.fileList.length > 0) {
      const thumbnailFile = board.fileList.find(file => file.fileCode === 1);
      if (thumbnailFile) {
        setThumbnailUrl(`/file/img/${thumbnailFile.fileNo}`);
      }
    }
  }, [board.fileList]);

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.cardContent}>
        <Link to={`/tip/boards/${board.boardNo}`}>
          <img src={thumbnailUrl} alt="썸네일" className={styles.thumbnail} />
        </Link>
        <p className={styles['highlight-text']}>{board.boardTitle}</p>
      </div>
      <p className={styles.cardStats}>추천수: {board.boardLike}</p>
      <p className={styles.cardStats}>댓글수: {board.replyCount}</p>
    </div>
  );
};

export default TipCard;
