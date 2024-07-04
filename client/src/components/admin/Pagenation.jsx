import React from 'react'
import Pagination from 'react-js-pagination'

const CustomPagination = ({ currentPage, onPageChange, totalCount }) => {
    return (
        <div className="pagination d-flex align-items-center">
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={10}
                totalItemsCount={totalCount}
                pageRangeDisplayed={10}
                prevPageText={'<'}
                nextPageText={'>'}
                onChange={onPageChange}
                activeClass="active-page" // 현재 페이지만 css주기 추가
            />
        </div>
    )
}

export default CustomPagination
