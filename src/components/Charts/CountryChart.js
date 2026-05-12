import React from 'react';
import { Bar } from 'react-chartjs-2';
import { palette, baseOptions, groupBy, topN } from './chartConfig';

const CountryChart = ({ data }) => {
  const grouped = topN(groupBy(data, 'country', null, 'count'), 10);

  const chartData = {
    labels: grouped.map((g) => g.label),
    datasets: [
      {
        label: 'Insights',
        data: grouped.map((g) => g.value),
        backgroundColor: palette.green,
        borderRadius: 6
      }
    ]
  };

  const options = {
    ...baseOptions,
    plugins: { ...baseOptions.plugins, legend: { display: false } },
    scales: {
      ...baseOptions.scales,
      x: {
        ...baseOptions.scales.x,
        ticks: { color: '#9aa0a6', maxRotation: 45, minRotation: 30 }
      }
    }
  };

  return (
    <div className="chart-card">
      <h6 className="chart-card-title">Insights by Country</h6>
      <p className="chart-card-subtitle">Top 10 countries by record count</p>
      <div className="chart-container">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CountryChart;
