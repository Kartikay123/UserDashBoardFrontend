import React, { useState } from 'react';

const intensityBadge = (value) => {
  if (value >= 20) return 'badge-pill badge-intensity-high';
  if (value >= 10) return 'badge-pill badge-intensity-med';
  return 'badge-pill badge-intensity-low';
};

const InsightsTable = ({ data }) => {
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const start = (page - 1) * pageSize;
  const slice = data.slice(start, start + pageSize);

  React.useEffect(() => {
    setPage(1);
  }, [data]);

  return (
    <div className="chart-card">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h6 className="chart-card-title">Recent Insights</h6>
          <p className="chart-card-subtitle">
            Showing {slice.length} of {data.length} filtered insights
          </p>
        </div>
      </div>
      <div className="table-responsive">
        <table className="insights-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Sector</th>
              <th>Country</th>
              <th>Topic</th>
              <th>Intensity</th>
              <th>Likelihood</th>
              <th>Relevance</th>
            </tr>
          </thead>
          <tbody>
            {slice.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">
                  No records match the current filters.
                </td>
              </tr>
            ) : (
              slice.map((row, idx) => (
                <tr key={row._id || idx}>
                  <td style={{ maxWidth: 320 }}>
                    <div
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                      title={row.title}
                    >
                      {row.title || row.insight || '—'}
                    </div>
                  </td>
                  <td>{row.sector || '—'}</td>
                  <td>{row.country || '—'}</td>
                  <td>{row.topic || '—'}</td>
                  <td>
                    <span className={intensityBadge(row.intensity)}>
                      {row.intensity}
                    </span>
                  </td>
                  <td>{row.likelihood}</td>
                  <td>{row.relevance}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-2">
          <button
            className="btn btn-sm btn-outline-secondary"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <i className="bi bi-chevron-left"></i> Prev
          </button>
          <small className="text-muted">
            Page {page} of {totalPages}
          </small>
          <button
            className="btn btn-sm btn-outline-secondary"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default InsightsTable;
