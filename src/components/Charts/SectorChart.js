import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { paletteArray, baseOptions, groupBy } from './chartConfig';

const SectorChart = ({ data }) => {
  const grouped = groupBy(data, 'sector', 'intensity', 'avg').sort(
    (a, b) => b.value - a.value
  );

  const chartData = {
    labels: grouped.map((g) => g.label),
    datasets: [
      {
        data: grouped.map((g) => g.value),
        backgroundColor: paletteArray.map((c) => c + 'b3'),
        borderColor: '#232938',
        borderWidth: 2
      }
    ]
  };

  const options = {
    ...baseOptions,
    plugins: {
      ...baseOptions.plugins,
      legend: { ...baseOptions.plugins.legend, position: 'right' }
    },
    scales: {
      r: {
        ticks: { color: '#9aa0a6', backdropColor: 'transparent' },
        grid: { color: 'rgba(45, 52, 71, 0.5)' },
        angleLines: { color: 'rgba(45, 52, 71, 0.5)' }
      }
    }
  };

  return (
    <div className="chart-card">
      <h6 className="chart-card-title">Intensity by Sector</h6>
      <p className="chart-card-subtitle">Average intensity across sectors</p>
      <div className="chart-container">
        <PolarArea data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SectorChart;
