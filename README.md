# UserDashBoardFrontend

React + Bootstrap + Chart.js frontend for the Blackoffer Insights Dashboard.

## Live

- **Frontend:** https://user-dash-board-frontend.vercel.app
- **Backend API:** https://userdashboardbackend-gmrv.onrender.com
- **Hosting:** Vercel

> The backend runs on Render's free tier and sleeps after ~15 min idle. The first request after a cold start can take ~30s — subsequent requests are fast.

## Stack

- React 18
- Bootstrap 5 + Bootstrap Icons
- Chart.js (via react-chartjs-2)
- Axios

## Project Layout

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── index.js
│   ├── styles.css
│   ├── utils/api.js
│   └── components/
│       ├── Dashboard.js
│       ├── InsightsTable.js
│       ├── Filters/FilterPanel.js
│       ├── Stats/StatCards.js
│       └── Charts/
│           ├── chartConfig.js
│           ├── YearTrendChart.js
│           ├── RegionChart.js
│           ├── IntensityByTopicChart.js
│           ├── LikelihoodVsRelevanceChart.js
│           ├── SectorChart.js
│           ├── PestleChart.js
│           ├── SourceChart.js
│           └── CountryChart.js
└── package.json
```

## Run Locally

```bash
npm install
npm start
```

The dev server opens at **http://localhost:3000**.

By default it talks to the deployed Render backend. To use a local backend instead, create `frontend/.env.local`:

```
REACT_APP_API_URL=http://localhost:5001/api
```

In dev mode, the `proxy` field in `package.json` also forwards `/api/*` calls to port 5001.

## Features

**Filters (sidebar):** End Year · Start Year · Topic · Sector · Region · PEST · Source · SWOT · Country · City · Reset All

**KPI cards:** Total Records · Avg Intensity · Avg Likelihood · Avg Relevance · Unique Countries / Sectors / Regions / Topics

**Charts (all interactive, all filter-aware):**

1. Year Trend — multi-line
2. Region Distribution — doughnut
3. Intensity by Topic — horizontal bar (top 10)
4. Likelihood vs Relevance — bubble scatter
5. Sector Intensity — polar area
6. PEST Analysis — radar
7. Top Sources — horizontal bar
8. Insights by Country — vertical bar (top 10)
9. Insights Table — paginated, with intensity badges

## Deploy to Vercel

1. Push this folder to its own GitHub repo.
2. Vercel → **Add New → Project** → import the repo.
3. Framework Preset: Create React App (auto-detected).
4. Environment Variables:
   - `REACT_APP_API_URL` = `https://userdashboardbackend-gmrv.onrender.com/api`
   - (or your own deployed backend URL)
5. Deploy.

> Vercel only re-reads env vars at build time, so any change to `REACT_APP_API_URL` requires a redeploy.

## Backend repo

API source: see the backend repository — it serves the `/api/data`, `/api/filters`, and `/api/stats` endpoints consumed by `src/utils/api.js`.
