import React from 'react'
const Pagination = ({ currentPage, totalCount, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalCount / itemsPerPage)
    const maxPageDisplay = 10

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page)
        }
    }

    const startPage = Math.floor((currentPage - 1) / maxPageDisplay) * maxPageDisplay + 1
    const endPage = Math.min(startPage + maxPageDisplay - 1, totalPages)

    const pageNumbers = []
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="pagination d-flex align-items-center">
            <a href="#!" onClick={() => handlePageChange(1)}>&laquo;</a>
            <a href="#!" onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}>&lt;</a>
            {pageNumbers.map(page => (
                <a
                    key={page}
                    href="#!"
                    className={currentPage === page ? 'active' : ''}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </a>
            ))}
            <a href="#!" onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}>&gt;</a>
            <a href="#!" onClick={() => handlePageChange(totalPages)}>&raquo;</a>
        </div>
    )
}

export default Pagination;