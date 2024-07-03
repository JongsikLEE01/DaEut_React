import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { tumbnail } from '../../apis/file';
import styles from '../tip/css/TipIndex.module.css';

const TipCard = ({ board, isLoggedIn }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState('/img/no-img.png'); // 기본 이미지 설정
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const response = await tumbnail(board.fileNo);
        console.log('Thumbnail response:', response.data);
        setThumbnailUrl(response.data.url);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching thumbnail:', error);
        setIsLoading(false);
      }
    };

    if (board.fileNo) {
      fetchThumbnail();
    } else {
      setIsLoading(false);
    }
  }, [board.fileNo]);

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.cardContent}>
        <Link to={`/tip/boards/${board.boardNo}`}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <img src={thumbnailUrl} alt="썸네일" className={styles.thumbnail} />
          )}
        </Link>
        <p className={styles['highlight-text']}>{board.boardTitle}</p>
      </div>
      <p className={styles.cardStats}>추천수: {board.boardLike}</p>
      <p className={styles.cardStats}>댓글수: {board.replyCount}</p>
    </div>
  );
};

export default TipCard;
