import React, { useEffect, useState, useCallback } from 'react';
import FilterPanel from './Filters/FilterPanel';
import StatCards from './Stats/StatCards';
import IntensityByTopicChart from './Charts/IntensityByTopicChart';
import LikelihoodVsRelevanceChart from './Charts/LikelihoodVsRelevanceChart';
import YearTrendChart from './Charts/YearTrendChart';
import CountryChart from './Charts/CountryChart';
import RegionChart from './Charts/RegionChart';
import SectorChart from './Charts/SectorChart';
import PestleChart from './Charts/PestleChart';
import SourceChart from './Charts/SourceChart';
import InsightsTable from './InsightsTable';
import { fetchData, fetchFilters, fetchStats } from '../utils/api';

const EMPTY_FILTERS = {
  end_year: '',
  start_year: '',
  topic: '',
  sector: '',
  region: '',
  pestle: '',
  source: '',
  swot: '',
  country: '',
  city: ''
};

const Dashboard = () => {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [options, setOptions] = useState({});
  const [data, setData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFilters()
      .then(setOptions)
      .catch((err) => setError(err.message));
  }, []);

  const load = useCallback(() => {
    setLoading(true);
    Promise.all([fetchData(filters), fetchStats(filters)])
      .then(([rows, stats]) => {
        setData(rows);
        setStats(stats);
        setError(null);
      })
      .catch((err) =>
        setError(
          err.response?.data?.error ||
            err.message ||
            'Failed to load data. Make sure the backend is running.'
        )
      )
      .finally(() => setLoading(false));
  }, [filters]);

  useEffect(() => {
    load();
  }, [load]);

  const reset = () => setFilters(EMPTY_FILTERS);

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== '' && v !== null && v !== undefined
  ).length;

  return (
    <div className="dashboard-wrapper">
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        options={options}
        onReset={reset}
      />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h2>Insights Dashboard</h2>
            <p>
              Real-time visualization across {stats?.total_records || 0} records ·{' '}
              {activeFilterCount > 0
                ? `${activeFilterCount} active filter(s)`
                : 'No filters applied'}
            </p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="badge-pill">
              <i className="bi bi-circle-fill me-1" style={{ color: '#34d399', fontSize: '0.5rem' }}></i>
              Live
            </span>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}

        {loading && !data.length ? (
          <div className="loading-screen">
            <div className="spinner-grow spinner-grow-blue" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted">Loading dashboard data...</p>
          </div>
        ) : (
          <>
            <StatCards stats={stats} />

            <div className="row">
              <div className="col-lg-8">
                <YearTrendChart data={data} />
              </div>
              <div className="col-lg-4">
                <RegionChart data={data} />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <IntensityByTopicChart data={data} />
              </div>
              <div className="col-lg-6">
                <LikelihoodVsRelevanceChart data={data} />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4">
                <SectorChart data={data} />
              </div>
              <div className="col-lg-4">
                <PestleChart data={data} />
              </div>
              <div className="col-lg-4">
                <SourceChart data={data} />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <CountryChart data={data} />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <InsightsTable data={data} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
