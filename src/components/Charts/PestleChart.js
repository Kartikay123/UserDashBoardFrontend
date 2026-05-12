import React from 'react';
import { Radar } from 'react-chartjs-2';
import { palette, baseOptions, groupBy } from './chartConfig';

const PestleChart = ({ data }) => {
  const grouped = groupBy(data, 'pestle', 'intensity', 'avg').sort(
    (a, b) => b.value - a.value
  );

  const chartData = {
    labels: grouped.map((g) => g.label),
    datasets: [
      {
        label: 'Avg Intensity',
        data: grouped.map((g) => g.value),
        backgroundColor: palette.pink + '55',
        borderColor: palette.pink,
        pointBackgroundColor: palette.pink,
        pointBorderColor: '#fff',
        borderWidth: 2
      }
    ]
  };

  const options = {
    ...baseOptions,
    scales: {
      r: {
        ticks: { color: '#9aa0a6', backdropColor: 'transparent' },
        grid: { color: 'rgba(45, 52, 71, 0.5)' },
        angleLines: { color: 'rgba(45, 52, 71, 0.5)' },
        pointLabels: { color: '#e8eaed', font: { size: 11 } }
      }
    }
  };

  return (
    <div className="chart-card">
      <h6 className="chart-card-title">PEST Analysis</h6>
      <p className="chart-card-subtitle">Intensity profile across PEST dimensions</p>
      <div className="chart-container">
        <Radar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PestleChart;
