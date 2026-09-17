# Abhimanyu InfoSec (AIS) - Production Deployment Guide

This document provides complete instructions for deploying the **AIS Backend on Render** and the **AIS Frontend on Vercel** (or Cloudflare Pages), connected to **Neon Serverless PostgreSQL**.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Clients / Browsers                      │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
       (Frontend Routes)                  (REST API /api)
               ▼                               ▼
┌─────────────────────────────┐  CORS   ┌─────────────────────────────┐
│    Vercel / Cloudflare      │ ◄─────► │        Render.com           │
│   (React 19 + Vite SPA)     │         │   (Node.js Express API)     │
│   - vercel.json rewrites    │         │   - Reverse proxy trusted   │
│   - public/_redirects       │         │   - Global rate limiting    │
│   - Static Edge CDN         │         │   - Health checks /api/health│
└─────────────────────────────┘         └──────────────┬──────────────┘
                                                       │
                                                (Pooled TLS TCP)
                                                       ▼
                                        ┌─────────────────────────────┐
                                        │        Neon Console         │
                                        │   (Serverless PostgreSQL)   │
                                        │   - Pooled connection URL   │
                                        │   - Instant branching       │
                                        └─────────────────────────────┘
```

---

## Part 1: Deploying the Backend on Render

### Step 1: Create a New Web Service
1. Log in to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** $\rightarrow$ **Web Service**.
3. Connect your GitHub / GitLab repository.

### Step 2: Configure Service Settings
| Setting | Value | Notes |
| :--- | :--- | :--- |
| **Name** | `ais-backend` | Or any identifier you choose |
| **Region** | Choose closest to your Neon DB | (e.g. `Frankfurt`, `Oregon`, `Ohio`) |
| **Branch** | `main` | Production branch |
| **Root Directory** | `AIS_Website/server` *(or `server` if repo root)* | **Crucial:** Points Render to the backend folder |
| **Runtime** | `Node` | LTS (Node 18+) |
| **Build Command** | `npm install && npx prisma generate` | Generates the Prisma Client |
| **Start Command** | `npm run start:prod` | Runs `prisma db push` and starts Express |
| **Instance Type** | Free or Starter | |

### Step 3: Configure Advanced Settings
* **Health Check Path**: `/api/health`
* Render will ping this endpoint. If database or server is down, Render will notify and manage instances.

### Step 4: Environment Variables (Render Dashboard)
Add the following in the **Environment** tab:

```ini
# Environment Mode
NODE_ENV=production
PORT=5000

# Neon Database Connection (Pooled connection string)
DATABASE_URL=postgresql://<user>:<password>@ep-cool-snowflake-123456-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require

# CORS Allowed Origins (Comma-separated if multiple, e.g. Vercel domain & custom domain)
CORS_ORIGIN=https://ais-website.vercel.app,https://abhimanyuinfosec.com

# Security & JWT (Generate strong 64-character hex strings)
JWT_ACCESS_SECRET=your_super_secret_access_token_production_key_2026
JWT_REFRESH_SECRET=your_super_secret_refresh_token_production_key_2026
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Uploads Configuration
UPLOAD_DIR=./uploads
MAX_FILE_SIZE_MB=10

# Initial Admin Credentials (used only during seeding)
SEED_ADMIN_EMAIL=admin@abhimanyuinfosec.com
SEED_ADMIN_PASSWORD=SetAStrongPasswordHere2026!
SEED_ADMIN_NAME=System Administrator
```

### Step 5: Initial Database Seeding
After your first deployment succeeds:
1. Open your service in Render $\rightarrow$ click **Shell**.
2. Run:
   ```bash
   npm run db:seed
   ```
3. This creates your initial Super Admin account and initial seed categories.

---

## Part 2: Deploying the Frontend on Vercel

### Step 1: Import Project
1. Log in to [Vercel](https://vercel.com/).
2. Click **Add New...** $\rightarrow$ **Project**.
3. Import your Git repository.

### Step 2: Configure Project Settings
* **Framework Preset**: `Vite`
* **Root Directory**: `AIS_Website`
* **Build Command**: `npm run build`
* **Output Directory**: `dist`

### Step 3: Environment Variables
Under the **Environment Variables** section:

| Key | Value | Notes |
| :--- | :--- | :--- |
| `VITE_API_URL` | `https://ais-backend.onrender.com/api` | Your Render backend URL + `/api` |

### Step 4: Deploy
Click **Deploy**. 
* SPA rewrites are handled automatically by [`vercel.json`](file:///e:/cyber/AIS_Website/vercel.json).
* Direct visits to `/admin`, `/services/penetration-testing`, `/insights`, or `/contact` will route cleanly without 404 errors.

---

## Part 3: Neon Database Best Practices

1. **Use Pooled Endpoints**:
   * Always copy the connection string marked **Pooled connection** in your Neon dashboard.
   * Pooled connection strings include `-pooler` in the host domain.
   * Add `?sslmode=require` at the end.
2. **Compute Auto-Suspending**:
   * Neon automatically suspends inactive databases on the free tier. The first query after suspend may take ~1-2 seconds (cold start). Your `/api/health` endpoint handles this gracefully.

---

## Part 4: File Uploads Notice

* On free Render instances, local disk (`./uploads`) is ephemeral and resets during redeployments.
* If your clients upload frequent documents and media, configure persistent cloud storage:
  * **Option A**: Render Persistent Disk ($0.25/GB/mo on paid plans).
  * **Option B**: S3 / Cloudflare R2 / Neon Object Storage.
