'use client';
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) return null;

  const pages = [];
  // For simplicity, just rendering surrounding pages: e.g. prev, current, next
  for (let i = 1; i <= totalPages; i++) {
    // Show first, last, and pages around current page
    if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div className="flex justify-center items-center space-x-2 my-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded-md bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-50 hover:text-pink-600 transition-colors"
      >
        Previous
      </button>

      {pages.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 text-gray-400">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 border rounded-md transition-colors ${
                currentPage === page
                  ? 'bg-pink-600 text-white border-pink-600'
                  : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded-md bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-50 hover:text-pink-600 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
