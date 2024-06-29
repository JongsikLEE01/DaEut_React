import React from 'react'
import { Link } from 'react-router-dom'

const ServicePage = ({ servicePage = { page: 1, first: 1, last: 1, prev: 1, next: 1, start: 1, end: 1 }, keyword, onPageChange, handleSearchSubmit }) => {
  const handleSearch = (event) => {
    event.preventDefault()
    console.log('Search submitted')
    handleSearchSubmit()
  }

  return (
    <>
      {/* 검색 폼 */}
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input type="text" name="keyword" placeholder="검색어를 입력하세요" defaultValue={keyword} />
          <button type="submit">검색</button>
        </form>
      </div>

      {/* 페이징 */}
      <div className="pagination d-flex align-items-center">
        {/* 처음 */}
        <Link to={`/service?page=${servicePage.first}&keyword=${keyword}`} onClick={() => onPageChange(servicePage.first)}>&laquo;</Link>
        {/* 이전 */}
        <Link to={`/service?page=${servicePage.page > 1 ? servicePage.prev : servicePage.page}&keyword=${keyword}`} onClick={() => onPageChange(servicePage.page > 1 ? servicePage.prev : servicePage.page)}>&lt;</Link>

        {/* 페이지 번호 */}
        {Array.from({ length: servicePage.end - servicePage.start + 1 }, (_, index) => servicePage.start + index).map((servicePageNo) => (
          <React.Fragment key={servicePageNo}>
            {/* 현재 페이지 */}
            {servicePage.page === servicePageNo ? (
              <Link to={`/service?page=${servicePageNo}&keyword=${keyword}`} className="active">{servicePageNo}</Link>
            ) : (
              <Link to={`/service?page=${servicePageNo}&keyword=${keyword}`} onClick={() => onPageChange(servicePageNo)}>{servicePageNo}</Link>
            )}
          </React.Fragment>
        ))}

        {/* 다음 */}
        <Link to={`/service?page=${servicePage.page < servicePage.last ? servicePage.next : servicePage.page}&keyword=${keyword}`} onClick={() => onPageChange(servicePage.page < servicePage.last ? servicePage.next : servicePage.page)}>&gt;</Link>
        {/* 마지막 */}
        <Link to={`/service?page=${servicePage.last}&keyword=${keyword}`} onClick={() => onPageChange(servicePage.last)}>&raquo;</Link>
      </div>
    </>
  )
}

export default ServicePage
