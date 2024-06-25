// FilterSection.tsx
import React, { useState } from 'react';
import '../../css/FilterSection.css';
import FilterAppointments from '../../models/FilterAppointments';

interface Props {
  onFilterAppointments: (filters: FilterAppointments) => void;
}

const AptFilterSection: React.FC<Props> = ({ onFilterAppointments }) => {
  const [filters, setFilters] = useState<FilterAppointments>({});

  const handleFilterChange = (filterType: keyof FilterAppointments, value: string | number) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterAppointments(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterAppointments({});
  };

  return (
    <div className="filter-section">
      <div className="clear-filters-title">
        <h2>Filter</h2>
        <button className="clear-filters" onClick={clearFilters}>Clear filters</button>
      </div>
      <input
        type="date"
        value={filters.date || ''}
        onChange={(e) => handleFilterChange('date', e.target.value)}
        className="filter-dropdown"
      />
      <select value={filters.status || ''} onChange={(e) => handleFilterChange('status', e.target.value)} className="filter-dropdown">
        <option value="">Status</option>
        <option value="Cancelled">Cancelled</option>
        <option value="Scheduled">Scheduled</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        {/* Other options */}
      </select>
    </div>
  );
};

export default AptFilterSection;
