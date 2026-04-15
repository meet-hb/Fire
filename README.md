# WELDOSELD Client Delivery

WELDOSELD is a React + Vite website with an admin dashboard for updating live content and profile settings.

## Active Production Structure

These are the folders that matter for deployment and client handoff:

```text
src/        Frontend app, pages, components, shared data
api/        Production API used by Vercel
public/     Static public assets
dist/       Generated build output
vercel.json Vercel routing for frontend + API
```

## Legacy / Reference Folders

These folders are present in the repo but are not the primary production path:

```text
server/   Local/older backend variant
backend/  Another backend variant with local uploads
```

Keep them only if you still need them for reference. For client delivery, the live deployment path is `src/ + api/ + public/`.

## Key Frontend Areas

```text
src/pages/
  AdminDashboard.jsx
  AccountSettingsPage.jsx
  LoginPage.jsx

src/api/
  contentService.js
  adminProfileService.js

src/data/
  content.js
  adminProfile.js
```

## Setup

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Create production build:

```bash
npm run build
```

## Environment

The API expects:

```text
DATABASE_URL=
```

For Vercel, set `DATABASE_URL` in the project environment variables.

## Content Management

The admin dashboard updates content through:

```text
/api/content/:section
```

Profile/account settings are stored in:

```text
adminProfile
```

## Notes For Client Delivery

- The admin profile logic is centralized in `src/api/adminProfileService.js`.
- The account settings page and dashboard now share the same saved profile data.
- If you want an even cleaner final delivery, the unused `server/` and `backend/` folders can be archived outside this repo after confirming they are no longer needed.
