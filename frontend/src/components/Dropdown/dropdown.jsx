import React from 'react';
import '../Dropdown/dropdown.scss';

const DropdownYears = ({ selectedYear, onYearChange }) => {
  const years = Array.from({ length: 100 }, (_, i) => i + 2000); 

  return (
    <div className="dropdown-container">
      <label >Year: </label>
      <select
        id="year"
        value={selectedYear}
        onChange={(e) => onYearChange(e.target.value)} 
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownYears;
