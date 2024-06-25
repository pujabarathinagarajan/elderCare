// FilterSection.tsx
import React, { useState } from 'react';
import '../../css/FilterSection.css';
import FilterDoctors from '../../models/FilterDoctors';

interface Props {
  onFilterDoctors: (filters: FilterDoctors) => void;
}

const FilterSection: React.FC<Props> = ({ onFilterDoctors }) => {
  const [filters, setFilters] = useState<FilterDoctors>({});

  const handleFilterChange = (filterType: keyof FilterDoctors, value: string | number) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterDoctors(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterDoctors({});
  };

  return (
    <div className="filter-section">
      <div className="clear-filters-title">
        <h2>Filter</h2>
        <button className="clear-filters" onClick={clearFilters}>Clear filters</button>
      </div>

      <select value={filters.location || ''} onChange={(e) => handleFilterChange('location', e.target.value)} className="filter-dropdown">
        <option value="">City</option>
        <option value="New York">New York</option>
        <option value="Los Angeles">Los Angeles</option>
        <option value="Boston">Boston</option>
        <option value="Chicago">Chicago</option>
        <option value="Illinois">Illinois</option>
        <option value="San Francisco">San Francisco</option>
        <option value="California">California</option>
        <option value="Austin">Austin</option>
        <option value="Texas">Texas</option>
        <option value="Miami">Miami</option>
        <option value="Florida">Florida</option>
        <option value="Seattle">Seattle</option>
        <option value="Washington">Washington</option>
        <option value="Denver">Denver</option>
        <option value="Colorado">Colorado</option>
        {/* Other options */}
      </select>
      <select value={filters.location || ''} onChange={(e) => handleFilterChange('experience', Number(e.target.value))} className="filter-dropdown">
        <option value="">Experience</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        {/* Other options */}
      </select>
      <select value={filters.gender || ''} onChange={(e) => handleFilterChange('gender', e.target.value)} className="filter-dropdown">
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="other">Other</option>
        {/* Other options */}
      </select>
      <select value={filters.speciality || ''} onChange={(e) => handleFilterChange('speciality', e.target.value)} className="filter-dropdown">
        <option value="">Specialities</option>
        <option value="Cardiology">Cardiology</option>
        <option value="Internal Medicine">Internal Medicine</option>
        <option value="Neurology">Neurology</option>
        <option value="Pediatrics">Pediatrics</option>
        <option value="Geriatrics">Geriatrics</option>
        <option value="Dermatology">Dermatology</option>
        <option value="Endocrinology">Endocrinology</option>
        <option value="Dermatologist">Dermatologist</option>
        <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
        <option value="General Practitioner">General Practitioner</option>
        {/* Other options */}
      </select>
    </div>
  );
};

export default FilterSection;
