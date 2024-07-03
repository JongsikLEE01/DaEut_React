import React from 'react';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import TipCard from './TipCard';
import '../tip/css/TipIndex.css';  // CSS 파일 임포트

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
    <div className="container">
      <div className="main">
        <h3 className="tipH3">
          <span className="main-title">생활 속 즐거움</span> 
          <a href="/tip/tipInsert" className="more-button2">글쓰기</a>
        </h3>
        <div className="sorting-dropdown">
          <select id="sort-options" onChange={(e) => setSort(e.target.value)} value={sort}>
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
            <option value="like">추천순</option>
            <option value="reply">댓글순</option>
          </select>
        </div>
        <div className="categories">
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
