import React from 'react';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import TipCard from './TipCard';
import styles from '../tip/css/TipIndex.module.css';  // CSS 파일 임포트

const TipIndex = ({
  boardList,
  filteredBoardList,
  isLoading,
  page,
  sort,
  optionList,
  selectedOption,
  keyword,
  handlePageChange,
  handleSearch,
  setSort
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h3 className={styles.tipH3}>
          <span className={styles.mainTitle}>생활 속 즐거움</span>
          <a href="/tip/tipInsert" className={styles.moreButton2}>글쓰기</a>
        </h3>
        <div className={styles.sortingDropdown}>
          <select className={styles.sortOptions} onChange={(e) => setSort(e.target.value)} value={sort}>
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
            <option value="like">추천순</option>
            <option value="reply">댓글순</option>
          </select>
        </div>
        <div className={styles.categories}>
          {isLoading ? (
            <p>로딩 중...</p>
          ) : (
            filteredBoardList.map((board, index) => (
              <TipCard key={index} board={board} isLoggedIn={false} />
            ))
          )}
        </div>
        <Pagination page={page} onPageChange={handlePageChange} />
        <SearchBar optionList={optionList} selectedOption={selectedOption} keyword={keyword} onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default TipIndex;
