import React from 'react';
import { Bar } from 'react-chartjs-2';
import { palette, baseOptions, groupBy, topN } from './chartConfig';

const IntensityByTopicChart = ({ data }) => {
  const grouped = topN(groupBy(data, 'topic', 'intensity', 'avg'), 10);

  const chartData = {
    labels: grouped.map((g) => g.label),
    datasets: [
      {
        label: 'Avg Intensity',
        data: grouped.map((g) => g.value),
        backgroundColor: palette.blue,
        borderRadius: 6,
        borderSkipped: false
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
      <h6 className="chart-card-title">Intensity by Topic</h6>
      <p className="chart-card-subtitle">Top 10 topics by average intensity</p>
      <div className="chart-container-tall">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default IntensityByTopicChart;
