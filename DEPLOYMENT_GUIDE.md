# Deployment Configuration Guide

## Problem Identified

Your frontend is deployed at:
`https://glam-tips-git-main-kishorereigns-projects.vercel.app`

But it's trying to call APIs at the wrong URL, causing 404 errors.

## Solution Steps

### 1. Deploy Your Backend to Vercel

**Option A: New Backend Deployment**

1. Go to Vercel Dashboard
2. Import your backend (server folder) as a new project
3. Configure environment variables in Vercel:

   ```
   POSTGRES_HOST=ep-winter-mode-a1yd32lk-pooler.ap-southeast-1.aws.neon.tech
   POSTGRES_USER=neondb_owner
   POSTGRES_PASSWORD=npg_7nlTuiq3MExG
   POSTGRES_DB=neondb
   POSTGRES_PORT=5432
   POSTGRES_SSL=true
   EMAIL_USER=theglamtips01@gmail.com
   EMAIL_PASSWORD=oetxuhyrgfkpmnam
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   GOOGLE_SERVICE_ACCOUNT_KEY=<your-key>
   GOOGLE_CALENDAR_ID=theglamtips01@gmail.com
   CLIENT_URL=https://glam-tips-git-main-kishorereigns-projects.vercel.app
   ```

4. Add `vercel.json` in your server folder:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

5. Deploy and note your backend URL (e.g., `https://glam-tips-backend.vercel.app`)

**Option B: Monorepo Deployment**
If you want to deploy both frontend and backend together, you need to configure Vercel to handle both.

### 2. Update Frontend Environment Variable

In your Vercel frontend project settings:

1. Go to **Settings** → **Environment Variables**
2. Add variable:
   - Name: `VITE_API_URL`
   - Value: `https://your-backend-url.vercel.app/api`
   - Environment: Production

### 3. Redeploy Frontend

After setting the environment variable, trigger a redeploy of your frontend.

## Quick Fix for Testing

If you want to test immediately, update `.env.production`:

```env
VITE_API_URL=https://your-actual-backend-url.vercel.app/api
```

Then rebuild and redeploy:

```bash
npm run build
```

## Verify It Works

1. Backend: `https://your-backend.vercel.app/api/gallery` should return JSON
2. Frontend: Should now load gallery images properly

## Current Issue

Your frontend at `https://glam-tips-git-main-kishorereigns-projects.vercel.app` is requesting:

- ❌ `https://glam-tips-git-main-kishorereigns-projects.vercel.app/gallery` (404)
- ✅ Should be: `https://your-backend.vercel.app/api/gallery`

## Files Updated

1. ✅ `src/services/api.js` - Now uses `VITE_API_URL` environment variable
2. ✅ `server/server.js` - Added your frontend URL to CORS whitelist
3. ✅ `.env.production` - Template for production API URL
4. ✅ `.env.development` - Local development API URL
5. ✅ `server/.env` - Updated CLIENT_URL

## Next Steps

1. Deploy your backend separately on Vercel
2. Get the backend URL
3. Set `VITE_API_URL` in Vercel frontend environment variables
4. Redeploy frontend
5. Test: Your gallery should now work! ✨
