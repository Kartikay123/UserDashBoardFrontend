import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { palette, baseOptions } from './chartConfig';

const LikelihoodVsRelevanceChart = ({ data }) => {
  const points = data
    .filter((r) => r.likelihood && r.relevance)
    .map((r) => ({
      x: Number(r.likelihood),
      y: Number(r.relevance),
      r: Math.max(4, Math.min(14, Number(r.intensity) / 4))
    }));

  const chartData = {
    datasets: [
      {
        label: 'Insights',
        data: points,
        backgroundColor: palette.purple + 'aa',
        borderColor: palette.purple,
        borderWidth: 1
      }
    ]
  };

  const options = {
    ...baseOptions,
    plugins: {
      ...baseOptions.plugins,
      legend: { display: false },
      tooltip: {
        ...baseOptions.plugins.tooltip,
        callbacks: {
          label: (ctx) =>
            `Likelihood: ${ctx.parsed.x}, Relevance: ${ctx.parsed.y}`
        }
      }
    },
    scales: {
      x: {
        ...baseOptions.scales.x,
        title: { display: true, text: 'Likelihood', color: '#9aa0a6' },
        min: 0,
        max: 6
      },
      y: {
        ...baseOptions.scales.y,
        title: { display: true, text: 'Relevance', color: '#9aa0a6' },
        min: 0,
        max: 6
      }
    }
  };

  return (
    <div className="chart-card">
      <h6 className="chart-card-title">Likelihood vs Relevance</h6>
      <p className="chart-card-subtitle">Bubble size represents intensity</p>
      <div className="chart-container">
        <Scatter data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LikelihoodVsRelevanceChart;
