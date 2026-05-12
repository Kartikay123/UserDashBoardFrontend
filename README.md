# UserDashBoardFrontend

# Blackoffer — Data Visualization Dashboard

A full-stack MERN dashboard that visualizes the Blackoffer insights JSON dataset with interactive charts, multi-dimensional filters, and a modern dark UI.

The `backend/` and `frontend/` directories are independent — each has its own `package.json` and can be deployed to its own host / GitHub repo.

## Tech Stack

- **Backend:** Node.js, Express, Mongoose, MongoDB Atlas
- **Frontend:** React 18, Bootstrap 5, Chart.js (via react-chartjs-2), Axios
- **Database:** MongoDB Atlas (cloud)

## Project Structure

```
blackoffer/
├── backend/
│   ├── jsondata.json          # Source data file (lives inside backend)
│   ├── server.js              # Express entry point
│   ├── models/Data.js         # Mongoose schema
│   ├── routes/data.js         # API routes (/data, /filters, /stats)
│   ├── scripts/importData.js  # JSON → MongoDB import script
│   ├── .env                   # PORT + MONGO_URI + CORS_ORIGIN
│   └── package.json
└── frontend/
    ├── public/index.html
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
    │       └── Charts/*       # 8 chart components
    └── package.json
```

## Prerequisites

- Node.js v16+ and npm
- MongoDB Atlas connection string (or a local MongoDB instance)

## Setup & Run (Local)

### 1. Backend

```bash
cd backend
npm install
```

Create / edit `backend/.env`:

```
PORT=5001
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/blackoffer?retryWrites=true&w=majority
CORS_ORIGIN=*
```

Import the JSON dataset into MongoDB (run once):

```bash
npm run import
```

Start the API server:

```bash
npm run dev      # with nodemon (auto-reload)
# or
npm start
```

The API will be available at **http://localhost:5001**.

### 2. Frontend

```bash
cd frontend
npm install
```

Optional `frontend/.env.local`:

```
REACT_APP_API_URL=http://localhost:5001/api
```

Start the dev server:

```bash
npm start
```

The dashboard opens at **http://localhost:3000** and proxies API calls to `http://localhost:5001`.

## API Endpoints

| Method | Endpoint       | Description                                          |
| ------ | -------------- | ---------------------------------------------------- |
| GET    | `/api/data`    | Returns filtered records (accepts all filter params) |
| GET    | `/api/filters` | Returns unique values for every filterable field     |
| GET    | `/api/stats`   | Returns aggregated metrics (avg intensity, etc.)     |

### Supported filter query params

`end_year`, `start_year`, `topic`, `sector`, `region`, `pestle`, `source`, `swot`, `country`, `city`

Example: `GET /api/data?sector=Energy&region=Northern%20America&end_year=2027`

## Dashboard Features

### Filters (sidebar)

End Year · Start Year · Topic · Sector · Region · PEST · Source · SWOT · Country · City · Reset All

### KPI Cards

- Total Records
- Avg Intensity / Likelihood / Relevance
- Unique Countries / Sectors / Regions / Topics

### Charts (all interactive, all filter-aware)

1. **Year Trend** — multi-line chart of average intensity/likelihood/relevance over time
2. **Region Distribution** — doughnut chart by region
3. **Intensity by Topic** — horizontal bar of top 10 topics
4. **Likelihood vs Relevance** — bubble scatter (bubble = intensity)
5. **Sector Intensity** — polar area chart
6. **PEST Analysis** — radar chart
7. **Top Sources** — horizontal bar
8. **Insights by Country** — vertical bar of top 10 countries
9. **Insights Table** — paginated table of filtered records with intensity badges

## Deployment (separate repos)

The `backend/` and `frontend/` folders are designed to live in **separate GitHub repos**.

### Backend → Render

1. Push the contents of `backend/` to its own GitHub repo.
2. https://render.com → **New +** → **Web Service** → connect the backend repo.
3. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:**
     - `MONGO_URI` = your Atlas URI
     - `CORS_ORIGIN` = `https://your-app.vercel.app` (set after frontend deploy)
4. After first deploy, open the Render shell once and run `npm run import` to seed the database — or run it locally with the production `MONGO_URI` and skip this step. (Atlas already has the data if you've imported once.)

### Frontend → Vercel

1. Push the contents of `frontend/` to its own GitHub repo.
2. https://vercel.com → **Add New** → **Project** → import the frontend repo.
3. Settings:
   - **Framework Preset:** Create React App (auto-detected)
   - **Environment Variables:**
     - `REACT_APP_API_URL` = `https://<your-render-app>.onrender.com/api`
4. Deploy. Update `CORS_ORIGIN` on Render with the new Vercel URL.

## Notes

- The collection name in MongoDB is `insights` (configured in `models/Data.js`).
- Re-run `npm run import` from inside `backend/` any time you change `backend/jsondata.json`.
- The React dev server proxies `/api/*` to port 5001 via the `proxy` field in `frontend/package.json` — production builds use `REACT_APP_API_URL`.
- CORS defaults to `*`. In production, set `CORS_ORIGIN` to your Vercel URL to lock it down.
