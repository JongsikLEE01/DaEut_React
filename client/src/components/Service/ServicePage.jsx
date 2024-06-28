import React from 'react'

// const ServicePage = ({ servicePage, keyword }) => {
const ServicePage = () => {
  const handleSearchSubmit = (event) => {
    event.preventDefault()
    console.log('Search submitted')
  }

  return (
    // <>
    //   {/* 검색 폼 */}
    //   <div className="search-container">
    //     <form action="/reservation/reservation" onSubmit={handleSearchSubmit}>
    //       <input type="text" name="keyword" placeholder="검색어를 입력하세요" defaultValue={keyword} />
    //       <button type="submit">검색</button>
    //     </form>
    //   </div>

    //   {/* 페이징 */}
    //   <div className="pagination d-flex align-items-center">
    //     {/* 처음 */}
    //     <Link href={`/reservation/reservation?page=${servicePage.first}&keyword=${keyword}`}>&laquo;</Link>
    //     {/* 이전 */}
    //     <Link href={`/reservation/reservation?page=${servicePage.page > 1 ? servicePage.prev : servicePage.page}&keyword=${keyword}`}>&lt;</Link>

    //     {/* 페이지 번호 */}
    //     {Array.from({ length: servicePage.end - servicePage.start + 1 }, (_, index) => servicePage.start + index).map(servicePageNo => (
    //       <React.Fragment key={servicePageNo}>
    //         {/* 현재 페이지 */}
    //         {servicePage.page === servicePageNo ? (
    //           <a href={`/reservation/reservation?page=${servicePageNo}&keyword=${keyword}`} className="active">{servicePageNo}</a>
    //         ) : (
    //           <a href={`/reservation/reservation?page=${servicePageNo}&keyword=${keyword}`}>{servicePageNo}</a>
    //         )}
    //       </React.Fragment>
    //     ))}

    //     {/* 다음 */}
    //     <Link href={`/reservation/reservation?page=${servicePage.page < servicePage.last ? servicePage.next : servicePage.page}&keyword=${keyword}`}>&gt;</Link>
    //     {/* 마지막 */}
    //     <Link href={`/reservation/reservation?page=${servicePage.last}&keyword=${keyword}`}>&raquo;</Link>
    //   </div>
    // </>
    <>
      <h1>페이징영역</h1>
    </>
  )
}

export default ServicePage
