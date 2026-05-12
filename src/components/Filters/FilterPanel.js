import React from 'react';

const SelectFilter = ({ label, name, value, onChange, options }) => (
  <div className="filter-section">
    <div className="filter-section-title">{label}</div>
    <select
      className="form-select form-select-sm"
      name={name}
      value={value || ''}
      onChange={onChange}
    >
      <option value="">All</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const FilterPanel = ({ filters, setFilters, options, onReset }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <i className="bi bi-graph-up-arrow"></i>
        </div>
        <div>
          <h5>Blackoffer</h5>
          <small>Insights Dashboard</small>
        </div>
      </div>

      <SelectFilter
        label="End Year"
        name="end_year"
        value={filters.end_year}
        onChange={handleChange}
        options={options.end_years || []}
      />
      <SelectFilter
        label="Start Year"
        name="start_year"
        value={filters.start_year}
        onChange={handleChange}
        options={options.start_years || []}
      />
      <SelectFilter
        label="Topic"
        name="topic"
        value={filters.topic}
        onChange={handleChange}
        options={options.topics || []}
      />
      <SelectFilter
        label="Sector"
        name="sector"
        value={filters.sector}
        onChange={handleChange}
        options={options.sectors || []}
      />
      <SelectFilter
        label="Region"
        name="region"
        value={filters.region}
        onChange={handleChange}
        options={options.regions || []}
      />
      <SelectFilter
        label="PEST"
        name="pestle"
        value={filters.pestle}
        onChange={handleChange}
        options={options.pestles || []}
      />
      <SelectFilter
        label="Source"
        name="source"
        value={filters.source}
        onChange={handleChange}
        options={options.sources || []}
      />
      <SelectFilter
        label="SWOT"
        name="swot"
        value={filters.swot}
        onChange={handleChange}
        options={options.swots || []}
      />
      <SelectFilter
        label="Country"
        name="country"
        value={filters.country}
        onChange={handleChange}
        options={options.countries || []}
      />
      <SelectFilter
        label="City"
        name="city"
        value={filters.city}
        onChange={handleChange}
        options={options.cities || []}
      />

      <button className="btn btn-reset" onClick={onReset}>
        <i className="bi bi-arrow-counterclockwise me-1"></i>
        Reset All Filters
      </button>
    </aside>
  );
};

export default FilterPanel;
