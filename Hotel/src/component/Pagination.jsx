import React, { useState } from "react";

function Pagination({ totalRecords, recordsPerPage, onPageChange }) {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span
          key={i}
          onClick={() => handleClick(i)}
          className={currentPage === i ? "activePage" : "notactivePage"}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  };

  return <div className="pagination">{renderPageNumbers()}</div>;
}

export default Pagination;
