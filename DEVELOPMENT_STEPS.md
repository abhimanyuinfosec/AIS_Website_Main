# Abhimanyu InfoSec — Development Roadmap & Action Steps

> **Project:** Abhimanyu InfoSec (AIS) Website + CMS + Admin Panel  
> **Status:** Production-Ready Full-Stack Cybersecurity Architecture Completed  
> **Target:** Complete, database-driven cybersecurity platform with a secure Admin Panel and dynamic client portals.

---

## 📑 Table of Contents
1. [Architecture Overview](#1-architecture-overview)
2. [Phase 1: Backend Foundation & Database Setup](#phase-1-backend-foundation--database-setup)
3. [Phase 2: Authentication, RBAC & Security Middleware](#phase-2-authentication-rbac--security-middleware)
4. [Phase 3: Media & Storage Subsystem](#phase-3-media--storage-subsystem)
5. [Phase 4: Content REST APIs (CRUD Engine)](#phase-4-content-rest-apis-crud-engine)
6. [Phase 5: Lead / Inquiry & Notification System](#phase-5-lead--inquiry--notification-system)
7. [Phase 6: Admin Panel Frontend Development (`/admin`)](#phase-6-admin-panel-frontend-development-admin)
8. [Phase 7: Public Website Dynamic Integration](#phase-7-public-website-dynamic-integration)
9. [Phase 8: Security Hardening & Audit Logging](#phase-8-security-hardening--audit-logging)
10. [Phase 9: SEO, Performance & Error Handling](#phase-9-seo-performance--error-handling)
11. [Phase 10: Deployment, Backups & Verification](#phase-10-deployment-backups--verification)

---

## 1. Architecture Overview

```
e:\cyber\AIS_Website\
├── src/                         # Public Website + Admin Panel (React 19 + Vite + React Router v7)
│   ├── pages/                   # Dynamic public pages (Home, Services, Solutions, Technology, Insights, About, Contact, 404)
│   ├── components/              # Shared UI components & animations
│   ├── admin/                   # Admin Panel SPA module
│   │   ├── pages/               # Dashboard, Services, Projects, Products, Research, Blog, Inquiries, Reviews, Team, Media, Settings, Audit Logs
│   │   └── components/          # AdminLayout, ProtectedRoute
│   ├── context/                 # AuthContext
│   ├── services/                # api.js client
│   └── index.css                # Dark-themed cyber design system
│
└── server/                      # REST API Backend (Node.js + Express + Prisma + PostgreSQL)
    ├── src/
    │   ├── config/              # Prisma database connection, CORS, Helmet
    │   ├── controllers/         # Auth, Services, Projects, Products, Research, Blog, Team, Reviews, Inquiries, Settings, Media, Notifications, Audit, Dashboard
    │   ├── middleware/          # Auth (JWT), RBAC, Rate-limiting, Multer Upload, Audit logger, Error handler
    │   ├── routes/              # Express route definitions (/api/...)
    │   ├── utils/               # JWT token utilities, Slugifier
    │   └── server.js            # Express application entry point
    ├── prisma/
    │   ├── schema.prisma        # Prisma Database Schema (PostgreSQL)
    │   └── seed.js              # Database seed script for Super Admin, Site Settings, Core Services, Products
    ├── uploads/                 # Local media storage
    └── .env                     # Server environment variables
```

---

## Phase 1: Backend Foundation & Database Setup
- [x] **Step 1.1 — Initialize Server Directory** (Installed Express, CORS, Helmet, Prisma, bcryptjs, jsonwebtoken, zod, etc.)
- [x] **Step 1.2 — Configure Environment Variables** (`server/.env` configured)
- [x] **Step 1.3 — Define Prisma Schema** (`User`, `Service`, `Project`, `Product`, `Research`, `BlogPost`, `TeamMember`, `Review`, `Inquiry`, `Media`, `SiteSetting`, `Notification`, `AuditLog`)
- [x] **Step 1.4 — Database Synchronization & Seeding** (`npx prisma db push`, `npm run db:seed` seeded Super Admin and defaults)

---

## Phase 2: Authentication, RBAC & Security Middleware
- [x] **Step 2.1 — Authentication Controller & Routes (`/api/auth`)** (`POST /login`, `POST /refresh`, `POST /logout`, `GET /me`)
- [x] **Step 2.2 — Security & Authorization Middleware** (`authenticate`, `requireRole`, `express-rate-limit`, `helmet`, `cors`)

---

## Phase 3: Media & Storage Subsystem
- [x] **Step 3.1 — Multer & File Validator Pipeline** (MIME validation, size limits, unique cryptographically safe filenames)
- [x] **Step 3.2 — Media Library Endpoints (`/api/media`)** (`POST /upload`, `GET /`, `DELETE /:id`)

---

## Phase 4: Content REST APIs (CRUD Engine)
- [x] **Step 4.1 — Services API (`/api/services`)** (CRUD, slug lookup, public active filtering, display ordering)
- [x] **Step 4.2 — Projects API (`/api/projects`)** (CRUD, category filtering, tech stack, featured toggling)
- [x] **Step 4.3 — Products API (`/api/products`)** (CRUD, versioning, status lifecycles: `CONCEPT` to `PRODUCTION`)
- [x] **Step 4.4 — Research API (`/api/research`)** (CRUD, academic publications, DOI, citation generator)
- [x] **Step 4.5 — Blog & Intelligence API (`/api/blog`)** (CRUD, category/tag taxonomy, estimated reading time)
- [x] **Step 4.6 — Team Management API (`/api/team`)** (CRUD, researcher roles, certifications, social links)
- [x] **Step 4.7 — Testimonials & Reviews API (`/api/reviews`)** (Public submission, admin moderation: `PENDING` → `PUBLISHED` / `REJECTED`)
- [x] **Step 4.8 — Site Settings CMS API (`/api/settings`)** (Key-value store for hero text, metrics, contact routing)

---

## Phase 5: Lead / Inquiry & Notification System
- [x] **Step 5.1 — Public Contact Submission (`POST /api/contact`)** (Zod validation, anti-spam honeypot, DB storage)
- [x] **Step 5.2 — Automatic Notifications** (Admin alert feed for new inquiries and reviews)
- [x] **Step 5.3 — Inquiry Management API (`/api/inquiries`)** (Status workflow: `NEW`, `READ`, `CONTACTED`, `IN_PROGRESS`, `CONVERTED`, `CLOSED`, triage notes)

---

## Phase 6: Admin Panel Frontend Development (`/admin`)
- [x] **Step 6.1 — Admin Routing & Layout Shell** (`AdminLayout.jsx`, `ProtectedRoute.jsx`, `AuthContext.jsx`, `/admin/login`)
- [x] **Step 6.2 — Dashboard Overview (`/admin`)** (KPI telemetry cards, unread badge alerts, live audit log preview, recent inquiries)
- [x] **Step 6.3 — Resource Management Views**:
  - `AdminServices.jsx`: Full service catalog editor
  - `AdminProjects.jsx`: Case study manager & tech stack tagging
  - `AdminProducts.jsx`: Security tools & lifecycle versioning
  - `AdminResearch.jsx`: Academic publications & DOI manager
  - `AdminBlog.jsx`: Intelligence article editor & category taxonomy
  - `AdminInquiries.jsx`: Lead & inquiry desk with split-view triage drawer
  - `AdminReviews.jsx`: Client review moderation desk
  - `AdminTeam.jsx`: Team roster manager
  - `AdminMedia.jsx`: Drag-and-drop media vault
  - `AdminSettings.jsx`: Live CMS settings editor
  - `AdminAuditLogs.jsx`: Security audit log viewer

---

## Phase 7: Public Website Dynamic Integration
- [x] **Step 7.1 — API Client Setup** (`src/services/api.js`)
- [x] **Step 7.2 — Dedicated Public Pages**:
  - `ServicesPage.jsx`: Dynamic service catalog with deep dives into methodology, deliverables, and tools
  - `SolutionsPage.jsx`: Enterprise defense blueprint matrices
  - `TechnologyPage.jsx`: Proprietary tools showcase (SANJAY, Hybrid IDS, IP Intelligence, AutoRed APT)
  - `InsightsPage.jsx`: Cyber threat intelligence portal with in-app article reader
  - `AboutPage.jsx`: Mission, Chakravyuha philosophy, and live team roster
  - `ContactPage.jsx`: Interactive contact form connected to `/api/contact`
  - `NotFoundPage.jsx`: Cyber-themed 404 handler
- [x] **Step 7.3 — Homepage Contact Integration** (`Contact.jsx` connected to API)

---

## Phase 8: Security Hardening & Audit Logging
- [x] **Step 8.1 — Immutable Audit Logging** (`/api/audit-logs`, IP capture, operator tracking, result logging)
- [x] **Step 8.2 — Input Sanitization & Anti-Spam** (Zod schemas, honeypot traps, parameterized queries via Prisma)
- [x] **Step 8.3 — Rate Limiting & Helmet** (Brute-force protection on auth and contact endpoints)

---

## Phase 9 & 10: Verification & Acceptance Testing
- [x] **Build Verification**: `npm run build` executed and passed with 0 errors
- [x] **End-to-End Test**:
  - Public `/api/contact` submission verified
  - Admin JWT authentication verified
  - Triage inquiry workflow & notification badge verified
  - Backend API daemon operational on port 5000
