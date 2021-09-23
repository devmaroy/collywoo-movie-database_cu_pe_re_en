import React from 'react';
import { number, string, func, arrayOf, shape, oneOfType } from 'prop-types';
import selectIcon from '../../../images/select-arrow.svg';

const FilterOptions = ({
  options,
  selectedOption,
  defaultOption,
  changeOption,
}) => {
  const handleChange = (e) => {
    const val = e.target.value;
    changeOption(val);
  };

  return (
    <label htmlFor="options" className="text-primary-400 font-medium">
      Filter by category
      <select
        id="options"
        value={selectedOption}
        onChange={handleChange}
        className="block bg-primary-900 outline-none mt-3 p-3 w-40 rounded-md border border-primary-500 text-white appearance-none text-sm"
        style={{
          backgroundImage: `url(${selectIcon})`,
          backgroundRepeat: 'no-repeat, repeat',
          backgroundPosition: 'right 0.8em top 50%, 0 0',
          backgroundSize: '0.65em auto, 100%',
        }}
      >
        <option value={defaultOption.toLowerCase()}>{defaultOption}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
};

FilterOptions.propTypes = {
  options: arrayOf(
    shape({
      id: number.isRequired,
      name: string.isRequired,
    }),
  ).isRequired,
  selectedOption: oneOfType([string, number]),
  defaultOption: string.isRequired,
  changeOption: func.isRequired,
};

export default FilterOptions;
