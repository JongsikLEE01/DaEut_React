import React from 'react'
import Pagination from 'react-js-pagination'

const ServicePage = ({ page, setPage, totalCount, keyword, setKeyword }) => {

  
  // 페이지 변경 시 호출될 함수
  const handlePageChange = (page) => {
    setPage(page)
  }
  // 검색어 함수
  const onSearch = (e) => {
    setKeyword(e.target.value)
  }
  const handleKey = (e) =>{
    if (e.key === 'Enter')
      e.preventDefault()
  }

  return (
    <div className="search-container">
      <form>
        <input type="text" name="keyword" placeholder="검색어를 입력하세요" onKeyDown={handleKey} onChange={onSearch}/>
      </form>

      {/* 페이지네이션 */}
      <Pagination
        activePage={page}               // 현재 활성화된 페이지
        itemsCountPerPage={9}          // 한 페이지랑 보여줄 아이템 갯수
        totalItemsCount={ totalCount }  // 총 아이템 개수
        pageRangeDisplayed={5}          // 페이징 컴포넌트에서 보여줄 페이지 범위
        prevPageText={'<'}              // 이전 페이지 버튼 텍스트
        nextPageText={'>'}              // 다음 페이지 버튼 텍스트
        onChange={handlePageChange}     // 페이지 변경 시 호출될 함수
      />
    </div>
  )
}

export default ServicePage
