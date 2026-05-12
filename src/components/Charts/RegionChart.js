import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { paletteArray, baseOptions, groupBy } from './chartConfig';

const RegionChart = ({ data }) => {
  const grouped = groupBy(data, 'region', null, 'count').sort(
    (a, b) => b.value - a.value
  );

  const chartData = {
    labels: grouped.map((g) => g.label),
    datasets: [
      {
        data: grouped.map((g) => g.value),
        backgroundColor: paletteArray,
        borderColor: '#232938',
        borderWidth: 2
      }
    ]
  };

  const options = {
    ...baseOptions,
    cutout: '60%',
    plugins: {
      ...baseOptions.plugins,
      legend: { ...baseOptions.plugins.legend, position: 'right' }
    },
    scales: {}
  };

  return (
    <div className="chart-card">
      <h6 className="chart-card-title">Distribution by Region</h6>
      <p className="chart-card-subtitle">Share of insights per region</p>
      <div className="chart-container">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RegionChart;
