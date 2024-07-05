import React from 'react';

const Pagination = ({ page, onPageChange }) => {
  const pages = [];
  for (let i = page.start; i <= page.end; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination d-flex align-items-center">
      <a href="#" onClick={() => onPageChange(page.first)}>&laquo;</a>
      <a href="#" onClick={() => onPageChange(page.page > 1 ? page.prev : page.page)}>&lt;</a>
      {pages.map(pageNo => (
        page.page === pageNo
          ? <a key={pageNo} className="active">{pageNo}</a>
          : <a key={pageNo} href="#" onClick={() => onPageChange(pageNo)}>{pageNo}</a>
      ))}
      <a href="#" onClick={() => onPageChange(page.page < page.last ? page.next : page.page)}>&gt;</a>
      <a href="#" onClick={() => onPageChange(page.last)}>&raquo;</a>
    </div>
  );
};

export default Pagination;
