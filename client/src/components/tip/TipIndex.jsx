import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { list } from '../../apis/tips/board';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import TipCard from './TipCard';
import '../tip/css/TipIndex.css';  // CSS 파일 임포트

const TipIndex = () => {
  const [boardList, setBoardList] = useState([]);
  const [filteredBoardList, setFilteredBoardList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState({
    first: 1,
    prev: 1,
    next: 2,
    last: 5,
    start: 1,
    end: 5,
    page: 1,
  });
  const [sort, setSort] = useState('latest');
  const [optionList, setOptionList] = useState([]);
  const [selectedOption, setSelectedOption] = useState('0');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const params = {
          sort,
          page: page.page,
          code: selectedOption,
          keyword: keyword,
        };
        const response = await list(params);
        const { boardList, optionList, page: newPage, sort: newSort } = response.data;
        console.log(response.data); // 데이터 확인용 로그
        setBoardList(Array.isArray(boardList) ? boardList : []); // boardList가 배열인지 확인
        setFilteredBoardList(Array.isArray(boardList) ? boardList : []); // 초기 필터링 목록 설정
        setOptionList(optionList || []);
        setPage(newPage || page);
        setSort(newSort || sort);
      } catch (error) {
        console.error('Error fetching data:', error);
        setBoardList([]);
        setFilteredBoardList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page.page, sort, selectedOption, keyword]);

  const handlePageChange = (newPage) => {
    setPage(prevState => ({
      ...prevState,
      page: newPage
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const keyword = formData.get('keyword').toLowerCase();
    const selectedOption = formData.get('code');
    setKeyword(keyword); // 검색어 상태 업데이트
    setSelectedOption(selectedOption); // 검색 옵션 상태 업데이트
  };

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
