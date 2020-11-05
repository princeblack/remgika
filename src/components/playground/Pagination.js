/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Pagination = ({ postsPerPage, totalPost, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPost / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  let Previous = currentPage < 0 ? 1 : currentPage - 1;
  let next =
    currentPage < pageNumbers.length ? currentPage + 1 : pageNumbers.length;

  return (
    <ul className="pagination " id="pagination">
      {currentPage > 1 && (
        <li class="page-item ">
          <a
            onClick={() => paginate(Previous)}
            class="page-link"
            href="#"
            tabindex="-1"
            aria-disabled="true"
          >
            Previous
          </a>
        </li>
      )}
      {pageNumbers.map((number) => (
        <li key={number} className="page-item">
          <a onClick={() => paginate(number)} href="#" className="page-link">
            {number}
          </a>
        </li>
      ))}
      {currentPage < pageNumbers.length && (
        <li class="page-item">
          <a onClick={() => paginate(next)} class="page-link" href="#">
            Next
          </a>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
