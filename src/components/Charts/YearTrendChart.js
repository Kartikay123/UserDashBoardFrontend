import React from 'react';
import { Line } from 'react-chartjs-2';
import { palette, baseOptions } from './chartConfig';

const YearTrendChart = ({ data }) => {
  const byYear = {};
  data.forEach((r) => {
    const y = r.end_year || r.start_year;
    if (!y || y === '') return;
    if (!byYear[y]) byYear[y] = { intensity: [], likelihood: [], relevance: [] };
    byYear[y].intensity.push(Number(r.intensity) || 0);
    byYear[y].likelihood.push(Number(r.likelihood) || 0);
    byYear[y].relevance.push(Number(r.relevance) || 0);
  });

  const years = Object.keys(byYear)
    .map((y) => Number(y))
    .filter((y) => !Number.isNaN(y))
    .sort((a, b) => a - b);

  const avg = (arr) =>
    arr.length ? +(arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2) : 0;

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Intensity',
        data: years.map((y) => avg(byYear[y].intensity)),
        borderColor: palette.blue,
        backgroundColor: palette.blue + '33',
        fill: true,
        tension: 0.4,
        pointRadius: 3
      },
      {
        label: 'Likelihood',
        data: years.map((y) => avg(byYear[y].likelihood)),
        borderColor: palette.green,
        backgroundColor: palette.green + '33',
        fill: false,
        tension: 0.4,
        pointRadius: 3
      },
      {
        label: 'Relevance',
        data: years.map((y) => avg(byYear[y].relevance)),
        borderColor: palette.orange,
        backgroundColor: palette.orange + '33',
        fill: false,
        tension: 0.4,
        pointRadius: 3
      }
    ]
  };

  return (
    <div className="chart-card">
      <h6 className="chart-card-title">Trend Over Years</h6>
      <p className="chart-card-subtitle">
        Average intensity, likelihood & relevance by year
      </p>
      <div className="chart-container-tall">
        <Line data={chartData} options={baseOptions} />
      </div>
    </div>
  );
};

export default YearTrendChart;
