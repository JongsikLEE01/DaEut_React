import React, { useState, useEffect } from 'react';
import { list } from '../../apis/tips/board';
import TipIndex from '../../components/tip/TipIndex';

const IndexContainer = () => {
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
    <TipIndex
      boardList={boardList}
      filteredBoardList={filteredBoardList}
      isLoading={isLoading}
      page={page}
      sort={sort}
      optionList={optionList}
      selectedOption={selectedOption}
      keyword={keyword}
      handlePageChange={handlePageChange}
      handleSearch={handleSearch}
      setSort={setSort}
    />
  );
};

export default IndexContainer;
