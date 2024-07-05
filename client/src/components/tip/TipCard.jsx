import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../tip/css/TipIndex.module.css';

const TipCard = ({ board }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState('/img/no-img.png');

  useEffect(() => {
    if (board.fileList && board.fileList.length > 0) {
      const thumbnailFile = board.fileList.find(file => file.fileCode === 1);
      if (thumbnailFile) {
        setThumbnailUrl(`/file/img/${thumbnailFile.fileNo}`);
      }
    }
  }, [board.fileList]);

  return (
    <div className={styles.card}>
      <div className={styles['card-content']}>
        <Link to={`/tip/boards/${board.boardNo}`}>
          <div className={styles['thumbnail-wrapper']}>
            <img src={thumbnailUrl} alt="썸네일" className={styles.thumbnail} />
          </div>
        </Link>
        <p className={styles['highlight-text']}>{board.boardTitle}</p>
      </div>
      <p className={styles.cardStats}>추천수: {board.boardLike}</p>
      <p className={styles.cardStats}>댓글수: {board.replyCount}</p>
    </div>
  );
};

export default TipCard;
