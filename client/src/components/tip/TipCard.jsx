// components/TipCard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { tumbnail } from '../../apis/file';

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
    <div className="card" onClick={handleClick}>
      <div className="card-content">
        <Link to={`/tip/boards/${board.boardNo}`}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <img src={thumbnailUrl} alt="썸네일" className="thumbnail" />
          )}
        </Link>
        <p className="highlight-text">{board.boardTitle}</p>
      </div>
      <p className="card-stats">추천수: {board.boardLike}</p>
      <p className="card-stats">댓글수: {board.replyCount}</p>
    </div>
  );
};

export default TipCard;
