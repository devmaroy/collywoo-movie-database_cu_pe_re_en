import React, { useState } from 'react';
import { number, string, arrayOf, shape, func } from 'prop-types';
import FilterSearch from './FilterSearch';
import FilterOptions from './FilterOptions';

const Filter = ({ data, options, defaultOption, children }) => {
  const defaultOptionWord = defaultOption.toLowerCase();
  const [searchFilter, setSearchFilter] = useState('');
  const [optionFilter, setOptionFilter] = useState(defaultOptionWord);

  const changeFilterSearch = (value) => {
    setSearchFilter(value);
  };

  const changeFilterOption = (value) => {
    setOptionFilter(parseInt(value, 10) || defaultOptionWord);
  };

  const filteredData = data.filter(({ title, overview, genre_ids: genIds }) => {
    // Prepare search variables
    const sTitle = title.toLowerCase().includes(searchFilter);
    const sOverview = overview.toLowerCase().includes(searchFilter);

    // Search filter condition
    const filterSearchCondition = !searchFilter || sTitle || sOverview;

    // Option select box filter condition
    const filterOptionCondition =
      !optionFilter ||
      optionFilter === defaultOption.toLowerCase() ||
      genIds.includes(optionFilter);

    return filterSearchCondition && filterOptionCondition;
  });

  const filtered = searchFilter !== '' || optionFilter !== defaultOptionWord;

  return (
    <div className="filter">
      <div className="flex items-center md:justify-end mb-10 w-full">
        <FilterSearch search={searchFilter} changeSearch={changeFilterSearch} />
        <FilterOptions
          options={options}
          selectedOption={optionFilter}
          defaultOption={defaultOption}
          changeOption={changeFilterOption}
        />
      </div>

      {children(filteredData, filtered)}
    </div>
  );
};

Filter.propTypes = {
  data: arrayOf(
    shape({
      title: string.isRequired,
      overview: string.isRequired,
      genre_ids: arrayOf(number).isRequired,
    }),
  ).isRequired,
  options: arrayOf(
    shape({
      id: number.isRequired,
      name: string.isRequired,
    }),
  ).isRequired,
  defaultOption: string.isRequired,
  children: func.isRequired,
};

export default Filter;
