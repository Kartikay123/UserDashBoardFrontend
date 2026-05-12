import React from 'react';
import { Bar } from 'react-chartjs-2';
import { palette, baseOptions, groupBy, topN } from './chartConfig';

const SourceChart = ({ data }) => {
  const grouped = topN(groupBy(data, 'source', null, 'count'), 8);

  const chartData = {
    labels: grouped.map((g) => g.label),
    datasets: [
      {
        label: 'Records',
        data: grouped.map((g) => g.value),
        backgroundColor: palette.cyan,
        borderRadius: 6
      }
    ]
  };

  const options = {
    ...baseOptions,
    indexAxis: 'y',
    plugins: { ...baseOptions.plugins, legend: { display: false } }
  };

  return (
    <div className="chart-card">
      <h6 className="chart-card-title">Top Sources</h6>
      <p className="chart-card-subtitle">Most active data sources</p>
      <div className="chart-container">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SourceChart;
