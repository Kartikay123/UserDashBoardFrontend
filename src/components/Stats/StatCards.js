import React from 'react';

const Card = ({ label, value, icon, iconClass, sub }) => (
  <div className="col-xl-3 col-md-6 mb-3">
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-label">{label}</span>
        <div className={`stat-card-icon ${iconClass}`}>
          <i className={`bi ${icon}`}></i>
        </div>
      </div>
      <p className="stat-card-value">{value}</p>
      {sub && <div className="stat-card-sub">{sub}</div>}
    </div>
  </div>
);

const StatCards = ({ stats }) => {
  if (!stats) return null;
  return (
    <div className="row">
      <Card
        label="Total Records"
        value={stats.total_records}
        icon="bi-database"
        iconClass="icon-blue"
        sub={`${stats.unique_topics} topics tracked`}
      />
      <Card
        label="Avg Intensity"
        value={stats.avg_intensity}
        icon="bi-lightning-charge-fill"
        iconClass="icon-orange"
        sub="Signal strength score"
      />
      <Card
        label="Avg Likelihood"
        value={stats.avg_likelihood}
        icon="bi-bullseye"
        iconClass="icon-green"
        sub="Probability rating"
      />
      <Card
        label="Avg Relevance"
        value={stats.avg_relevance}
        icon="bi-star-fill"
        iconClass="icon-yellow"
        sub="Content relevance"
      />
      <Card
        label="Countries"
        value={stats.unique_countries}
        icon="bi-globe-americas"
        iconClass="icon-purple"
        sub="Geographic coverage"
      />
      <Card
        label="Sectors"
        value={stats.unique_sectors}
        icon="bi-building"
        iconClass="icon-pink"
        sub="Industry verticals"
      />
      <Card
        label="Regions"
        value={stats.unique_regions}
        icon="bi-compass"
        iconClass="icon-blue"
        sub="Worldwide reach"
      />
      <Card
        label="Topics"
        value={stats.unique_topics}
        icon="bi-tags-fill"
        iconClass="icon-green"
        sub="Distinct themes"
      />
    </div>
  );
};

export default StatCards;
