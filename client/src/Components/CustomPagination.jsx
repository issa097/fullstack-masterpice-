import React from "react";

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i}>
          <a
            href="#"
            className={`px-2 text-lg font-medium sm:px-3 ${
              currentPage === i ? "text-white bg-[#C08261]" : "hover:text-[#E2C799]"
            }`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </a>
        </li>
      );
    }
    return pages;
  };

  return (
    <nav aria-label="Page Navigation" className="mx-auto my-10 flex max-w-md justify-between space-x-2 rounded-md bg-white py-2 text-gray-700">
      <a
        href="#"
        className="flex items-center space-x-1 font-medium hover:text-[#C08261]"
        aria-label="Previous Page"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {/* Previous page icon */}
      </a>
      <ul className="flex">
        {renderPageNumbers()}
      </ul>
      <a
        href="#"
        className="flex items-center space-x-1 font-medium hover:text-[#C08261]"
        aria-label="Next Page"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {/* Next page icon */}
      </a>
    </nav>
  );
};

export default CustomPagination;
