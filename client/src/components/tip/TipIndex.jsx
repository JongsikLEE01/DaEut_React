import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/TipIndex.css';
import { Link } from 'react-router-dom';

function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const [sort, setSort] = useState('latest');
  const [page, setPage] = useState({
    first: 1,
    last: 1,
    page: 1,
    start: 1,
    end: 1,
    prev: 1,
    next: 2,
  });
  const [searchParams, setSearchParams] = useState({
    code: '0',
    keyword: '',
  });

  useEffect(() => {
    fetchBoardList();
  }, [sort, page.page]);

  async function fetchBoardList() {
    try {
      const response = await axios.get(`/tip/boards`, {
        params: {
          sort: sort,
          page: page.page,
          code: searchParams.code,
          keyword: searchParams.keyword,
        },
      });

      // 응답 객체를 출력하여 구조 확인
      console.log('Response data:', response.data);

      setBoardList(response.data.boardList);

      // response.data.page에서 totalPages 값 추출
      const totalPages = Math.ceil(response.data.page.count / response.data.page.rows);

      // 디버깅용 로그
      console.log('totalPages:', totalPages);
      console.log('current page:', page.page);

      setPage((prevPage) => ({
        ...prevPage,
        first: 1,
        last: totalPages,
        prev: prevPage.page > 1 ? prevPage.page - 1 : prevPage.page,
        next: prevPage.page < totalPages ? prevPage.page + 1 : prevPage.page,
        start: Math.max(1, prevPage.page - 4),
        end: Math.min(totalPages, prevPage.page + 4),
      }));
    } catch (error) {
      console.error('Error fetching board list:', error);
    }
  }

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage({ ...page, page: 1 });
  };

  const handlePageChange = (pageNumber) => {
    setPage({ ...page, page: pageNumber });
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setPage({ ...page, page: 1 });
    await fetchBoardList();
  };

  const handleCodeChange = (e) => {
    setSearchParams({ ...searchParams, code: e.target.value });
  };

  const handleKeywordChange = (e) => {
    setSearchParams({ ...searchParams, keyword: e.target.value });
  };

  return (
    <div className="container">
      <div className="main">
        <h3 className="tipH3">
          생활 속 즐거움 <Link to="/tip/tipInsert" className="more-button2">글쓰기</Link>
        </h3>
        <div className="sorting-dropdown">
          <select id="sort-options" onChange={handleSortChange} value={sort}>
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
            <option value="like">추천순</option>
            <option value="reply">댓글순</option>
          </select>
        </div>
        <div className="categories">
          {boardList.map(board => (
            <div key={board.boardNo} className="card">
              <div style={{ position: 'relative' }}>
                <img src={`/file/img/${board.fileNo}`} alt="썸네일" style={{ width: '200px', height: '200px' }} />
              </div>
              <a href={`/tip/tipRead?no=${board.boardNo}`}>
                <p><span className="highlight-text">{board.boardTitle}</span></p>
              </a>
              <p>추천수: <span>{board.boardLike}</span></p>
              <p>댓글수: <span>{board.replyCount}</span></p>
            </div>
          ))}
        </div>
      </div>

      <div className="pagination d-flex align-items-center">
        <a href="#" onClick={(e) => { e.preventDefault(); handlePageChange(page.first); }}>&laquo;</a>
        <a href="#" onClick={(e) => { e.preventDefault(); handlePageChange(page.page > 1 ? page.prev : page.page); }}>&lt;</a>
        {Array.from({ length: page.end - page.start + 1 }, (_, index) => page.start + index).map(pageNo => (
          <a key={pageNo} className={page.page === pageNo ? 'active' : ''} href="#" onClick={(e) => { e.preventDefault(); handlePageChange(pageNo); }}>{pageNo}</a>
        ))}
        <a href="#" onClick={(e) => { e.preventDefault(); handlePageChange(page.page < page.last ? page.next : page.page); }}>&gt;</a>
        <a href="#" onClick={(e) => { e.preventDefault(); handlePageChange(page.last); }}>&raquo;</a>
      </div>

      <div className="search-container">
        <form onSubmit={handleSearchSubmit}>
          <select name="code" className="code" onChange={handleCodeChange} value={searchParams.code}>
            <option value="0">전체</option>
            <option value="1">제목</option>
            <option value="2">내용</option>
            <option value="3">제목+내용</option>
            <option value="4">작성자</option>
          </select>
          <input type="text" name="keyword" placeholder="검색어 입력" value={searchParams.keyword} onChange={handleKeywordChange} />
          <button type="submit">검색</button>
        </form>
      </div>
    </div>
  );
}

export default BoardList;
