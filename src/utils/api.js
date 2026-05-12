import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({ baseURL: API_BASE });

const buildParams = (filters) => {
  const params = {};
  Object.entries(filters || {}).forEach(([k, v]) => {
    if (v !== '' && v !== null && v !== undefined) params[k] = v;
  });
  return params;
};

export const fetchData = (filters) =>
  api.get('/data', { params: buildParams(filters) }).then((r) => r.data);

export const fetchFilters = () => api.get('/filters').then((r) => r.data);

export const fetchStats = (filters) =>
  api.get('/stats', { params: buildParams(filters) }).then((r) => r.data);

export default api;
