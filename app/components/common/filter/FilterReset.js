import React from 'react';
import { string, func } from 'prop-types';

const FilterReset = ({ changeSearch, changeOption, defaultOption }) => {
  const handleClick = () => {
    changeSearch('');
    changeOption(defaultOption.toLowerCase());
  };

  return (
    <div className="filter-reset self-end mb-1 ml-6">
      <button
        type="button"
        onClick={handleClick}
        className="text-white hover:text-primaryOff-900 transition"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
};

FilterReset.propTypes = {
  changeSearch: func.isRequired,
  changeOption: func.isRequired,
  defaultOption: string.isRequired,
};

export default FilterReset;
