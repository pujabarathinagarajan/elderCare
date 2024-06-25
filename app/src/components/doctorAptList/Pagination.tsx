import React from 'react';
import '../../css/Pagination.css';

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
  }
  
  const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-container">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a onClick={() => onPageChange(currentPage - 1)} className="page-link arrow">{'<'}</a>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <a onClick={() => onPageChange(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a onClick={() => onPageChange(currentPage + 1)} className="page-link arrow">{'>'}</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
