import React from "react";
import "./Pagination.css";

const Pagination = ({
  totalPost,
  postPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const paginate = (pageNum) => setCurrentPage(pageNum);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);
  const pageNumbers = [];
  for (let i = 1; i < Math.ceil(totalPost / postPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination">
      <li className={currentPage === 1 ? "Clickable" : undefined}>
        <button onClick={() => prevPage()} disabled={currentPage === 1}>
          Prev
        </button>
      </li>

      {pageNumbers.map((num, index) => (
        <li key={index} className={num === currentPage ? "active" : undefined}>
          <button onClick={() => paginate(num)}>{num}</button>
        </li>
      ))}
      <li
        className={pageNumbers.length === currentPage ? "Clickable" : undefined}
      >
        <button
          onClick={() => nextPage()}
          disabled={pageNumbers.length === currentPage}
        >
          Next
        </button>
      </li>
    </div>
  );
};

export default Pagination;
