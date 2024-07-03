import React from 'react';
import styles from '../tip/css/SearchBar.module.css';

const SearchBar = ({ optionList, selectedOption, keyword, onSearch }) => {
  return (
    <div className={styles.searchContainer}>
      <form onSubmit={onSearch} className={styles.form}>
        <select name="code" className={styles.code} defaultValue={selectedOption}>
          {optionList.map(item => (
            <option key={item.code} value={item.code}>
              {item.keyword}
            </option>
          ))}
        </select>
        <input type="text" name="keyword" className={styles.keywordInput} placeholder="검색어 입력" defaultValue={keyword} />
        <button type="submit" className={styles.button}>검색</button>
      </form>
    </div>
  );
};

export default SearchBar;
