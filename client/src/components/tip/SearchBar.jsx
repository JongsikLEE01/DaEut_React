import React from 'react';

const SearchBar = ({ optionList, selectedOption, keyword, onSearch }) => {
  return (
    <div className="search-container">
      <form onSubmit={onSearch}>
        <select name="code" className="code" defaultValue={selectedOption}>
          {optionList.map(item => (
            <option key={item.code} value={item.code}>
              {item.keyword}
            </option>
          ))}
        </select>
        <input type="text" name="keyword" className="keyword-input" placeholder="검색어 입력" defaultValue={keyword} />
        <button type="submit">검색</button>
      </form>
    </div>
  );
};

export default SearchBar;
