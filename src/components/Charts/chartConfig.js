import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

ChartJS.defaults.color = '#9aa0a6';
ChartJS.defaults.borderColor = '#2d3447';
ChartJS.defaults.font.family =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

export const palette = {
  blue: '#4285f4',
  purple: '#8b5cf6',
  green: '#34d399',
  orange: '#fb923c',
  pink: '#f472b6',
  yellow: '#fbbf24',
  cyan: '#22d3ee',
  red: '#ef4444',
  indigo: '#6366f1',
  teal: '#14b8a6'
};

export const paletteArray = Object.values(palette);

export const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: '#e8eaed', usePointStyle: true, padding: 12 },
      position: 'bottom'
    },
    tooltip: {
      backgroundColor: '#1a1f2e',
      titleColor: '#e8eaed',
      bodyColor: '#e8eaed',
      borderColor: '#2d3447',
      borderWidth: 1,
      padding: 10,
      cornerRadius: 8
    }
  },
  scales: {
    x: {
      ticks: { color: '#9aa0a6' },
      grid: { color: 'rgba(45, 52, 71, 0.5)' }
    },
    y: {
      ticks: { color: '#9aa0a6' },
      grid: { color: 'rgba(45, 52, 71, 0.5)' }
    }
  }
};

export const groupBy = (rows, key, valueKey, agg = 'avg') => {
  const groups = {};
  rows.forEach((r) => {
    const k = r[key];
    if (!k) return;
    if (!groups[k]) groups[k] = [];
    if (valueKey) groups[k].push(Number(r[valueKey]) || 0);
    else groups[k].push(1);
  });
  const out = Object.entries(groups).map(([label, values]) => {
    const sum = values.reduce((a, b) => a + b, 0);
    const val = agg === 'sum' || agg === 'count' ? sum : sum / values.length;
    return { label, value: +val.toFixed(2) };
  });
  return out;
};

export const topN = (arr, n) =>
  [...arr].sort((a, b) => b.value - a.value).slice(0, n);
