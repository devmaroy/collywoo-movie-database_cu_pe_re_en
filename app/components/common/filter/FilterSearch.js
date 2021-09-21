import React from 'react';
import { string, func } from 'prop-types';

const FilterSearch = ({ search, changeSearch }) => {
  const handleChange = (e) => {
    const val = e.target.value;
    changeSearch(val);
  };

  return (
    <label htmlFor="search" className="text-primary-400 font-medium">
      Search
      <input
        id="search"
        type="text"
        placeholder="Search anything..."
        value={search}
        onChange={handleChange}
        className="block bg-primary-900 outline-none mt-3 pl-4 pt-3 pb-3 w-60 mr-6 rounded-md border border-primary-500 placeholder-primary-400 text-sm"
      />
    </label>
  );
};

FilterSearch.propTypes = {
  search: string,
  changeSearch: func.isRequired,
};

export default FilterSearch;
