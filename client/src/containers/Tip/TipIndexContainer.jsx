import React, { useState, useEffect } from 'react';
import { list } from '../../apis/tips/board';
import TipIndex from '../../components/tip/TipIndex';

const IndexContainer = () => {
  const [boardList, setBoardList] = useState([]);
  const [filteredBoardList, setFilteredBoardList] = useState([]);
  const [fileList, setFileList] = useState([]); 
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
        const { boardList, optionList, page: newPage, sort: newSort, fileList } = response.data;
        console.log('Response Data:', response.data); 
  
        setBoardList(Array.isArray(boardList) ? boardList : []); 
        setFilteredBoardList(Array.isArray(boardList) ? boardList : []); 
        setFileList(Array.isArray(fileList) ? fileList : []); 
        setOptionList(optionList || []);
        setPage(newPage || page);
        setSort(newSort || sort);
      } catch (error) {
        console.error('Error fetching data:', error);
        setBoardList([]);
        setFilteredBoardList([]);
        setFileList([]);
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
    setKeyword(keyword); 
    setSelectedOption(selectedOption); 
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
      fileList={fileList} 
    />
  );
};

export default IndexContainer;
